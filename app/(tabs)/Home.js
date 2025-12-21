import {useTheme} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CarLight from '../../components/CarLight';
import EngineSafeAreaView from '../../components/EngineSafeAreaView';
import FlipCard from '../../components/FlipCard';
import Search from '../../components/Search';
import {carLights} from '../../constants/CarLights';
import {CarLightsAl} from '../../constants/CarLightsAl';
import {CarLightsMk} from '../../constants/CarLightsMk';
import GlobalState from '../../GlobalState';
import MacedonianLanguageServiceImpl
  from '../../services/MacedonianLanguageServiceImpl';
import Translate from '../../Translate';

const { height } = Dimensions.get('window')
export default function Home () {
  const { colors } = useTheme()
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
    <EngineSafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{
        backgroundColor: colors.background, height: 40,
        paddingBottom: 5,
        marginHorizontal: 10,
      }}>
        <Search value={search}
                containerStyle={{ flex: 1, justifyContent: 'center' }}
                clearButtonMode={'while-editing'}
                placeholder={Translate.t('Search')}
                onChangeText={val => setSearch(val)}/>
      </View>
      <FlashList
        estimatedItemSize={50}
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingBottom: 60,
        }}
        data={getCarLights().filter(
          cl => cl.name.toUpperCase().includes(search.toUpperCase()) ||
            context.language === 'mk' && cl.name.toUpperCase().
              includes(
                MacedonianLanguageServiceImpl.convert(search.toUpperCase())))}
        ListEmptyComponent={<View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height - 60,
          }}>
          <Text style={{ color: colors.text }}>{Translate.t(
            'NoDataFound')}</Text>
        </View>}
        initialNumToRender={16}
        renderItem={({ item }) => <CarLight carLight={item}/>}
        keyExtractor={i => i.image_url}/>
    </EngineSafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingVertical: 10,
  },
})
