import {useTheme} from '@react-navigation/native';
import {router, useLocalSearchParams} from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../components/ScreenHeader';
import Translate from '../Translate';

const FALLBACK_REGION = {
  latitude: 42.0018,
  longitude: 20.9716,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const getParam = value => Array.isArray(value) ? value[0] : value;

const Details = () => {
  const params = useLocalSearchParams();
  const {colors, dark} = useTheme();
  const isLight = !dark;

  const name = getParam(params.name) || 'Service';
  const city = getParam(params.city) || '';
  const address = getParam(params.address) || '';
  const tel = getParam(params.tel) || '';
  const lat = Number(getParam(params.latitude));
  const lng = Number(getParam(params.longitude));
  const hasLocation = Number.isFinite(lat) && Number.isFinite(lng);

  const initialRegion = hasLocation ? {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  } : FALLBACK_REGION;

  const onCallPress = () => {
    if (!tel) {
      return;
    }
    Linking.openURL(`tel:${tel}`).catch(e => {
      console.log(e);
    });
  };

  const openDirection = () => {
    if (!hasLocation) {
      return;
    }
    const url =
        Platform.OS === 'ios'
            ?
            `https://maps.apple.com/?daddr=${lat},${lng}`
            :
            `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(e => {
      console.log(e);
    });
  };

  return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <ScreenHeader
            leftLabel={Translate.t('Close')}
            onLeftPress={() => router.back()}
        />

        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
          <View style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderColor: isLight ? '#E8EEF9' : 'transparent',
              borderWidth: isLight ? 1 : 0,
              shadowOpacity: isLight ? 0.14 : 0.08,
              shadowRadius: isLight ? 20 : 14,
              elevation: isLight ? 6 : 3,
            },
          ]}>
            <View style={styles.titleRow}>
              <View style={styles.titleWrap}>
                <Text style={[styles.nameText, {color: colors.text}]}>
                  {name}
                </Text>
                <Text style={[styles.cityText, {color: colors.text}]}>
                  {[city, address].filter(Boolean).join(' - ')}
                </Text>
              </View>
              <View style={styles.statusPill}>
                <Ionicons name="location" size={12} color="#0A84FF"/>
                <Text style={styles.statusText}>
                  {hasLocation ? 'Mapped' : 'No location'}
                </Text>
              </View>
            </View>

            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                zoomEnabled
                showsUserLocation
                showsMyLocationButton>
              {hasLocation && (
                  <Marker coordinate={{latitude: lat, longitude: lng}}
                          pinColor={'#ff3b30'}
                          title={name}/>
              )}
            </MapView>

            {!hasLocation && (
                <Text style={styles.warningText}>
                  {Translate.t('AddressNotFound')}
                </Text>
            )}
          </View>

          <View style={styles.actionsWrap}>
            <ActionButton
                icon="call"
                text={Translate.t('Call')}
                onPress={onCallPress}
                color={colors.card}
                textColor={colors.text}
                disabled={!tel}
                isLight={isLight}
            />
            <ActionButton
                icon="navigate"
                text={'Navigate'}
                onPress={openDirection}
                color={colors.card}
                textColor={colors.text}
                disabled={!hasLocation}
                isLight={isLight}
            />
          </View>
        </ScrollView>
      </View>
  );
};

const ActionButton = ({
                        icon,
                        text,
                        onPress,
                        color,
                        textColor,
                        disabled,
                        isLight,
                      }) => {
  return (
      <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[
            styles.actionButton,
            {
              backgroundColor: color,
              opacity: disabled ? 0.45 : 1,
              borderColor: isLight ? '#E6EDF9' : 'transparent',
              borderWidth: isLight ? 1 : 0,
              shadowOpacity: isLight ? 0.12 : 0.06,
              shadowRadius: isLight ? 14 : 8,
              elevation: isLight ? 4 : 2,
            },
          ]}>
        <Ionicons
            name={icon}
            color={icon === 'call' ? '#1fb00e' : '#0A84FF'}
            size={18}
        />
        <Text numberOfLines={1}
              style={[styles.actionText, {color: textColor}]}>
          {text}
        </Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 24,
  },
  infoCard: {
    borderRadius: 18,
    padding: 12,
    shadowColor: '#111827',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleWrap: {
    flex: 1,
    paddingRight: 8,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  cityText: {
    marginTop: 3,
    fontSize: 13,
    opacity: 0.75,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EAF2FF',
  },
  statusText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#0A84FF',
  },
  map: {
    height: 260,
    borderRadius: 14,
  },
  warningText: {
    marginTop: 8,
    fontSize: 12,
    color: '#ff3b30',
    fontWeight: '600',
  },
  actionsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 11,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Details;
