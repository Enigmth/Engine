import React from 'react'
import { Platform, SafeAreaView, StatusBar } from 'react-native'

const isIos = Platform.OS === 'ios'
const paddingTop = isIos
  ? StatusBar.currentHeight + 10
  : StatusBar.currentHeight +
  30
const EngineSafeAreaView = props => {
  return (
    <SafeAreaView
      style={[props.style, { marginTop: paddingTop }]}>
      {props.children}
    </SafeAreaView>
  )
}

export default EngineSafeAreaView
