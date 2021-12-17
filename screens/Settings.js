import Constants from 'expo-constants'
import React, { useState } from 'react'
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonPicker from '../components/ButtonPicker'
import EngineSafeAreaView from '../components/EngineSafeAreaView'
import Modal from '../components/Modal'
import { CityInfos } from '../constants/CityInfos'
import Languages from '../constants/language/Languages'
import GlobalState from '../GlobalState'
import DimensionServiceImpl from '../services/DimensionServiceImpl'
import Translate from '../Translate'

const height = DimensionServiceImpl.getHeight()
const Settings = () => {
  const context = React.useContext(GlobalState)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)
  const [showCityPopup, setShowCityPopup] = useState(false)
  const [search, setSearch] = useState('')
  let flatListRef = React.useRef(null)
  const filterCity = () => CityInfos.filter(
    c => c.city.toUpperCase().includes(search.toUpperCase()))
  React.useEffect(() => {
    if (showCityPopup) {
      const index = filterCity().findIndex(
        c => c.city.toUpperCase() === context.city.toUpperCase())
      try {
        if (flatListRef && flatListRef.current !== null &&
          (index === 0 || index)) {
          flatListRef.scrollToIndex({
            animated: true,
            index: index,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [showCityPopup])

  const onChangeLanguage = lang => {
    context.setLanguage(lang)
    hideLangPicker()
  }

  const onChangeCity = updatedCity => {
    if (context.city !== updatedCity) {
      context.setCity(updatedCity)
      // getByCity(updatedCity)
    }
    setShowCityPopup(false)
    setSearch('')
  }

  const hideLangPicker = () => {
    setShowLanguagePicker(false)
  }

  const getItemLayout = (data, index) => {
    return (
      {
        length: 50,
        offset: 50 * index,
        index,
      }
    )
  }
  return (
    <EngineSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: .3,
          borderBottomColor: 'grey',
        }}>
        <Text>{Translate.t('Settings')}</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 15,
          backgroundColor: 'white',
        }}>
        <Row name={Translate.t('Language')}>

          <TouchableOpacity
            onPress={() => {
              setShowLanguagePicker(true)
            }}
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{Translate.t('Label')}</Text>
            <MaterialIcons name={'arrow-drop-down'} size={20}/>
          </TouchableOpacity>
        </Row>
        <Row name={Translate.t('City')}>
          <TouchableOpacity
            onPress={() => setShowCityPopup(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{context.city}</Text>
            <MaterialIcons name={'arrow-drop-down'} size={20}/>
          </TouchableOpacity>
        </Row>
        <Row name={Translate.t('Version')}>
          <Text>{Constants.manifest.version}</Text>
        </Row>
      </ScrollView>
      {showLanguagePicker &&
        <Modal close={() => hideLangPicker()} containerStyle={{ flex: 0 }}>
          <ButtonPicker lang={'Shqip'}
                        selectedLang={context.language}
                        onPress={() => onChangeLanguage(Languages.al)}/>
          <ButtonPicker lang={'English'}
                        selectedLang={context.language}
                        onPress={() => onChangeLanguage(Languages.en)}/>
          <ButtonPicker lang={'Makeдoнckи'}
                        selectedLang={context.language}
                        onPress={() => onChangeLanguage(Languages.mk)}/>
        </Modal>
      }

      {showCityPopup &&
        <Modal close={() => {
          setShowCityPopup(false)
          setSearch('')
        }
        }
               containerStyle={{ minHeight: height / 2 }}>
          <View style={{ marginBottom: 5 }}>
            <TextInput placeholder={Translate.t('Search')}
                       onChangeText={t => setSearch(t)}/>
          </View>
          <FlatList data={filterCity().filter(
            c => c.city.toUpperCase().includes(search.toUpperCase()))}
                    ref={(ref) => {
                      flatListRef = ref
                    }}
                    getItemLayout={getItemLayout}

                    renderItem={({ item }) => (
                      <ButtonPicker lang={item.city}
                                    textStyle={[
                                      item.city === context.city
                                        ? { color: 'green' }
                                        : null]}
                                    onPress={() => onChangeCity(item.city)}
                      />
                    )}
                    keyExtractor={i => i.city}
          />
        </Modal>
      }
    </EngineSafeAreaView>
  )
}

const Row = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: .5,
      borderBottomColor: '#dadedf',
      paddingVertical: 10,
      alignItems: 'center',
    }}>
      <Text>{props.name}</Text>
      {props.children}
    </View>
  )
}

export default Settings
