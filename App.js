import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, View, Text } from 'react-native'
import { carLights } from './CarLights'
import CarLight from './components/CarLight'

export default function App () {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={carLights}
                // ListHeaderComponent={
                //   <View style={{ flex: 1, alignItems: 'center',height:40,justifyContent:'center' }}>
                //     <Text style={{fontWeight:'bold'}}>Car warning lights</Text>
                //   </View>
                // }
                style={{ flex: 1 }}
                initialNumToRender={16}
                renderItem={({ item }) => <CarLight carLight={item}/>}
                keyExtractor={i => i.image_url}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
})
