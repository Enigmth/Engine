import React from 'react'
import { SafeAreaView, StatusBar, Platform } from 'react-native'

const isIos = Platform.OS === 'ios'
const paddingTop = isIos ? StatusBar.currentHeight : StatusBar.currentHeight +
  20
const EngineSafeAreaView = props => {
  return (
    <SafeAreaView
      style={[props.style, { marginTop: paddingTop }]}>
      {props.children}
    </SafeAreaView>
  )
}

export default EngineSafeAreaView
