import React, { useState } from 'react'
import {
  FlatList,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MechanicalModal from '../../components/MechanicalModal'
import Search from '../../components/Search'
import GlobalState from '../../GlobalState'
import MacedonianLanguageServiceImpl
  from '../../services/MacedonianLanguageServiceImpl'
import Translate from '../../Translate'

const Call = () => {
  const [search, setSearch] = useState('')
  const [selectedInfo, setSelectedInfo] = useState(null)

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

  const onCallPress = (app) => {
    Linking.openURL(app).catch()
  }

  let context = React.useContext(GlobalState)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList data={context.mechanics.
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
                }}>
                  <Search value={search}
                          clearButtonMode={'while-editing'}
                          placeholder={Translate.t('Search')}
                          onChangeText={val => setSearch(val)}/>
                </View>}
                keyExtractor={i => i.name}
                renderItem={({ item }) => <Item item={item}/>}
                // contentContainerStyle={{ paddingBottom: tabBarHeight() }}

      />
      {selectedInfo ? <MechanicalModal
        mechanic={selectedInfo}
        onPress={() => setSelectedInfo(null)}/> : null}
    </SafeAreaView>
  )
}

export default Call
