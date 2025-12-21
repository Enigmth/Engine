import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';

const CarLight = ({carLight}) => {
  const {colors} = useTheme();
  const [showSolution, setShowSolution] = React.useState(false);
  return (
      <TouchableOpacity
          disabled={!carLight.solution}
          onPress={() => setShowSolution(!showSolution)}
          style={{
            padding: 15,
            flex: 1,
            flexDirection: 'row',
            // borderBottomWidth: .3,
            // backgroundColor: colors.background,
            margin: 5,
            backgroundColor: 'white',
            borderRadius: 13,
            marginHorizontal: 10,
            minHeight: 120,
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
                color: showSolution ? Colors.green : colors.text,
              }}>{showSolution ? 'Solution' : carLight.name}</Text>
          <Text style={{
            fontSize: 13,
            paddingTop: 5,
            color: showSolution ? Colors.green : colors.text,
          }}>{showSolution ? carLight.solution : carLight.description}</Text>
        </View>

      </TouchableOpacity>
  );
};

export default CarLight;
