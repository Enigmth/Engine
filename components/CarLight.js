import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const CarLight = ({ carLight }) => {

  return (
    <TouchableOpacity style={{
      padding: 15,
      flex: 1,
      flexDirection: 'row',
      // backgroundColor: '#ECF0F1',
      borderBottomColor: '#2e3136',
      borderBottomWidth: .3,
    }}>
      <View style={{ justifyContent: 'center' }}>
        <Image source={carLight.image_path}
               style={{ height: 60, width: 60 }}/>
      </View>
      <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1 }}>
        <Text
          style={{ fontWeight: 'bold', fontSize: 14 }}>{carLight.name}</Text>
        <Text style={{
          fontSize: 13,
          paddingTop: 5,
          color: '#484b50',
        }}>{carLight.description}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default CarLight
