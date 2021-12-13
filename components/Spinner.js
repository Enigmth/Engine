import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'

const PageLoading = props => {
  return (
    <View style={[
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }, props.isAbsolute ? style : null]}>
      <Text style={{ color: 'black',marginBottom:10 }}>{props.message}</Text>
      <ActivityIndicator color={'black'}/>
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
