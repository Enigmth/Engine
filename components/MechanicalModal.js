import React from 'react'
import {
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
import DimensionServiceImpl from '../services/DimensionServiceImpl'
import SmsServiceImpl from '../services/SmsServiceImpl'
import Translate from '../Translate'

const height = DimensionServiceImpl.getHeight()
const MechanicalModal = (props) => {
  const { mechanic } = props
  const latitude = mechanic.latitude ? mechanic.latitude : 42.008361
  const longitude = mechanic.longitude ? mechanic.longitude : 20.973641
  const onCallPress = (app) => {
    Linking.openURL(app).catch()
  }
  return (
    <Modal animationType={'slide'}>
      <SafeAreaView style={{
        backgroundColor: Colors.lightGrey,
      }}>
        <View style={{
          height: 50,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={props.onPress}>
            <Text>{Translate.t('Close')}</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold' }}>{mechanic.name}</Text>

          <Text style={{ color: 'transparent' }}>{Translate.t('Close')}</Text>

        </View>
      </SafeAreaView>

      <ScrollView style={{
        flexDirection: 'column',
        marginHorizontal: 15,
        paddingTop: 10,
      }}>
        <MapView
          style={parkingMapStyle.map}
          onRegionChange={props.onRegionChange}
          initialRegion={{
            // latitude: 42.008361,
            // longitude: 20.973641,
            latitude: parseFloat(
              latitude),
            longitude: parseFloat(
              longitude),
            latitudeDelta: 0.0100,
            longitudeDelta: 0.00001,
          }}
          zoomEnabled={true}
          // onPress={props.onPress}
          ref={props.mapR}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // animateToCoordinate={parkedCar}
        >
          {mechanic.latitude ?
            <Marker coordinate={{
              latitude: parseFloat(mechanic.latitude),
              longitude: parseFloat(mechanic.longitude),
            }}
                    pinColor={'red'}
                    title={`${mechanic.name}`}
            >
            </Marker> :
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: Colors.red }}>{Translate.t(
                'AddressNotFound')}</Text>
            </View>
          }
        </MapView>

        <View style={{
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingTop: 15,
        }}>
          <CallButton
            onPress={() => onCallPress(
              'tel:' + mechanic.tel)}
            name={Translate.t('Call')} icon={<TouchableHighlight
            underlayColor={'#6d2c96'}
            style={[
              {}, parkingMapStyle.icon]}
            onPress={() => onCallPress(
              'tel:' + mechanic.tel)}>
            <Ionicons
              name={'ios-call'}
              color={'#1fb00e'}
              size={20}
            />
          </TouchableHighlight>}/>
          <CallButton
            onPress={() => onCallPress(
              'viber://contact?number=' + mechanic.tel)}
            name={'Viber'} icon={<TouchableHighlight
            underlayColor={'#6d2c96'}
            style={[
              {}, parkingMapStyle.icon, { padding: 0 }]}
            onPress={() => onCallPress(
              'viber://contact?number=' + mechanic.tel)}>
            <Ionicons
              name={'ios-call'}
              color={'#6d2c96'}
              size={20}
            />
          </TouchableHighlight>}/>
          {/*<CallButton name={'Email'} icon={<TouchableHighlight*/}
          {/*  underlayColor={'#6d2c96'}*/}
          {/*  style={[*/}
          {/*    {}, parkingMapStyle.icon, { padding: 0 }]}*/}
          {/*  onPress={() => onCallPress(*/}
          {/*    'viber://contact?number=' + mechanic.tel)}>*/}
          {/*  <Ionicons*/}
          {/*    name={'ios-mail'}*/}
          {/*    color={Colors.red}*/}
          {/*    size={20}*/}
          {/*  />*/}
          {/*</TouchableHighlight>}/>*/}
          <CallButton name={'Message'}
                      onPress={() => SmsServiceImpl.sendSMS(mechanic.tel, '')}
                      icon={<TouchableHighlight
                        underlayColor={'#6d2c96'}
                        style={[
                          {}, parkingMapStyle.icon]}
                        onPress={() => SmsServiceImpl.sendSMS(mechanic.tel,
                          '')}>
                        <MaterialIcons
                          name={'sms'}
                          color={'#1fb00e'}
                          size={20}
                        />
                      </TouchableHighlight>}/>
        </View>
      </ScrollView>
    </Modal>
  )
}

const CallButton = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {icon}
      <Text numberOfLines={1} adjustsFontSizeToFit={true}>{name}</Text>
    </TouchableOpacity>
  )
}

const parkingMapStyle = StyleSheet.create({
  map: {
    flex: 1,
    shadowColor: '#e6e6e6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: height / 1.7,
    borderRadius: 8,
  },

  markerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  marker:
    {
      height: 18,
      width: 38,
      marginTop: 5,
      marginBottom: 0,
      position: 'absolute',
    },
  pickedMarker:
    {
      marginTop: 6,
      height: 23,
      width: 50,
      paddingTop: 4,
      paddingBottom: 0,
      position: 'absolute',
    },
  img: {
    height: 45,
    width: 45,
  },
  pickedImg: {
    height: 60,
    width: 60,
  },
  pickedText: {
    marginTop: 10,
    position: 'absolute',
  },
  text: {
    marginTop: 5,
    position: 'absolute',
  },
  inputContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // width: 40,
    alignItems: 'center',
    // borderRadius: 20,
    // padding: 5,
    justifyContent: 'center',
  },
})
export default MechanicalModal
