import {useTheme} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EngineSafeAreaView from '../../components/EngineSafeAreaView';
import ScreenHeader from '../../components/ScreenHeader';
import {carLights} from '../../constants/CarLights';
import {CarLightsAl} from '../../constants/CarLightsAl';
import {CarLightsMk} from '../../constants/CarLightsMk';
import GlobalState from '../../GlobalState';
import {
  detectCarLightFromImage,
  getDetectionConfidenceLevel,
} from '../../services/WarningLightImageMatcher';

const MINIMUM_MATCH_SCORE = 0.2;

const getWarningMeta = (warningType, isDarkMode) => {
  const type = (warningType || 'info').toLowerCase();
  if (type === 'danger') {
    return {
      label: 'Danger',
      backgroundColor: isDarkMode ? '#47232A' : '#FDECEC',
      textColor: isDarkMode ? '#FFB4BF' : '#C62828',
    };
  }
  if (type === 'warning') {
    return {
      label: 'Warning',
      backgroundColor: isDarkMode ? '#4B3A20' : '#FFF5D6',
      textColor: isDarkMode ? '#FFD27D' : '#B26A00',
    };
  }
  return {
    label: 'Info',
    backgroundColor: isDarkMode ? '#313747' : '#EAF2FF',
    textColor: isDarkMode ? '#AFC8FF' : '#2F6BFF',
  };
};

const getConfidenceMeta = (score, isDarkMode) => {
  const level = getDetectionConfidenceLevel(score);
  if (level === 'high') {
    return {
      label: 'High confidence',
      color: isDarkMode ? '#80E1A6' : '#1D8F50',
    };
  }
  if (level === 'medium') {
    return {
      label: 'Medium confidence',
      color: isDarkMode ? '#FFD27D' : '#B26A00',
    };
  }
  return {
    label: 'Low confidence',
    color: isDarkMode ? '#FFB4BF' : '#C62828',
  };
};

const normalizeType = value => (value || 'info').toLowerCase();

const Scan = () => {
  const context = React.useContext(GlobalState);
  const {colors} = useTheme();
  const [imageUri, setImageUri] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const analysisRequestIdRef = useRef(0);
  const isDark = context.isDarkMode;
  const surface = isDark ? '#1D222D' : '#FFFFFF';
  const border = isDark ? '#2B3140' : '#E8EDF8';

  const localizedLights = useMemo(() => {
    switch (context.language) {
      case 'al':
        return CarLightsAl;
      case 'mk':
        return CarLightsMk;
      default:
        return carLights;
    }
  }, [context.language]);

  const mapToLocalizedItem = refItem => {
    const byImageUrl = localizedLights.find(
        x => x.image_url === refItem.image_url);
    if (byImageUrl) {
      return byImageUrl;
    }
    const byName = localizedLights.find(x => x.name === refItem.name);
    return byName || refItem;
  };

  const clearCurrentScan = () => {
    // Invalidate any in-flight analysis and clear visible state immediately.
    analysisRequestIdRef.current += 1;
    setImageUri(null);
    setMatches([]);
    setError('');
    setIsAnalyzing(false);
  };

  const analyzeImage = async uri => {
    const requestId = analysisRequestIdRef.current + 1;
    analysisRequestIdRef.current = requestId;
    setIsAnalyzing(true);
    setError('');
    setMatches([]);
    try {
      const detected = await detectCarLightFromImage(uri, 3);
      if (analysisRequestIdRef.current !== requestId) {
        return;
      }
      const localizedMatches = detected.map(result => ({
        ...result,
        item: mapToLocalizedItem(result.item),
      }));
      if (!localizedMatches.length || localizedMatches[0].score <
          MINIMUM_MATCH_SCORE) {
        setMatches([]);
        setError(
            'Could not confidently identify the warning light. Try a closer, centered photo of only the dashboard icon.',
        );
        return;
      }
      setMatches(localizedMatches);
    } catch (e) {
      if (analysisRequestIdRef.current !== requestId) {
        return;
      }
      setError('Unable to analyze image. Please try another photo.');
      setMatches([]);
    } finally {
      if (analysisRequestIdRef.current === requestId) {
        setIsAnalyzing(false);
      }
    }
  };

  const openLibrary = async () => {
    clearCurrentScan();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError('Media library permission is required to upload an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.images],
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled || !result.assets?.length) {
      return;
    }
    const uri = result.assets[0].uri;
    setImageUri(uri);
    analyzeImage(uri);
  };

  const openCamera = async () => {
    clearCurrentScan();
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setError('Camera permission is required to capture an image.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled || !result.assets?.length) {
      return;
    }
    const uri = result.assets[0].uri;
    setImageUri(uri);
    analyzeImage(uri);
  };

  const bestMatch = matches[0];
  const warningMeta = bestMatch ?
      getWarningMeta(bestMatch.item.warningType, isDark) :
      null;
  const confidenceMeta = bestMatch ?
      getConfidenceMeta(bestMatch.score, isDark) :
      null;

  return (
      <EngineSafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}>
        <ScreenHeader
            subtitle="Capture or upload a dashboard light to detect issue"/>
        <ScrollView contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}>
          <View style={[
            styles.previewCard,
            {backgroundColor: surface, borderColor: border}]}>
            {imageUri ? (
                <Image source={{uri: imageUri}} style={styles.previewImage}/>
            ) : (
                <View style={styles.previewPlaceholder}>
                  <MaterialIcons
                      name="photo-camera"
                      size={42}
                      color={isDark ? '#8C95A8' : '#9AA3B8'}
                  />
                  <Text style={[
                    styles.previewPlaceholderText,
                    {color: colors.text}]}>
                    Add image to detect warning light
                  </Text>
                </View>
            )}
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.actionButton, {backgroundColor: '#0A84FF'}]}
                onPress={openCamera}>
              <MaterialIcons name="photo-camera" size={18} color="#FFFFFF"/>
              <Text style={styles.actionButtonText}>Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.actionButton,
                  {backgroundColor: isDark ? '#2C3342' : '#EEF3FF'}]}
                onPress={openLibrary}>
              <MaterialIcons
                  name="upload-file"
                  size={18}
                  color={isDark ? '#D5DEEE' : '#2F6BFF'}
              />
              <Text
                  style={[
                    styles.actionButtonText,
                    {color: isDark ? '#D5DEEE' : '#2F6BFF'},
                  ]}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>

          {isAnalyzing && (
              <View style={[
                styles.feedbackCard,
                {backgroundColor: surface, borderColor: border}]}>
                <ActivityIndicator color="#0A84FF"/>
                <Text style={[styles.feedbackText, {color: colors.text}]}>
                  Analyzing dashboard light...
                </Text>
              </View>
          )}

          {!!error && (
              <View style={[
                styles.feedbackCard,
                {backgroundColor: surface, borderColor: border}]}>
                <Text style={[
                  styles.feedbackText,
                  {color: '#C62828'}]}>{error}</Text>
              </View>
          )}

          {bestMatch && !isAnalyzing && (
              <View style={[
                styles.resultCard,
                {backgroundColor: surface, borderColor: border}]}>
                <View style={styles.resultHeader}>
                  <Text style={[styles.resultTitle, {color: colors.text}]}>
                    Most likely issue
                  </Text>
                  <View style={[
                    styles.badge,
                    {backgroundColor: warningMeta.backgroundColor}]}>
                    <Text style={[
                      styles.badgeText,
                      {color: warningMeta.textColor}]}>
                      {warningMeta.label}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.issueName, {color: colors.text}]}>
                  {bestMatch.item.name}
                </Text>
                <Text style={[styles.issueDescription, {color: colors.text}]}>
                  {bestMatch.item.description}
                </Text>
                <Text style={[styles.solutionText, {color: colors.text}]}>
                  Solution: {bestMatch.item.solution}
                </Text>
                <Text style={[
                  styles.confidenceText,
                  {color: confidenceMeta.color}]}>
                  {confidenceMeta.label} ({Math.round(bestMatch.score * 100)}%)
                </Text>
              </View>
          )}

          {matches.length > 1 && !isAnalyzing && (
              <View style={[
                styles.resultCard,
                {backgroundColor: surface, borderColor: border}]}>
                <Text style={[styles.resultTitle, {color: colors.text}]}>
                  Other possible matches
                </Text>
                {matches.slice(1).map(match => {
                  const itemMeta = getWarningMeta(
                      normalizeType(match.item.warningType), isDark);
                  return (
                      <View key={`${match.item.name}-${match.item.image_url}`}
                            style={styles.possibleItem}>
                        <Text
                            style={[styles.possibleName, {color: colors.text}]}>
                          {match.item.name}
                        </Text>
                        <Text style={[
                          styles.possibleMeta,
                          {color: itemMeta.textColor}]}>
                          {itemMeta.label} • {Math.round(match.score * 100)}%
                        </Text>
                      </View>
                  );
                })}
              </View>
          )}
        </ScrollView>
      </EngineSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 90,
  },
  previewCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  previewPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 44,
  },
  previewPlaceholderText: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButtonText: {
    marginLeft: 6,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  feedbackCard: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  feedbackText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultCard: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  issueName: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '800',
  },
  issueDescription: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
  },
  solutionText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  confidenceText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  possibleItem: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#7B8396',
  },
  possibleName: {
    fontSize: 14,
    fontWeight: '700',
  },
  possibleMeta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Scan;
