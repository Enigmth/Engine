import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';

let paddingTop = StatusBar.currentHeight;
if (!paddingTop) {
  paddingTop = 40;
}
const EngineSafeAreaView = props => {
  const {colors} = useTheme();
  return (
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <View
            style={[
              props.style,
              {marginTop: paddingTop, backgroundColor: colors.background}]}>
          {props.children}
        </View>
      </View>
  );
};

export default EngineSafeAreaView;
