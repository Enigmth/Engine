import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'

let paddingTop = StatusBar.currentHeight
if (!paddingTop) {
  paddingTop = 20
}
const EngineSafeAreaView = props => {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView
        style={[
          props.style,
          { marginTop: paddingTop, backgroundColor: colors.background }]}>
        {props.children}
      </SafeAreaView>
    </View>
  )
}

export default EngineSafeAreaView
