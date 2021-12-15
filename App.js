import React from 'react'
import Provider from './Provider'

export default function App () {
  if (__DEV__) {
    import('./ReactotronConfig')
  }
  return (
    <Provider/>
  )
}
