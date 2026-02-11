import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Animated,
  InteractionManager,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonPicker from '../../components/ButtonPicker';
import EngineSafeAreaView from '../../components/EngineSafeAreaView';
import Modal from '../../components/Modal';
import Languages from '../../constants/language/Languages';
import GlobalState from '../../GlobalState';
import Translate from '../../Translate';

const Settings = () => {
  const context = React.useContext(GlobalState);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const {colors} = useTheme();
  const isDark = context.isDarkMode;
  const surfaceColor = isDark ? '#1A1F2B' : '#EEF3FF';
  const rowColor = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const secondaryText = isDark ? '#9FA5AE' : '#6E6E73';
  const separatorColor = isDark ? 'rgba(255,255,255,0.08)' : '#D1D1D6';
  const accentColor = '#0A84FF';

  const onChangeLanguage = lang => {
    hideLangPicker();
    // Avoid modal teardown + context update race on some devices.
    InteractionManager.runAfterInteractions(() => {
      try {
        if (typeof context?.setLanguage === 'function') {
          context.setLanguage(lang);
        }
      } catch (e) {
        console.log('Failed to change language', e);
      }
    });
  };

  const hideLangPicker = () => {
    setShowLanguagePicker(false);
  };

  return (
      <EngineSafeAreaView style={[
        styles.container,
        {backgroundColor: colors.background},
      ]}>
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, {backgroundColor: surfaceColor}]}>
            <Text style={[styles.heroTitle, {color: colors.text}]}>
              {Translate.t('Settings')}
            </Text>
            <Text style={[styles.heroSubtitle, {color: secondaryText}]}>
              Customize language, city and appearance
            </Text>
          </View>

          <Text style={[styles.sectionTitle, {color: secondaryText}]}>
            PREFERENCES
          </Text>
          <View style={[styles.sectionCard, {backgroundColor: surfaceColor}]}>
            <SettingRow
                label={Translate.t('Language')}
                iconName="language-outline"
                iconColor={accentColor}
                value={Translate.t('Label')}
                textColor={colors.text}
                secondaryTextColor={secondaryText}
                rowColor={rowColor}
                separatorColor={separatorColor}
                onPress={() => setShowLanguagePicker(true)}
            />

            <SettingRow
                label={Translate.t('City')}
                iconName="location-outline"
                iconColor="#34C759"
                value={context.city}
                textColor={colors.text}
                secondaryTextColor={secondaryText}
                rowColor={rowColor}
                separatorColor={separatorColor}
                onPress={() => context.setPlacePopup('city')}
            />

            <SettingThemeRow
                label={Translate.t('DarkMode')}
                iconName="moon-outline"
                iconColor="#AF52DE"
                textColor={colors.text}
                secondaryTextColor={secondaryText}
                rowColor={rowColor}
                value={context.isDarkMode}
                onChange={() => context.setDarkMode(!context.isDarkMode)}
            />
          </View>
        </ScrollView>

        {showLanguagePicker &&
            <Modal close={() => hideLangPicker()}
                   containerStyle={{
                     flex: 0.4,
                     borderRadius: 18,
                     paddingTop: 16,
                     backgroundColor: colors.background,
                   }}>
              <Text style={[styles.modalTitle, {color: colors.text}]}>
                {Translate.t('Language')}
              </Text>
              <ButtonPicker
                  lang={'Shqip'}
                  style={styles.modalButton}
                  textStyle={[
                    styles.modalButtonText,
                    {
                      color: context.language === Languages.al ?
                          accentColor :
                          colors.text,
                    },
                  ]}
                  selectedLang={context.language}
                  onPress={() => onChangeLanguage(Languages.al)}
              />
              <ButtonPicker
                  lang={'English'}
                  style={styles.modalButton}
                  textStyle={[
                    styles.modalButtonText,
                    {
                      color: context.language === Languages.en ?
                          accentColor :
                          colors.text,
                    },
                  ]}
                  selectedLang={context.language}
                  onPress={() => onChangeLanguage(Languages.en)}
              />
              <ButtonPicker
                  lang={'Makeдoнckи'}
                  style={styles.modalButton}
                  textStyle={[
                    styles.modalButtonText,
                    {
                      color: context.language === Languages.mk ?
                          accentColor :
                          colors.text,
                    },
                  ]}
                  selectedLang={context.language}
                  onPress={() => onChangeLanguage(Languages.mk)}
              />
            </Modal>
        }
      </EngineSafeAreaView>
  );
};

const SettingRow = ({
                      label,
                      value,
                      iconName,
                      iconColor,
                      textColor,
                      secondaryTextColor,
                      rowColor,
                      separatorColor,
                      onPress,
                    }) => {
  return (
      <TouchableOpacity
          onPress={onPress}
          style={[
            styles.rowContainer,
            {
              backgroundColor: rowColor,
              borderBottomColor: separatorColor,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          ]}>
        <View style={styles.rowLeftContainer}>
          <View style={[styles.iconContainer, {backgroundColor: iconColor}]}>
            <Ionicons name={iconName} size={16} color="#fff"/>
          </View>
          <Text style={[styles.rowLabel, {color: textColor}]}>{label}</Text>
        </View>
        <View style={styles.rowRightContainer}>
          <Text style={[styles.rowValue, {color: secondaryTextColor}]}>
            {value}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={20}
                         color={secondaryTextColor}/>
        </View>
      </TouchableOpacity>
  );
};

const SettingThemeRow = ({
                           label,
                           value,
                           iconName,
                           iconColor,
                           textColor,
                           secondaryTextColor,
                           rowColor,
                           onChange,
                         }) => {
  return (
      <View style={[styles.rowContainer, {backgroundColor: rowColor}]}>
        <View style={styles.rowLeftContainer}>
          <View style={[styles.iconContainer, {backgroundColor: iconColor}]}>
            <Ionicons name={iconName} size={16} color="#fff"/>
          </View>
          <View>
            <Text style={[styles.rowLabel, {color: textColor}]}>{label}</Text>
            <Text style={[styles.rowMeta, {color: secondaryTextColor}]}>
              {value ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        </View>
        <ModernToggle value={value} onChange={onChange}/>
      </View>
  );
};

const ModernToggle = ({value, onChange}) => {
  const x = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(x, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value, x]);

  const knobTranslate = x.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24],
  });

  return (
      <TouchableOpacity onPress={onChange} activeOpacity={0.9}>
        <Animated.View style={[
          styles.toggleTrack,
          {
            backgroundColor: value ? '#0A84FF' : '#C8CDD8',
          },
        ]}>
          <Animated.View style={[
            styles.toggleKnob,
            {transform: [{translateX: knobTranslate}]},
          ]}/>
        </Animated.View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  hero: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  sectionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 2,
  },
  rowContainer: {
    minHeight: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowMeta: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 15,
    marginRight: 4,
  },
  iconContainer: {
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalButton: {
    width: '100%',
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: 'transparent',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 999,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Settings;
