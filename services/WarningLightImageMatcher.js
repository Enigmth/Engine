import {Asset} from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import {carLights} from '../constants/CarLights';

const MATCHER_IMAGE_SIZE = 96;
const SHINGLE_SIZE = 5;
const SHINGLE_STEP = 3;
const MAX_CHARS = 3500;
const BASE64_HEADER_SKIP = 180;

let referenceCache = null;

const normalizeBase64 = value => {
  const raw = (value || '').replace(/\s+/g, '');
  if (!raw) {
    return '';
  }
  // Skip the beginning where encoded images tend to look too similar
  // across different inputs after resize/compress.
  const body = raw.slice(Math.min(BASE64_HEADER_SKIP, raw.length));
  if (!body) {
    return raw.slice(0, MAX_CHARS);
  }
  const step = Math.max(1, Math.floor(body.length / MAX_CHARS));
  let sampled = '';
  for (let i = 0; i < body.length; i += step) {
    sampled += body[i];
    if (sampled.length >= MAX_CHARS) {
      break;
    }
  }
  return sampled;
};

const buildShingleSet = (text, size = SHINGLE_SIZE, step = SHINGLE_STEP) => {
  const set = new Set();
  if (!text) {
    return set;
  }
  for (let i = 0; i <= text.length - size; i += step) {
    set.add(text.slice(i, i + size));
  }
  return set;
};

const jaccardSimilarity = (a, b) => {
  if (!a.size || !b.size) {
    return 0;
  }
  let intersection = 0;
  a.forEach(value => {
    if (b.has(value)) {
      intersection += 1;
    }
  });
  const union = a.size + b.size - intersection;
  return union > 0 ? intersection / union : 0;
};

const createImageSignature = async uri => {
  const normalized = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: {width: MATCHER_IMAGE_SIZE, height: MATCHER_IMAGE_SIZE}}],
      {
        compress: 0.7,
        // PNG tends to be more stable for icon matching.
        format: ImageManipulator.SaveFormat.PNG,
        base64: true,
      },
  );
  const base64 = normalizeBase64(normalized.base64);
  return {
    base64,
    shingles: buildShingleSet(base64),
  };
};

const getReferenceItems = async () => {
  if (referenceCache) {
    return referenceCache;
  }

  const references = [];
  for (const item of carLights) {
    try {
      const asset = Asset.fromModule(item.image_path);
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      const uri = asset.localUri || asset.uri;
      if (!uri) {
        continue;
      }
      const signature = await createImageSignature(uri);
      references.push({
        ...item,
        signature,
      });
    } catch (e) {
      // Skip broken reference entries without blocking matcher.
    }
  }

  referenceCache = references;
  return references;
};

export const detectCarLightFromImage = async (imageUri, limit = 3) => {
  const refs = await getReferenceItems();
  if (!imageUri || refs.length === 0) {
    return [];
  }

  const targetSignature = await createImageSignature(imageUri);
  return refs.map(item => ({
    item,
    score: jaccardSimilarity(targetSignature.shingles, item.signature.shingles),
  })).sort((a, b) => b.score - a.score).slice(0, limit);
};

export const getDetectionConfidenceLevel = score => {
  if (score >= 0.5) {
    return 'high';
  }
  if (score >= 0.28) {
    return 'medium';
  }
  return 'low';
};
