import React, { useState } from 'react'
import {
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
import GlobalState from '../GlobalState'
import DimensionServiceImpl from '../services/DimensionServiceImpl'
import Translate from '../Translate'

const height = DimensionServiceImpl.getHeight()
const Settings = () => {
  const context = React.useContext(GlobalState)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)
  const onChangeLanguage = lang => {
    context.setLanguage(lang)
    hideLangPicker()
  }

  const hideLangPicker = () => {
    LayoutAnimation.easeInEaseOut()
    setShowLanguagePicker(false)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
              LayoutAnimation.easeInEaseOut()
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
          <Text>1.0</Text>
        </Row>
      </ScrollView>
      {showLanguagePicker &&
        <View style={{
          position: 'absolute',
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          width: '100%',
          bottom: 0,
          zIndex: 10,
          elevation: 10,
        }}>
          <TouchableOpacity style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
                            onPress={() => hideLangPicker()}/>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 8,
            }}>
            <LanguageButton lang={'Shqip'}
                            selectedLang={context.language}
                            onPress={() => onChangeLanguage('al')}/>
            <LanguageButton lang={'English'}
                            selectedLang={context.language}
                            onPress={() => onChangeLanguage('en')}/>
            <LanguageButton lang={'Makeдoнskи'}
                            selectedLang={context.language}
                            onPress={() => onChangeLanguage('mk')}/>
          </View>
          <TouchableOpacity style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
                            onPress={() => hideLangPicker()}/>

        </View>

      }
    </SafeAreaView>
  )
}

const Row = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: .5,
      borderBottomColor: '#dadedf',
      paddingVertical: 8,
    }}>
      <Text>{props.name}</Text>
      {props.children}
    </View>
  )
}
const LanguageButton = (props) => {
  return (
    <TouchableOpacity style={{
      padding: 10,
      backgroundColor: Colors.defaultGrey,
      margin: 10,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    }} onPress={props.onPress}>
      <Text style={[
        props.selectedLang && props.selectedLang.toUpperCase() ===
        props.lang.toUpperCase()
          ? { color: 'green' }
          : null]}>{props.lang}</Text>
    </TouchableOpacity>
  )
}

export default Settings
