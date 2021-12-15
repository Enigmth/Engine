import React, { useState } from 'react'
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonPicker from '../../components/ButtonPicker'
import EngineSafeAreaView from '../../components/EngineSafeAreaView'
import MechanicalModal from '../../components/MechanicalModal'
import Modal from '../../components/Modal'
import Search from '../../components/Search'
import PageLoading from '../../components/Spinner'
import AsyncStorageItems from '../../constants/async-storage/AsyncStorageItems'
import Citys from '../../constants/Citys'
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
  const [city, setCity] = useState(Citys.TETOVO)
  const [showCityPopup, setShowCityPopup] = useState(false)

  React.useEffect(() => {
    getByCity(city)
  }, [])

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

  const onChangeCity = updatedCity => {
    if (city !== updatedCity) {
      setCity(city)
      getByCity(updatedCity)
    }
    setShowCityPopup(false)

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
      {/*<View style={{*/}
      {/*  flexDirection: 'row',*/}
      {/*}}>*/}
      {/*  <TouchableHighlight*/}
      {/*    underlayColor={'#6d2c96'}*/}
      {/*    style={[*/}
      {/*      {*/}
      {/*        marginRight: 10,*/}
      {/*      }, style.icon]}*/}
      {/*    onPress={() => onCallPress(*/}
      {/*      'viber://contact?number=' + item.tel)}>*/}
      {/*    <Ionicons*/}
      {/*      name={'ios-call'}*/}
      {/*      color={'#6d2c96'}*/}
      {/*      size={20}*/}
      {/*    />*/}
      {/*  </TouchableHighlight>*/}
      {/*  <TouchableHighlight underlayColor={'#1fb00e'}*/}
      {/*                      style={[*/}
      {/*                        style.icon]}*/}
      {/*                      onPress={() => onCallPress(*/}
      {/*                        `tel:${item.tel}`)}>*/}
      {/*    <Ionicons name={'ios-call'} color={'#1fb00e'} size={20}*/}
      {/*    />*/}
      {/*  </TouchableHighlight>*/}

      {/*</View>*/}
    </TouchableOpacity>
  )
  //
  // const onCallPress = (app) => {
  //   Linking.openURL(app).catch()
  // }

  return (
    loading ?
      <PageLoading message={Translate.t('FetchingData')}/> :
      <EngineSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
                            containerStyle={{ flex: 1 }}
                            clearButtonMode={'while-editing'}
                            placeholder={Translate.t('Search')}
                            onChangeText={val => setSearch(val)}/>
                    <TouchableOpacity
                      onPress={() => setShowCityPopup(true)}
                      style={{
                        paddingHorizontal: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text>{Translate.t(city.toUpperCase())}</Text>
                      <MaterialIcons name={'arrow-drop-down'} size={20}/>
                    </TouchableOpacity>
                  </View>}
                  keyExtractor={i => i.name + i.address}
                  renderItem={({ item }) => <Item item={item}/>}
          // contentContainerStyle={{ paddingBottom: tabBarHeight() }}

        />
        {selectedInfo ? <MechanicalModal
          mechanic={selectedInfo}
          onPress={() => setSelectedInfo(null)}/> : null}
        {showCityPopup &&
          <Modal close={() => setShowCityPopup(false)}
                 containerStyle={{ minHeight: 320 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ButtonPicker lang={Translate.t('TETOVO')}
                            onPress={() => onChangeCity(Citys.TETOVO)}/>
              <ButtonPicker lang={Translate.t('SKOPJE')}
                            onPress={() => onChangeCity(Citys.SKOPJE)}/>
              <ButtonPicker lang={Translate.t('STRUGA')}
                            onPress={() => onChangeCity(Citys.STRUGA)}/>
              <ButtonPicker lang={Translate.t('GOSTIVAR')}
                            onPress={() => onChangeCity(Citys.GOSTIVAR)}/>
              <ButtonPicker lang={Translate.t('OHRID')}
                            onPress={() => onChangeCity(Citys.OHRID)}/>
            </ScrollView>
          </Modal>
        }
      </EngineSafeAreaView>
  )
}

export default Call
