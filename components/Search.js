import React from 'react'
import { TextInput, View } from 'react-native'
import Colors from '../constants/Colors'

const Search = props => {
  return (
    <View style={{
      // padding: 7,
      // backgroundColor: context.backgroundColor,
      ...props.containerStyle,
    }}>
      <TextInput
        style={{
          // margin: 10,
          height: 40,
          backgroundColor: Colors.defaultGrey,
          padding: 8,
          paddingLeft: 15,
          borderRadius: 8,
          ...props.textInputStyle,
        }}
        ref={props.searchRef}
        clearButtonMode={'always'}
        // placeholderTextColor={context.textColor}
        placeholder={props.placeholder}
        onChangeText={text => props.onChangeText(text)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
      </TextInput>
    </View>
  )
}

export default Search
