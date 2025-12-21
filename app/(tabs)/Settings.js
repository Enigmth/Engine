// import {useTheme} from '@react-navigation/native';
// import Constants from 'expo-constants';
// import React, {useState} from 'react';
// import {
//   ScrollView,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import ButtonPicker from '../../components/ButtonPicker';
// import EngineSafeAreaView from '../../components/EngineSafeAreaView';
// import Modal from '../../components/Modal';
// import Languages from '../../constants/language/Languages';
// import {MyTheme} from '../../constants/Theme';
// import GlobalState from '../../GlobalState';
// import DimensionServiceImpl from '../../services/DimensionServiceImpl';
// import Translate from '../../Translate';
//
// DimensionServiceImpl.getHeight();
// const Settings = () => {
//   const context = React.useContext(GlobalState);
//   const [showLanguagePicker, setShowLanguagePicker] = useState(false);
//   const [showCityPopup, setShowCityPopup] = useState(false);
//   const {colors} = useTheme();
//
//   const onChangeLanguage = lang => {
//     context.setLanguage(lang);
//     hideLangPicker();
//   };
//
//   const hideLangPicker = () => {
//     setShowLanguagePicker(false);
//   };
//
//   return (
//       <EngineSafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
//         <View
//             style={{
//               height: 50,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderBottomWidth: .3,
//               borderBottomColor: 'grey',
//             }}>
//           <Text style={{color: colors.text}}>{Translate.t('Settings')}</Text>
//         </View>
//         <ScrollView
//             style={{
//               flex: 1,
//               flexDirection: 'column',
//               padding: 15,
//               backgroundColor: colors.background,
//             }}>
//           <Row textColor={colors.text} name={Translate.t('Language')}>
//
//             <TouchableOpacity
//                 onPress={() => {
//                   setShowLanguagePicker(true);
//                 }}
//                 style={{
//                   justifyContent: 'space-around',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//               <Text style={{color: colors.text}}>{Translate.t('Label')}</Text>
//               <MaterialIcons color={colors.text} name={'arrow-drop-down'}
//                              size={20}/>
//             </TouchableOpacity>
//           </Row>
//           <Row textColor={colors.text} name={Translate.t('City')}>
//             <TouchableOpacity
//                 onPress={() => setShowCityPopup('city')}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//               <Text style={{color: colors.text}}>{context.city}</Text>
//               <MaterialIcons color={colors.text} name={'arrow-drop-down'}
//                              size={20}/>
//             </TouchableOpacity>
//           </Row>
//
//           <Row textColor={colors.text} name={Translate.t('DarkMode')}>
//             <Switch value={context.isDarkMode}
//                     onChange={() => context.setDarkMode(!context.isDarkMode)}/>
//           </Row>
//         </ScrollView>
//         {showLanguagePicker &&
//             <Modal close={() => hideLangPicker()}
//                    containerStyle={{
//                      flex: 0,
//                      alignItems: 'center',
//                      backgroundColor: colors.background,
//                    }}>
//               <ButtonPicker lang={'Shqip'}
//                             textStyle={{color: colors.text}}
//                             selectedLang={context.language}
//                             onPress={() => onChangeLanguage(Languages.al)}/>
//               <ButtonPicker lang={'English'}
//                             textStyle={{color: colors.text}}
//                             selectedLang={context.language}
//                             onPress={() => onChangeLanguage(Languages.en)}/>
//               <ButtonPicker lang={'Makeдoнckи'}
//                             textStyle={{color: colors.text}}
//                             selectedLang={context.language}
//                             onPress={() => onChangeLanguage(Languages.mk)}/>
//             </Modal>
//         }
//
//         {showCityPopup &&
//             <Modal close={() => setShowCityPopup(false)}
//                    containerStyle={{
//                      flex: 0,
//                      alignItems: 'center',
//                      backgroundColor: colors.background,
//                    }}>
//               <View style={{
//                 marginBottom: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 backgroundColor: MyTheme.colors.background,
//               }}>
//                 <Ionicons name={'chevron-back-outline'} size={18}
//                           color={MyTheme.colors.text}
//                           onPress={() => {
//                             MyTheme.colors('country')
//                           }
//                           }/>
//                 <TextInput placeholder={Translate.t('Search')}
//                            placeholderTextColor={MyTheme.colors.text}
//                            style={{ paddingRight: 10, color: MyTheme.colors.text }}
//                            onChangeText={t => setSearch(t)}/>
//                 <View/>
//               </View>
//             </Modal>
//         }
//       </EngineSafeAreaView>
//   );
// };
//
// const Row = (props) => {
//   return (
//       <View style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         borderBottomWidth: .5,
//         borderBottomColor: '#dadedf',
//         paddingVertical: 10,
//         alignItems: 'center',
//       }}>
//         <Text style={{color: props.textColor}}>{props.name}</Text>
//         {props.children}
//       </View>
//   );
// };
//
// export default Settings;
