import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const CarLight = ({carLight}) => {
  const {colors} = useTheme();

  return (
      <TouchableOpacity style={{
        padding: 15,
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#2e3136',
        // borderBottomWidth: .3,
        // backgroundColor: colors.background,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 13,
        marginHorizontal: 10,
      }}>
        <View style={{justifyContent: 'center'}}>
          <Image source={carLight.image_path}
                 style={{height: 60, width: 60}}/>
        </View>
        <View style={{flexDirection: 'column', paddingLeft: 10, flex: 1}}>
          <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: colors.text,
              }}>{carLight.name}</Text>
          <Text style={{
            fontSize: 13,
            paddingTop: 5,
            color: colors.text,
          }}>{carLight.description}</Text>
        </View>

      </TouchableOpacity>
  );
};

export default CarLight;
