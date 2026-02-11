import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const EngineSafeAreaView = props => {
  const {colors} = useTheme();
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        {props.children}
      </SafeAreaView>
  );
};

export default EngineSafeAreaView;
