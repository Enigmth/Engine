import i18n from 'i18n-js'
import React, { useState } from 'react'
import AsyncStorageItems from './constants/async-storage/AsyncStorageItems'
import Citys from './constants/Citys'
import Languages from './constants/language/Languages'
import GlobalState from './GlobalState'
import Router from './router/Router'
import { multiGet, setAsyncStorage } from './services/AsyncStorageServiceImpl'
import LocationServiceImpl from './services/LocationServiceImpl'

const Provider = () => {
  const [language, setLanguage] = useState(Languages.en)
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(Citys.TETOVO)

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

  return (
    <GlobalState.Provider value={{
      language,
      setLanguage: lang => onSetLanguage(lang),
      location,
      city,
      setCity: city => setCity(city),
    }}>

      <Router/>

    </GlobalState.Provider>
  )
}

export default Provider
