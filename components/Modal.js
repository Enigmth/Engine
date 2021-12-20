import React from 'react'
import { LayoutAnimation, TouchableOpacity, View } from 'react-native'
import DimensionServiceImpl from '../services/DimensionServiceImpl'

const height = DimensionServiceImpl.getHeight()
const width = DimensionServiceImpl.getWidth()
const Modal = props => {

  React.useEffect(() => {
    LayoutAnimation.easeInEaseOut()
  }, [])
  const close = () => {
    LayoutAnimation.easeInEaseOut()
    props.close()
  }
  return (
    <View style={{
      position: 'absolute',
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      // justifyContent: 'center',
      alignItems: 'center',
      height: height,
      width: '100%',
      bottom: 0,
      zIndex: 10,
      elevation: 10,
    }}>
      <TouchableOpacity style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
                        onPress={() => close()}/>
      <View
        style={{
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          // height: height / 1.5,
          maxHeight: 350,
          flex: 1,
          marginTop: 15,
          width: width - 40,
          ...props.containerStyle,
        }}>
        {props.children}
      </View>
      <TouchableOpacity style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
                        onPress={() => close()}/>

    </View>
  )
}

export default Modal
