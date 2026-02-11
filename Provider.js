import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProvider} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import i18n from 'i18n-js';
import React, {useState} from 'react';
import {LayoutAnimation, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPicker from './components/ButtonPicker';
import Modal from './components/Modal';
import AsyncStorageItems from './constants/async-storage/AsyncStorageItems';
import {CityCountryInfo} from './constants/CityCountryInfo';
import Citys from './constants/Citys';
import {Countries} from './constants/Countries';
import Languages from './constants/language/Languages';
import {DarkTheme, MyTheme} from './constants/Theme';
import GlobalState, {
  LanguageContext,
  LocationContext,
  PlaceContext,
  SearchContext,
  ThemeContext,
} from './GlobalState';
import {setAsyncStorage} from './services/AsyncStorageServiceImpl';
import GeolibServiceImpl from './services/GeolibServiceImpl';
import LocationServiceImpl from './services/LocationServiceImpl';
import Translate from './Translate';

const Provider = ({children}) => {
  const [language, setLanguage] = useState(Languages.en);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(Citys.TETOVO);
  const [country, setCountry] = useState(Countries[0]);
  const [placePopup, setPlacePopup] = useState(null);
  const [searchSourceTab, setSearchSourceTab] = useState('index');
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeColors, setThemeColors] = useState(
      isDarkMode ? DarkTheme.colors : MyTheme.colors);
  const availableLanguages = Object.values(Languages);
  const onSetLanguage = lang => {
    const nextLanguage = availableLanguages.includes(lang) ?
        lang :
        Languages.en;
    i18n.locale = nextLanguage;
    setLanguage(nextLanguage);
    setAsyncStorage(AsyncStorageItems.Language, nextLanguage);
  };

  const getCurrentLocation = () => {
    LocationServiceImpl.requestForegroundPermissions().then(res => {
      if (res.granted) {
        LocationServiceImpl.getCurrentPosition().then(position => {
              let myLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              setLocation(myLocation);
              let nearbyCity = GeolibServiceImpl.getNearPlace(myLocation,
                  CityCountryInfo);
              setCity(nearbyCity.city);
              setCountry(nearbyCity.country);

            },
        ).catch(er => {
          console.error(er);
        });
      } else {
      }
    }).catch(() => {
    });
  };

  // React.useEffect(() => {
  //   (async function () {
  //     let localData = await multiGet(
  //       [AsyncStorageItems.Language, AsyncStorageItems.IsDarkTheme])
  //     let lang = localData[0][1]
  //     if (!lang) {
  //       lang = Languages.en
  //     }
  //     let isDarkTheme = localData[1][1]
  //     if (isDarkTheme === null) {
  //       let colorScheme = Appearance.getColorScheme()
  //       isDarkTheme = colorScheme === ThemeTypes.dark
  //     }
  //     if (!isDarkTheme) {
  //       isDarkTheme = false
  //     }
  //     triggerDarkTheme(isDarkTheme === 'true' || isDarkTheme === true)
  //     onSetLanguage(lang)
  //     getCurrentLocation()
  //     try {
  //       await SplashScreen.hideAsync()
  //     } catch (e) {
  //     }
  //   })()
  //   return () => {
  //     try {
  //       // Appearance.remove()
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // }, [])
  const flatListRef = React.useRef(null);
  const filterCity = () => CityCountryInfo.filter(c => c.country === country &&
      c.city.toUpperCase().includes(search.toUpperCase()));
  React.useEffect(() => {
    if (placePopup === 'city') {
      const index = filterCity().findIndex(
          c => c.city.toUpperCase() === city.toUpperCase());
      try {
        if (flatListRef.current && index > 0) {
          flatListRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [placePopup]);

  const getItemLayout = (data, index) => {
    return (
        {
          length: 57,
          offset: 57 * index,
          index,
        }
    );
  };

  const setPlaceModal = place => {
    try {
      LayoutAnimation.easeInEaseOut();
    } catch (e) {
      console.log('LayoutAnimation error', e);
    }
    setPlacePopup(place);
  };

  const triggerDarkTheme = (isDark) => {
    setIsDarkMode(isDark);
    setThemeColors(isDark ? DarkTheme.colors : MyTheme.colors);
    AsyncStorage.setItem(AsyncStorageItems.IsDarkTheme, String(isDark)).
        then().
        catch();
  };

  React.useEffect(() => {
    (async () => {
      try {
        const [storedLang, storedTheme] = await Promise.all([
          AsyncStorage.getItem(AsyncStorageItems.Language),
          AsyncStorage.getItem(AsyncStorageItems.IsDarkTheme),
        ]);

        if (storedLang && availableLanguages.includes(storedLang)) {
          onSetLanguage(storedLang);
        }

        if (storedTheme !== null) {
          triggerDarkTheme(storedTheme === 'true');
        }
      } catch (e) {
        console.log('Failed to restore theme/language', e);
      }
    })();
  }, []);

  return (
      <ThemeProvider value={isDarkMode ? DarkTheme : MyTheme}>
        <LanguageContext.Provider value={{
        language,
        setLanguage: lang => onSetLanguage(lang),
        }}>
          <ThemeContext.Provider value={{
            isDarkMode,
            setDarkMode: val => triggerDarkTheme(val),
            themeColors,
          }}>
            <LocationContext.Provider value={{
              location,
              city,
              setCity: selectedCity => setCity(selectedCity),
              country,
              setCountry: selectedCountry => setCountry(selectedCountry),
            }}>
              <PlaceContext.Provider value={{
                placePopup,
                setPlacePopup: popup => setPlacePopup(popup),
              }}>
                <SearchContext.Provider value={{
                  searchSourceTab,
                  setSearchSourceTab: tab => setSearchSourceTab(tab),
                }}>
                  <GlobalState.Provider value={{
                    language,
                    setLanguage: lang => onSetLanguage(lang),
                    location,
                    city,
                    setCity: selectedCity => setCity(selectedCity),
                    country,
                    setCountry: selectedCountry => setCountry(selectedCountry),
                    placePopup,
                    setPlacePopup: popup => setPlacePopup(popup),
                    searchSourceTab,
                    setSearchSourceTab: tab => setSearchSourceTab(tab),
                    isDarkMode,
                    setDarkMode: val => triggerDarkTheme(val),
                    themeColors,
                  }}>
                    {children}

                    {placePopup != null &&
                        <Modal close={() => {
                          setPlacePopup(null);
                          setSearch('');
                        }
                        }
                               containerStyle={{
                                 flex: 0,
                                 minHeight: 270,
                                 backgroundColor: themeColors.background,
                               }}>
                          {placePopup === 'city' &&
                              <View style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: themeColors.background,
                              }}>
                                <Ionicons name={'chevron-back-outline'}
                                          size={18}
                                          color={themeColors.text}
                                          onPress={() => {
                                            setPlaceModal('country');
                                          }
                                          }/>
                                <TextInput placeholder={Translate.t('Search')}
                                           placeholderTextColor={themeColors.text}
                                           style={{
                                             paddingRight: 10,
                                             color: themeColors.text,
                                           }}
                                           onChangeText={t => setSearch(t)}/>
                                <View/>
                              </View>}
                          {placePopup === 'country' ?
                              <FlashList
                                  estimatedItemSize={5}
                                  contentContainerStyle={{
                                    backgroundColor: themeColors.background,
                                  }}
                                  data={Countries.filter(
                                      c => c.toUpperCase().
                                          includes(search.toUpperCase()))}
                                  renderItem={({item}) => (
                                      <ButtonPicker lang={item}
                                                    style={{
                                                      alignSelf: 'center',
                                                      justifyContent: 'center',
                                                    }}
                                                    textStyle={[
                                                      item === country
                                                          ?
                                                          {color: 'green'}
                                                          :
                                                          {color: themeColors.text}]}
                                                    onPress={() => {
                                                      setCountry(item);
                                                      setPlaceModal('city');
                                                      setSearch('');
                                                    }}
                                      />
                                  )}
                                  keyExtractor={i => i}
                              /> :

                              <FlashList
                                  estimatedItemSize={20}
                                  contentContainerStyle={{
                                    backgroundColor: themeColors.background,
                                  }}
                                  data={CityCountryInfo.filter(
                                      c => c.country ===
                                          country &&
                                          c.city.toUpperCase().includes(
                                              search.toUpperCase()))}

                                  ref={flatListRef}
                                  getItemLayout={getItemLayout}
                                  renderItem={({item}) => (
                                      <ButtonPicker lang={item.city}
                                                    style={{
                                                      alignSelf: 'center',
                                                      justifyContent: 'center',
                                                      backgroundColor: themeColors.background,
                                                    }}
                                                    textStyle={[
                                                      item.city === city
                                                          ?
                                                          {color: 'green'}
                                                          :
                                                          {color: themeColors.text}]}
                                                    onPress={() => {
                                                      setCity(item.city);
                                                      setPlaceModal(null);
                                                      setSearch('');
                                                    }}
                                      />
                                  )}
                                  keyExtractor={i => i.city}
                              />}
                        </Modal>
                    }
                  </GlobalState.Provider>
                </SearchContext.Provider>
              </PlaceContext.Provider>
            </LocationContext.Provider>
          </ThemeContext.Provider>
        </LanguageContext.Provider>
      </ThemeProvider>
  );
};

export default Provider;
