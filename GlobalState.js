import React, { createContext } from 'react'

const noop = () => undefined;

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: noop,
});

export const ThemeContext = createContext({
  isDarkMode: false,
  setDarkMode: noop,
  themeColors: null,
});

export const LocationContext = createContext({
  location: null,
  city: '',
  setCity: noop,
  country: '',
  setCountry: noop,
});

export const PlaceContext = createContext({
  placePopup: null,
  setPlacePopup: noop,
});

export const SearchContext = createContext({
  searchSourceTab: 'index',
  setSearchSourceTab: noop,
});

const GlobalState = createContext({
  language: 'en',
  setLanguage: noop,
  location: null,
  city: '',
  setCity: noop,
  country: '',
  setCountry: noop,
  placePopup: null,
  setPlacePopup: noop,
  searchSourceTab: 'index',
  setSearchSourceTab: noop,
  isDarkMode: false,
  setDarkMode: noop,
  themeColors: null,
})

export default GlobalState
