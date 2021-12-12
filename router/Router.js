import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'
import Call from '../screens/call'

import Home from '../screens/Home'
import Settings from '../screens/Settings'

const Tab = createBottomTabNavigator()
const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => (
      {
        swipeEnabled: false,
        headerShown: false,
        // backBehavior: 'none',
        tabBarStyle: {
          // // position: 'absolute',
          // backgroundColor: Colors.defaultGrey,
          // borderRadius: 8,
          // height: 60,
          // // marginBottom: 30,
          // left: 20,
          // right: 20,
          // justifyContent: 'center',
          // alignSelf: 'center',
          // flexDirection: 'row',
        },
        tabBarShowLabel: false,
        tabBarIcon: ({
          color,
        }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = <Ionicons name={`ios-home`} size={20}
                                 color={color}/>

          } else if (route.name === 'Settings') {
            iconName = <Ionicons name={`ios-settings`} size={20}
                                 color={color}/>
          } else if (route.name === 'Call') {
            iconName = <Ionicons name={`ios-call`} size={20}
                                 color={color}/>
          }
          return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // height: 50,
            // height: '100%',
            // paddingBottom:-10
          }}>{iconName}</View>
        },
      })}
      // screenOptions={{
      //   backBehavior: 'none',
      //   showLabel: false,
      //   // activeTintColor: Colors.red,
      //   inactiveTintColor: 'gray',
      // }}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Call" component={Call}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreen"
          component={TabScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
