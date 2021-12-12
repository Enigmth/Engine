import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import * as React from 'react'

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: require('./language/en.json'),
  al: require('./language/al.json'),
  mk: require('./language/mk.json'),
}
// console.log(i18n.currentLocale());
// console.log(Localization.locale);
if (Localization.locale.includes('al')) {
  i18n.locale = 'al'
} else {
  i18n.locale = Localization.locale
}
// Set the locale once at the beginning of your app.
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true

export default i18n
