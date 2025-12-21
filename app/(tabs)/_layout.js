import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import React from 'react';
import {NoTaxiTabBar} from '../../components/NoTaxiTabBar';
import Colors from '../../constants/Colors';

export default function _layout() {
  return (
      <Tabs
          tabBar={props => <NoTaxiTabBar {...props} />}
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
              // backgroundColor: context.screenBackgroundColor,
              borderTopColor: 'grey',
            },
            // tabBarBackground: () => (
            //   <BlurView tint={context.isDarkMode ? 'dark' : 'light'}
            //             intensity={100}
            //             style={StyleSheet.absoluteFill}/>
            // ),
            // tabBarShowLabel: false,
            tabBarInactiveTintColor: Colors.darkBorderGrey,
            tabBarActiveTintColor: Colors.redLine,
            tabBarIcon: ({
                           focused,
                           size,
                           color,
                         }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = <MaterialCommunityIcons name={`car-info`} size={20}
                                                   color={color}/>;
              }
                  // else if (route.name === 'Settings') {
                  //   iconName = <Ionicons name={`settings`} size={20} color={color}/>;
              // }
              else if (route.name === 'index') {
                iconName = <Ionicons name={`home`} size={20}
                                     color={color}/>;
              } else if (route.name === 'Profile') {
                iconName =
                    <Ionicons name={`call`} size={20} color={color}/>;
              }
              return iconName;
            },
          })}>
        {/*<Tabs.Screen name="Parking"*/}
        {/*             options={{*/}
        {/*               // title: context.language.Navigations.Parking,*/}
        {/*               showLabel: true,*/}
        {/*               sceneStyle: {*/}
        {/*                 paddingBottom: 20,*/}
        {/*               },*/}
        {/*             }}*/}
        {/*             navigationOptions={{*/}
        {/*               headerShown: false,*/}
        {/*             }}/>*/}

        <Tabs.Screen
            name="index"
            options={{
              // title: context.language.Navigations.Bus,
              showLabel: true,
            }}
            navigationOptions={{
              headerShown: false,
            }}/>
        {/*<Tabs.Screen name="Profile"/>*/}
        <Tabs.Screen name="Home"/>

      </Tabs>
  );
}
