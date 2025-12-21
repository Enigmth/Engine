import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TextInput, View} from 'react-native';

const Search = props => {
  const {colors} = useTheme();
  return (
      <View style={{
        // padding: 7,
        // backgroundColor: context.backgroundColor,
        ...props.containerStyle,
      }}>
        <TextInput
            style={{
              // margin: 10,
              maxHeight: 40,
              backgroundColor: colors.card,
              padding: 8,
              paddingLeft: 15,
              borderRadius: 13,
              ...props.textInputStyle,
            }}
            ref={props.searchRef}
            clearButtonMode={'always'}
            // placeholderTextColor={context.textColor}
            placeholder={props.placeholder}
            onChangeText={text => props.onChangeText(text)}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            placeholderTextColor={colors.text}
        >
        </TextInput>
      </View>
  );
};

export default Search;
