import { useTheme } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EngineSafeAreaView from '../../components/EngineSafeAreaView'
import MechanicalModal from '../../components/MechanicalModal'
import Search from '../../components/Search'
import PageLoading from '../../components/Spinner'
import AsyncStorageItems from '../../constants/async-storage/AsyncStorageItems'
import { getMechanics } from '../../constants/Mechanical_engineers'
import GlobalState from '../../GlobalState'

import {
  getAsyncStorage,
  setAsyncStorage,
} from '../../services/AsyncStorageServiceImpl'
import DimensionServiceImpl from '../../services/DimensionServiceImpl'
import GeolibServiceImpl from '../../services/GeolibServiceImpl'
import MacedonianLanguageServiceImpl
  from '../../services/MacedonianLanguageServiceImpl'
import MechanicServiceImpl from '../../services/mechanic/MechanicServiceImpl'
import Translate from '../../Translate'

const height = DimensionServiceImpl.getHeight()
const Call = () => {
  let context = React.useContext(GlobalState)
  const [search, setSearch] = useState('')
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [mechanics, setMechanics] = useState([])
  const [loading, setLoading] = useState(false)
  const { colors } = useTheme()

  React.useEffect(() => {
    getByCity(context.city)
  }, [context.city])

  const getByCity = city => {
    setLoading(true)
    MechanicServiceImpl.get(city).then(res => {
      let data = res.data
      filterByLocation(data)
      setAsyncStorage(AsyncStorageItems.Mechanics, JSON.stringify(res.data))
    }).catch((e) => {
      console.log(e)
      getAsyncStorage(AsyncStorageItems.Mechanics).then(localMechanics => {
        let data = localMechanics ? localMechanics : getMechanics()
        filterByLocation(data)
      })
    }).finally(() => {
      setLoading(false)
    })
  }

  const filterByLocation = data => {
    let nonLocationMechanics = data.filter(m => !m.latitude)
    let byDistance = data.filter(m => m.latitude)
    if (context.location) {
      byDistance = GeolibServiceImpl.orderByDistance(context.location,
        byDistance)
    }
    setMechanics([...byDistance, ...nonLocationMechanics])
  }

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedInfo(item)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#2e3136',
        borderBottomWidth: .3,
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <View>
        <Text
          style={{ fontWeight: 'bold', fontSize: 14, color: colors.text }}
          adjustsFontSizeToFit={true}
        >{item.name}</Text>
        <Text
          style={{ fontSize: 13, color: colors.text }}
          adjustsFontSizeToFit={true}
          numberOfLines={2}
        >{item.city}</Text>
        <Text style={{ fontSize: 12, color: colors.text, marginRight: 20 }}>
          {item.address}
        </Text>
      </View>
      <View>
        <MaterialIcons
          name={'keyboard-arrow-right'}
          color={colors.text}
          size={20}
        />
      </View>
    </TouchableOpacity>
  )

  return (
    loading ?
      <PageLoading message={Translate.t('FetchingData')}/> :
      <EngineSafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingVertical: 10,
        }}>
        <View style={{
          backgroundColor: colors.background, height: 40,
          paddingBottom: 5,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Search value={search}
                  containerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  clearButtonMode={'while-editing'}
                  placeholder={Translate.t('Search')}
                  onChangeText={val => setSearch(val)}/>
        </View>
        <FlashList
          estimatedItemSize={20}
          data={mechanics.
            filter(d => d.name.toUpperCase().includes(search.toUpperCase()) ||
              context.language === 'mk' && d.name.toUpperCase().
                includes(
                  MacedonianLanguageServiceImpl.convert(search.toUpperCase())))}

          contentContainerStyle={{ backgroundColor: colors.background }}
          // stickyHeaderIndices={[0]}
          // ListHeaderComponent={}
          keyExtractor={i => i.name + i.address}
          renderItem={({ item }) => <Item item={item}/>}
          ListEmptyComponent={() => (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: height - 80,
              backgroundColor: colors.background,
            }}>
              <Text style={{ color: colors.text }}> {Translate.t(
                'NoDataFound')}</Text>
            </View>
          )}
        />
        {selectedInfo ? <MechanicalModal
          mechanic={selectedInfo}
          onPress={() => setSelectedInfo(null)}/> : null}

      </EngineSafeAreaView>
  )
}

export default Call
