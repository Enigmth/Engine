import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonPicker from '../components/ButtonPicker'
import EngineSafeAreaView from '../components/EngineSafeAreaView'
import Modal from '../components/Modal'
import Languages from '../constants/language/Languages'
import GlobalState from '../GlobalState'
import Translate from '../Translate'
import Constants from 'expo-constants'

const Settings = () => {
  const context = React.useContext(GlobalState)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)
  const onChangeLanguage = lang => {
    context.setLanguage(lang)
    hideLangPicker()
  }

  const hideLangPicker = () => {
    setShowLanguagePicker(false)
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
        <Row name={Translate.t('Version')}>
          <Text>{Constants.manifest.version}</Text>
        </Row>
      </ScrollView>
      {showLanguagePicker &&
        <Modal close={() => hideLangPicker()}>
          <ButtonPicker lang={'Shqip'}
                        selectedLang={context.language}
                        onPress={() => onChangeLanguage(Languages.al)}/>
          <ButtonPicker lang={'English'}
                        selectedLang={context.language}
                        onPress={() => onChangeLanguage(Languages.en)}/>
          <ButtonPicker lang={'Makeдoнskи'}
                        selectedLang={context.language}
                        onPress={() => onChangeLanguage(Languages.mk)}/>
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
