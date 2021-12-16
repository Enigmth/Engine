import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
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
import GeolibServiceImpl from '../../services/GeolibServiceImpl'
import MacedonianLanguageServiceImpl
  from '../../services/MacedonianLanguageServiceImpl'
import MechanicServiceImpl from '../../services/mechanic/MechanicServiceImpl'
import Translate from '../../Translate'

const Call = () => {
  let context = React.useContext(GlobalState)
  const [search, setSearch] = useState('')
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [mechanics, setMechanics] = useState([])
  const [loading, setLoading] = useState(false)

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
      }}>
      <View>
        <Text
          style={{ fontWeight: 'bold', fontSize: 14 }}
          adjustsFontSizeToFit={true}
        >{item.name}</Text>
        <Text
          style={{ fontSize: 13, color: '#484b50' }}
          adjustsFontSizeToFit={true}
        >{item.city} {item.address}</Text>
      </View>
      <View>
        <MaterialIcons
          name={'keyboard-arrow-right'}
          // color={'#6d2c96'}
          size={20}
        />
      </View>
    </TouchableOpacity>
  )

  return (
    loading ?
      <PageLoading message={Translate.t('FetchingData')}/> :
      <EngineSafeAreaView
        style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
        <FlatList data={mechanics.
          filter(d => d.name.toUpperCase().includes(search.toUpperCase()) ||
            context.language === 'mk' && d.name.toUpperCase().
              includes(
                MacedonianLanguageServiceImpl.convert(search.toUpperCase())))}
                  style={{ backgroundColor: 'white' }}
                  stickyHeaderIndices={[0]}
                  ListHeaderComponent={<View style={{
                    backgroundColor: 'white', height: 40,
                    paddingBottom: 5,
                    marginHorizontal: 10,
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
                  </View>}
                  keyExtractor={i => i.name + i.address}
                  renderItem={({ item }) => <Item item={item}/>}
          // contentContainerStyle={{ paddingBottom: tabBarHeight() }}

        />
        {selectedInfo ? <MechanicalModal
          mechanic={selectedInfo}
          onPress={() => setSelectedInfo(null)}/> : null}

      </EngineSafeAreaView>
  )
}

export default Call
