import i18n from 'i18n-js'
import React, { useState } from 'react'
import AsyncStorageItems from './constants/async-storage/AsyncStorageItems'
import Languages from './constants/language/Languages'
import { getMechanics } from './constants/Mechanical_engineers'
import GlobalState from './GlobalState'
import Router from './router/Router'
import { multiGet, setAsyncStorage } from './services/AsyncStorageServiceImpl'
import GeolibServiceImpl from './services/GeolibServiceImpl'
import LocationServiceImpl from './services/LocationServiceImpl'

const Provider = () => {
  const [language, setLanguage] = useState(Languages.en)
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [mechanics, setMechanics] = useState([])
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
            let nonLocationMechanics = getMechanics().filter(m => !m.latitude)
            let byDistance = GeolibServiceImpl.orderByDistance(myLocation,
              getMechanics().filter(m => m.latitude))
            setMechanics([...byDistance, ...nonLocationMechanics])
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
      setMechanics(getMechanics())
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

  return (
    <GlobalState.Provider value={{
      language,
      setLanguage: lang => onSetLanguage(lang),
      mechanics,
    }}>

      <Router/>

    </GlobalState.Provider>
  )
}

export default Provider
