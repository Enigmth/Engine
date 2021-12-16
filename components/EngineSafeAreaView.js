import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'

let paddingTop = StatusBar.currentHeight
if (!paddingTop) {
  paddingTop = 20
}
const EngineSafeAreaView = props => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView
        style={[
          props.style,
          { marginTop: paddingTop, backgroundColor: 'white' }]}>
        {props.children}
      </SafeAreaView>
    </View>
  )
}

export default EngineSafeAreaView
