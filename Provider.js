import i18n from 'i18n-js'
import React, { useState } from 'react'
import { FlatList, LayoutAnimation, TextInput, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ButtonPicker from './components/ButtonPicker'
import Modal from './components/Modal'
import AsyncStorageItems from './constants/async-storage/AsyncStorageItems'
import { CityCountryInfo } from './constants/CityCountryInfo'
import Citys from './constants/Citys'
import { Countries } from './constants/Countries'
import Languages from './constants/language/Languages'
import GlobalState from './GlobalState'
import Router from './router/Router'
import { multiGet, setAsyncStorage } from './services/AsyncStorageServiceImpl'
import DimensionServiceImpl from './services/DimensionServiceImpl'
import GeolibServiceImpl from './services/GeolibServiceImpl'
import LocationServiceImpl from './services/LocationServiceImpl'
import Translate from './Translate'

const height = DimensionServiceImpl.getHeight()
const Provider = () => {
  const [language, setLanguage] = useState(Languages.en)
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(Citys.TETOVO)
  const [country, setCountry] = useState(Countries[0])
  const [placePopup, setPlacePopup] = useState(null)
  const [search, setSearch] = useState('')

  const onSetLanguage = lang => {
    i18n.locale = lang
    setLanguage(lang)
    setAsyncStorage(AsyncStorageItems.Language, lang)
  }

  const getCurrentLocation = () => {
    LocationServiceImpl.requestForegroundPermissions().then(res => {
      if (res.granted) {
        LocationServiceImpl.getCurrentPosition().then(position => {
            let myLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
            setLocation(myLocation)
            let nearbyCity = GeolibServiceImpl.getNearPlace(myLocation,
              CityCountryInfo)
            setCity(nearbyCity.city)
            setCountry(nearbyCity.country)

          },
        ).catch(er => {
          console.error(er)
        })
      } else {
      }
    }).catch(() => {
    })
  }

  React.useEffect(() => {
    (async function () {
      setIsLoading(true)
      let localData = await multiGet([AsyncStorageItems.Language])
      let lang = localData[0][1]
      if (!lang) {
        lang = Languages.en
      }
      onSetLanguage(lang)
      getCurrentLocation()
      setIsLoading(false)
    })()
    return () => {
      try {
      } catch (e) {
      }
    }
  }, [])
  let flatListRef = React.useRef(null)

  const filterCity = () => CityCountryInfo.filter(c => c.country === country &&
    c.city.toUpperCase().includes(search.toUpperCase()))
  React.useEffect(() => {
    if (placePopup === 'city') {
      const index = filterCity().findIndex(
        c => c.city.toUpperCase() === city.toUpperCase())
      try {
        if (flatListRef && flatListRef.current !== null && index &&
          index > 0) {
          flatListRef.scrollToIndex({
            animated: true,
            index: index,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [placePopup])

  const getItemLayout = (data, index) => {
    return (
      {
        length: 57,
        offset: 57 * index,
        index,
      }
    )
  }

  const setPlaceModal = place => {
    LayoutAnimation.easeInEaseOut()
    setPlacePopup(place)
  }

  return (
    <>
      <GlobalState.Provider value={{
        language,
        setLanguage: lang => onSetLanguage(lang),
        location,
        city,
        setCity: city => setCity(city),
        country,
        setCountry: country => setCountry(country),
        placePopup,
        setPlacePopup: popup => setPlacePopup(popup),
      }}>

        <Router/>
        {placePopup &&
          <Modal close={() => {
            setPlacePopup(null)
            setSearch('')
          }
          }
                 containerStyle={{
                   flex: 0,
                   minHeight: placePopup === 'city' ? 200 : null,
                 }}>
            {placePopup === 'city' &&
              <View style={{
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Ionicons name={'chevron-back-outline'} size={18}
                          onPress={() => {
                            setPlaceModal('country')
                          }
                          }/>
                <TextInput placeholder={Translate.t('Search')}
                           style={{ paddingRight: 10 }}
                           onChangeText={t => setSearch(t)}/>
                <View/>
              </View>}
            {placePopup === 'country' ?
              <FlatList
                data={Countries.filter(
                  c => c.toUpperCase().includes(search.toUpperCase()))}
                renderItem={({ item }) => (
                  <ButtonPicker lang={item}
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                }}
                                textStyle={[
                                  item === country
                                    ? { color: 'green' }
                                    : null]}
                                onPress={() => {
                                  setCountry(item)
                                  setPlaceModal('city')
                                  setSearch('')
                                }}
                  />
                )}
                keyExtractor={i => i}
              /> :

              <FlatList
                data={CityCountryInfo.filter(c => c.country === country &&
                  c.city.toUpperCase().includes(search.toUpperCase()))}

                ref={(ref) => {
                  flatListRef = ref
                }}
                getItemLayout={getItemLayout}
                renderItem={({ item }) => (
                  <ButtonPicker lang={item.city}
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                }}
                                textStyle={[
                                  item.city === city
                                    ? { color: 'green' }
                                    : null]}
                                onPress={() => {
                                  setCity(item.city)
                                  setPlaceModal(null)
                                  setSearch('')
                                }}
                  />
                )}
                // ListEmptyComponent={() => (
                //   <View style={{
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //   }}>
                //     <Text>123</Text>
                //   </View>)
                // }
                keyExtractor={i => i.city}
              />}
          </Modal>
        }
      </GlobalState.Provider>
    </>
  )
}

export default Provider
