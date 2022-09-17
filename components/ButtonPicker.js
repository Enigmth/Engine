import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const ButtonPicker = props => {
  return (
    <TouchableOpacity style={{
      padding: 8,
      // backgroundColor: Colors.defaultGrey,
      margin: 8,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      ...props.style,
    }} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.lang}</Text>
    </TouchableOpacity>
  )
}

export default ButtonPicker
