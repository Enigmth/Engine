import {useTheme} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EngineSafeAreaView from '../../components/EngineSafeAreaView';
import ScreenHeader from '../../components/ScreenHeader';
import {carLights} from '../../constants/CarLights';
import {CarLightsAl} from '../../constants/CarLightsAl';
import {CarLightsMk} from '../../constants/CarLightsMk';
import GlobalState from '../../GlobalState';
import Translate from '../../Translate';

const {height} = Dimensions.get('window');

const getWarningMeta = (warningType, isDarkMode) => {
  const type = (warningType || 'info').toLowerCase();
  if (type === 'danger') {
    return {
      label: 'Danger',
      icon: 'dangerous',
      backgroundColor: isDarkMode ? '#47232A' : '#FDECEC',
      textColor: isDarkMode ? '#FFB4BF' : '#C62828',
    };
  }
  if (type === 'warning') {
    return {
      label: 'Warning',
      icon: 'warning-amber',
      backgroundColor: isDarkMode ? '#4B3A20' : '#FFF5D6',
      textColor: isDarkMode ? '#FFD27D' : '#B26A00',
    };
  }
  return {
    label: 'Info',
    icon: 'info-outline',
    backgroundColor: isDarkMode ? '#313747' : '#EAF2FF',
    textColor: isDarkMode ? '#AFC8FF' : '#2F6BFF',
  };
};

function LightFlipCard({item, isDarkMode, textColor, surfaceColor}) {
  const rotate = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);
  const warningMeta = getWarningMeta(item.warningType, isDarkMode);

  const frontRotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.spring(rotate, {
      toValue,
      friction: 9,
      tension: 55,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  return (
      <TouchableOpacity
          activeOpacity={0.95}
          onPress={handleFlip}
          style={styles.flipContainer}>
        <Animated.View
            style={[
              styles.cardFace,
              {
                backgroundColor: surfaceColor,
                transform: [{rotateY: frontRotation}],
                borderColor: !isDarkMode ? '#E8EDF8' : 'transparent',
                borderWidth: !isDarkMode ? 1 : 0,
                shadowOpacity: !isDarkMode ? 0.14 : 0.08,
                shadowRadius: !isDarkMode ? 20 : 14,
                elevation: !isDarkMode ? 6 : 3,
              },
            ]}>
          <View style={styles.cardHeader}>
            <View style={[
              styles.badge,
              {backgroundColor: warningMeta.backgroundColor},
            ]}>
              <MaterialIcons
                  name={warningMeta.icon}
                  size={14}
                  color={warningMeta.textColor}
              />
              <Text style={[
                styles.badgeText,
                {color: warningMeta.textColor},
              ]}>
                {warningMeta.label}
              </Text>
            </View>
            <MaterialIcons
                name="flip"
                size={16}
                color={isDarkMode ? '#9EA8BC' : '#7E889C'}
            />
          </View>

          <View style={styles.cardContent}>
            <Image source={item.image_path} style={styles.iconImage}/>
            <View style={styles.cardTextWrap}>
              <Text style={[styles.cardTitle, {color: textColor}]}
                    numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={[styles.cardDescription, {color: textColor}]}
                    numberOfLines={3}>
                {item.description}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
            style={[
              styles.cardFace,
              styles.cardBack,
              {
                backgroundColor: surfaceColor,
                transform: [{rotateY: backRotation}],
                borderColor: !isDarkMode ? '#E8EDF8' : 'transparent',
                borderWidth: !isDarkMode ? 1 : 0,
                shadowOpacity: !isDarkMode ? 0.14 : 0.08,
                shadowRadius: !isDarkMode ? 20 : 14,
                elevation: !isDarkMode ? 6 : 3,
              },
            ]}>
          <View style={styles.cardHeader}>
            <View style={[
              styles.badge,
              {backgroundColor: isDarkMode ? '#1F3A2D' : '#E9F8EF'},
            ]}>
              <MaterialIcons
                  name="check-circle"
                  size={14}
                  color={isDarkMode ? '#90E4B0' : '#1C9B53'}
              />
              <Text style={[
                styles.badgeText,
                {color: isDarkMode ? '#90E4B0' : '#1C9B53'},
              ]}>
                Solution
              </Text>
            </View>
            <MaterialIcons
                name="flip"
                size={16}
                color={isDarkMode ? '#9EA8BC' : '#7E889C'}
            />
          </View>

          <View style={styles.cardContent}>
            <Image source={item.image_path} style={styles.iconImage}/>
            <View style={styles.cardTextWrap}>
              <Text style={[styles.cardTitle, {color: textColor}]}
                    numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={[styles.cardDescription, {color: textColor}]}
                    numberOfLines={5}>
                {item.solution || item.description}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
  );
}

export default function Home() {
  const {colors} = useTheme();
  const context = React.useContext(GlobalState);
  const surfaceColor = context.isDarkMode ? '#1D222D' : '#FFFFFF';

  useFocusEffect(
      React.useCallback(() => {
        context.setSearchSourceTab?.('Home');
      }, [context]),
  );

  const getCarLights = () => {
    switch (context.language) {
      case 'en':
        return carLights;
      case 'al':
        return CarLightsAl;
      case 'mk':
        return CarLightsMk;
      default:
        return carLights;
    }
  };

  const filteredLights = getCarLights();

  return (
      <EngineSafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}>
        <ScreenHeader
            title="Engine Lights"
        />

        <FlashList
            estimatedItemSize={170}
            contentContainerStyle={styles.listContent}
            data={filteredLights}
            ListEmptyComponent={<View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height - 180,
                }}>
              <Text style={{color: colors.text}}>{Translate.t(
                  'NoDataFound')}</Text>
            </View>}
            initialNumToRender={12}
            renderItem={({item}) => (
                <LightFlipCard
                    item={item}
                    isDarkMode={context.isDarkMode}
                    textColor={colors.text}
                    surfaceColor={surfaceColor}
                />
            )}
            keyExtractor={i => i.image_url || i.name}
        />
      </EngineSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  flipContainer: {
    height: 170,
    marginBottom: 12,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 18,
    padding: 14,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    shadowColor: '#111827',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  cardBack: {
    transform: [{rotateY: '180deg'}],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
    minHeight: 0,
  },
  iconImage: {
    width: 62,
    height: 62,
    marginRight: 12,
    marginTop: 2,
  },
  cardTextWrap: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
    opacity: 0.85,
    flexShrink: 1,
  },
});
