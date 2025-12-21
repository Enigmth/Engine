import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useLinkBuilder} from '@react-navigation/native';
import {BlurView} from 'expo-blur';
import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';
import GlobalState from '../GlobalState';
import {isIos} from '../services/CommonServiceimpl';

export function NoTaxiTabBar({
                               state,
                               descriptors,
                               navigation,
                               position,
                             }) {
  const context = React.useContext(GlobalState);
  const {buildHref} = useLinkBuilder();
  const icon = {
    Home: ({color}) => <MaterialCommunityIcons name={`car-info`} size={20}
                                               color={color}/>,
    index: ({color}) => <Ionicons name={`home`} size={20}
                                  color={color}/>,
    // Profile: ({ color }) => <Ionicons name={`settings`} size={20} color={color}/>,
  };
  return (
      <TabBar context={context}>

        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position?.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
              <TouchableOpacity
                  href={buildHref(route.name, route.params)}
                  accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={route.name}
              >
                {icon[route.name]({
                  color: isFocused ? Colors.redLine : Colors.darkBorderGrey,
                })}
              </TouchableOpacity>
          );
        })}
      </TabBar>
  );
}

const TabBar = (props) => {
  let isIosDevice = isIos();
  const {context} = props;
  return isIosDevice ? <BlurView
          tint={context.isDarkMode ? 'dark' : 'light'}
          opacity={1}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            width: 250,
            alignSelf: 'center',
            padding: 15,
            borderRadius: 18,
            shadowColor: context.isDarkMode ? '#000' : '#FFF',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowRadius: 10,
            shadowOpacity: 0.1,
            overflow: 'hidden',
          }}>
        {props.children}
      </BlurView> :
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: 250,
        alignSelf: 'center',
        padding: 15,
        borderRadius: 18,
        shadowColor: context.isDarkMode ? '#000' : '#FFF',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        overflow: 'hidden',
        backgroundColor: context.screenBackgroundColor,
      }}>
        {props.children}
      </View>;
};


