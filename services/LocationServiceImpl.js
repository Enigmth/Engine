import React from 'react';
import * as Location from 'expo-location';


const LocationServiceImpl = {
  requestForegroundPermissions() {
    return Location.requestForegroundPermissionsAsync();
  },
  getCurrentPosition() {
    return Location.getCurrentPositionAsync({ accuracy: 2 });
  }
};

export default LocationServiceImpl;
