import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Colors from '../constants/Colors'

const ButtonPicker = props => {
  return (
    <TouchableOpacity style={{
      padding: 10,
      backgroundColor: Colors.defaultGrey,
      margin: 10,
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
