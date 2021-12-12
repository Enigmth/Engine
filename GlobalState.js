import React, { createContext } from 'react'

const GlobalState = createContext({
  language: 'en',
})

export default GlobalState

