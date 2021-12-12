import React from 'react'
import { StyleSheet, View } from 'react-native'

const DrawerIcon = props => (
  <View style={style.container} {...props}>
    <View style={[style.item, { backgroundColor: props.itemColor }]}/>
    <View style={[
      style.item, {
        backgroundColor: props.itemColor,
        width: 20,
      }]}/>
    <View style={{
      ...style.item,
      width: 15,
      backgroundColor: props.itemColor,
    }}/>
  </View>
)

export default DrawerIcon

const style = StyleSheet.create({
  item: {
    borderRadius: 4,
    backgroundColor: '#DADADA',
    marginBottom: 3,
    height: 3,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 25,
  },
})
