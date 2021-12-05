import React from 'react'
import { View, Text, Image } from 'react-native'

const CarLight = ({ carLight }) => {
  return (
    <View style={{
      padding: 15,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'ECF0F1',
      borderBottomColor: '#2e3136',
      borderBottomWidth: .3,

    }}>
      <View style={{ justifyContent: 'center' }}>
        <Image source={{ url: carLight.image_url }}
               style={{ height: 60, width: 60 }}/>
      </View>
      <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1 }}>
        <Text
          style={{ fontWeight: 'bold', fontSize: 16 }}>{carLight.name}</Text>
        <Text style={{
          fontSize: 13,
          color: '#484b50',
        }}>{carLight.description}</Text>
      </View>

    </View>
  )
}

export default CarLight
