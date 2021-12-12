import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import CarLight from '../components/CarLight'
import Search from '../components/Search'
import { carLights } from '../constants/CarLights'
import { CarLightsAl } from '../constants/CarLightsAl'
import { CarLightsMk } from '../constants/CarLightsMk'
import GlobalState from '../GlobalState'
import MacedonianLanguageServiceImpl
  from '../services/MacedonianLanguageServiceImpl'
import { tabBarHeight } from '../services/TabBarServiceImpl'
import Translate from '../Translate'

const { height } = Dimensions.get('window')

export default function Home () {
  const context = React.useContext(GlobalState)
  const [search, setSearch] = useState('')
  const getCarLights = () => {
    switch (context.language) {
      case 'en':
        return carLights

      case 'al':
        return CarLightsAl

      case 'mk':
        return CarLightsMk

      default:
        return carLights
    }
  }
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={getCarLights().filter(
          cl => cl.name.toUpperCase().includes(search.toUpperCase()) ||
            context.language === 'mk' && cl.name.toUpperCase().
              includes(
                MacedonianLanguageServiceImpl.convert(search.toUpperCase())))}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={{
            backgroundColor: 'white', height: 40,
            paddingBottom: 5,
            marginHorizontal: 10,
          }}>
            <Search value={search}
                    clearButtonMode={'while-editing'}
                    placeholder={Translate.t('Search')}
                    onChangeText={val => setSearch(val)}/>
          </View>}
        ListEmptyComponent={<View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height - 60,
          }}>
          <Text>{Translate.t('NoDataFound')}</Text>
        </View>}
        // contentContainerStyle={{ paddingBottom: tabBarHeight() }}
        initialNumToRender={16}
        renderItem={({ item }) => <CarLight carLight={item}/>}
        keyExtractor={i => i.image_url}/>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', paddingVertical: 10,
  },
})
