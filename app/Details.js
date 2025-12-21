import {useTheme} from '@react-navigation/native';
import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import DimensionServiceImpl from '../services/DimensionServiceImpl';
import SmsServiceImpl from '../services/SmsServiceImpl';
import Translate from '../Translate';

const height = DimensionServiceImpl.getHeight();
const Details = (props) => {
  const {
    name, latitude, longitude,
  } = useLocalSearchParams();
  const {mechanic} = props;
  const {colors} = useTheme();

  const onCallPress = (app) => {
    Linking.openURL(app).catch();
  };

  const openDirection = (lat, lng) => {
    const url =
        Platform.OS === 'ios'
            ?
            `https://maps.apple.com/?daddr=${lat},${lng}`
            :
            `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(e => {
      console.log(e);
    });
  };
  return (
      <>
        <View style={{
          height: 50,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={{color: colors.text, width: 60}}>{Translate.t(
                'Close')}</Text>
          </TouchableOpacity>

          <Text style={{
            fontWeight: 'bold',
            color: colors.text,
          }}>{name}</Text>

          <Text style={{color: 'transparent', width: 60}}></Text>

        </View>

        <ScrollView style={{
          flexDirection: 'column',
          // marginHorizontal: 15,
          paddingTop: 10,
          backgroundColor: colors.background,
          marginTop: 20,
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
            {latitude ?
                <Marker coordinate={{
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                }}
                        pinColor={'red'}
                        title={`${name}`}
                >
                </Marker> :
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{color: Colors.red}}>{Translate.t(
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
                textColor={colors.text}
                color={colors.card}
                onPress={() => onCallPress(
                    'tel:' + tel)}
                name={Translate.t('Call')} icon={<TouchableHighlight
                underlayColor={'#6d2c96'}
                style={[
                  {}, parkingMapStyle.icon]}
                onPress={() => onCallPress(
                    'tel:' + tel)}>
              <Ionicons
                  name={'call'}
                  color={'#1fb00e'}
                  size={20}
              />
            </TouchableHighlight>}/>

            <CallButton name={'Navigate'}
                        textColor={colors.text}
                        color={colors.card}
                        onPress={() => openDirection(latitude,
                            longitude)}
                        icon={<TouchableHighlight
                            underlayColor={'#6d2c96'}
                            style={[
                              {}, parkingMapStyle.icon]}
                            onPress={() => SmsServiceImpl.sendSMS(tel,
                                '')}>
                          <Ionicons
                              name={'navigate'}
                              color={Colors.blueLine}
                              size={20}
                              style={{}}
                          />
                        </TouchableHighlight>}/>
          </View>
        </ScrollView>
      </>
  );
};

const CallButton = ({name, icon, onPress, color, textColor}) => {
  return (
      <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: color,
            padding: 10,
            borderRadius: 8,
            flex: 1,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        {icon}
        <Text numberOfLines={1} style={{color: textColor}}
              adjustsFontSizeToFit={true}>{name}</Text>
      </TouchableOpacity>
  );
};

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
    height: height / 2.5,
    borderRadius: 30,
    marginHorizontal: 15,
    marginTop: 20,
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
    marginBottom: 5,
  },
});
export default Details;
