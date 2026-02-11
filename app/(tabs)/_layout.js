import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import GlobalState from '../../GlobalState';

export default function Layout() {
  const context = React.useContext(GlobalState);
  const isDark = context.isDarkMode;

  return (
      <NativeTabs
          blurEffect="systemThinMaterial"
          minimizeBehavior="onScrollDown"
          disableTransparentOnScrollEdge
          backgroundColor={isDark ?
              'rgba(20,22,30,0.9)' :
              'rgba(255,255,255,0.9)'}
          iconColor={{
            default: isDark ? '#8D95A8' : '#8E8E93',
            selected: '#0A84FF',
          }}
          labelStyle={{
            default: {
              color: isDark ? '#8D95A8' : '#8E8E93',
              fontSize: 11,
              fontWeight: '600',
            },
            selected: {
              color: '#0A84FF',
              fontSize: 11,
              fontWeight: '700',
            },
          }}>
        <NativeTabs.Trigger name="index">
          <Icon
              sf={{
                default: 'house',
                selected: 'house.fill',
              }}
              androidSrc={{
                default: (
                    <VectorIcon family={Ionicons} name="home-outline"/>
                ),
                selected: (
                    <VectorIcon family={Ionicons} name="home"/>
                ),
              }}
          />
          <Label>Nearby</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="Home">
          <Icon
              sf={{
                default: 'car',
                selected: 'car.fill',
              }}
              androidSrc={{
                default: (
                    <VectorIcon family={MaterialCommunityIcons}
                                name="car-info"/>
                ),
                selected: (
                    <VectorIcon family={MaterialCommunityIcons}
                                name="car-info"/>
                ),
              }}
          />
          <Label>Lights</Label>
        </NativeTabs.Trigger>

        {/*<NativeTabs.Trigger name="Search" role="search"*/}
        {/*                    options={{*/}
        {/*                      title: 'Search',*/}
        {/*                      role: 'search', // Triggers the iOS 26 search-specific styling*/}
        {/*                      minimizeBehavior: 'onScrollDown' // Standard iOS 26 behavior*/}
        {/*                    }}*/}
        {/*>*/}
        {/*  <Icon*/}
        {/*      sf={{*/}
        {/*        default: 'magnifyingglass',*/}
        {/*        selected: 'magnifyingglass',*/}
        {/*      }}*/}
        {/*      androidSrc={{*/}
        {/*        default: (*/}
        {/*            <VectorIcon family={Ionicons} name="search-outline"/>*/}
        {/*        ),*/}
        {/*        selected: (*/}
        {/*            <VectorIcon family={Ionicons} name="search"/>*/}
        {/*        ),*/}
        {/*      }}*/}
        {/*  />*/}
        {/*  <Label>Search</Label>*/}
        {/*</NativeTabs.Trigger>*/}

        <NativeTabs.Trigger name="Settings">
          <Icon
              sf={{
                default: 'gearshape',
                selected: 'gearshape.fill',
              }}
              androidSrc={{
                default: (
                    <VectorIcon family={Ionicons} name="settings-outline"/>
                ),
                selected: (
                    <VectorIcon family={Ionicons} name="settings"/>
                ),
              }}
          />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
  );
}
