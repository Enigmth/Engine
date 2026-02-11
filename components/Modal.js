import { useTheme } from '@react-navigation/native'
import React from 'react'
import {
  LayoutAnimation,
  Modal as ReactModal,
  Platform,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native'
import DimensionServiceImpl from '../services/DimensionServiceImpl'

const height = DimensionServiceImpl.getHeight()
const width = DimensionServiceImpl.getWidth()
const Modal = props => {
  const isClosingRef = React.useRef(false);

  React.useEffect(() => {
    if (Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    try {
      LayoutAnimation.easeInEaseOut();
    } catch (e) {
      console.log('Modal animation error', e);
    }
  }, [])
  const close = () => {
    if (isClosingRef.current) {
      return;
    }
    isClosingRef.current = true;
    try {
      LayoutAnimation.easeInEaseOut();
    } catch (e) {
      console.log('Modal close animation error', e);
    }
    props.close()
  }
  const { colors } = useTheme()

  return (<View style={{
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.5)', // justifyContent: 'center',
    height: height,
    width: width,
    bottom: 0,
    zIndex: 10,
    elevation: 10,
  }}>
    <ReactModal
      transparent={true}
      animationType="slide"
      onRequestClose={() => close()}>
      <TouchableOpacity style={{
        flex: 1, height: '100%', width: '100%',
      }}
                        onPress={() => close()}/>
      <View
        style={{
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 8, // height: height / 1.5,
          maxHeight: 350,
          flex: 1,
          marginTop: 15,
          justifyContent: 'center', ...props.containerStyle,
          marginHorizontal: 20,
          zIndex: 50,
          elevation: 50,
        }}>
        {props.children}
      </View>
      <TouchableOpacity style={{
        flex: 1, height: '100%', width: '100%',
      }}
                        onPress={() => close()}/>
    </ReactModal>
  </View>)
}

export default Modal
