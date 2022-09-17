import { useTheme } from '@react-navigation/native'
import Constants from 'expo-constants'
import React, { useState } from 'react'
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonPicker from '../components/ButtonPicker'
import EngineSafeAreaView from '../components/EngineSafeAreaView'
import Modal from '../components/Modal'
import Languages from '../constants/language/Languages'
import GlobalState from '../GlobalState'
import DimensionServiceImpl from '../services/DimensionServiceImpl'
import Translate from '../Translate'

DimensionServiceImpl.getHeight()
const Settings = () => {
  const context = React.useContext(GlobalState)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)
  const { colors } = useTheme()

  const onChangeLanguage = lang => {
    context.setLanguage(lang)
    hideLangPicker()
  }

  const hideLangPicker = () => {
    setShowLanguagePicker(false)
  }

  return (
    <EngineSafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: .3,
          borderBottomColor: 'grey',
        }}>
        <Text style={{ color: colors.text }}>{Translate.t('Settings')}</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 15,
          backgroundColor: colors.background,
        }}>
        <Row textColor={colors.text} name={Translate.t('Language')}>

          <TouchableOpacity
            onPress={() => {
              setShowLanguagePicker(true)
            }}
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ color: colors.text }}>{Translate.t('Label')}</Text>
            <MaterialIcons color={colors.text} name={'arrow-drop-down'}
                           size={20}/>
          </TouchableOpacity>
        </Row>
        <Row textColor={colors.text} name={Translate.t('City')}>
          <TouchableOpacity
            onPress={() => context.setPlacePopup('city')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ color: colors.text }}>{context.city}</Text>
            <MaterialIcons color={colors.text} name={'arrow-drop-down'}
                           size={20}/>
          </TouchableOpacity>
        </Row>
        <Row textColor={colors.text} name={Translate.t('Version')}>
          <Text
            style={{ color: colors.text }}>{Constants.manifest.version}</Text>
        </Row>

        <Row textColor={colors.text} name={Translate.t('DarkMode')}>
          <Switch value={context.isDarkMode}
                  onChange={(val) => context.setDarkMode(!context.isDarkMode)}/>
        </Row>
      </ScrollView>
      {showLanguagePicker &&
        <Modal close={() => hideLangPicker()}
               containerStyle={{ flex: 0, alignItems: 'center', width: null }}>
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
      <Text style={{ color: props.textColor }}>{props.name}</Text>
      {props.children}
    </View>
  )
}

export default Settings
