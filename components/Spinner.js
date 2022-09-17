import { useTheme } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import Colors from '../constants/Colors'

const PageLoading = props => {
  const { colors } = useTheme()

  return (
    <View style={[
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }, props.isAbsolute ? style : null]}>
      <Text
        style={{ color: colors.text, marginBottom: 10 }}>{props.message}</Text>
      <ActivityIndicator color={colors.text}/>
    </View>)
}

export default PageLoading
const style = {
  position: 'absolute',
  zIndex: 100,
  height: '100%',
  width: '100%',
  backgroundColor: Colors.transparentRed,
}
