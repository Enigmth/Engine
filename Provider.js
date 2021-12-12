import i18n from 'i18n-js'
import React, { useState } from 'react'
import AsyncStorageItems from './constants/async-storage/AsyncStorageItems'
import Languages from './constants/language/Languages'
import GlobalState from './GlobalState'
import Router from './router/Router'
import { multiGet, setAsyncStorage } from './services/AsyncStorageServiceImpl'

const Provider = () => {
  const [language, setLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const onSetLanguage = lang => {
    i18n.locale = lang
    setLanguage(lang)
    setAsyncStorage(AsyncStorageItems.Language, lang)
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
    }}>

      <Router/>

    </GlobalState.Provider>
  )
}

export default Provider
