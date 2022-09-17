import { useTheme } from '@react-navigation/native'
import React from 'react'
import {
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import { isIos } from '../services/CommonServiceimpl'
import HeaderComponentServiceImpl from '../services/HeaderComponentServiceImpl'
import Translate from '../Translate'
import Search from './Search'

const Header = (props) => {
  let searchRef = React.useRef()
  const { colors } = useTheme()
  const {
    transparent,
  } = props
  return (
    <SafeAreaView
      style={[
        style.safeAreaStyle,
        { backgroundColor: colors.background },
        { paddingTop: isIos() ? 0 : StatusBar.currentHeight },
        transparent ? {
          position: 'absolute',
          top: HeaderComponentServiceImpl.getMarginTop(),
        } : { backgroundColor: colors.background }]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // height: 40,
          alignItems: 'center',
          ...props.style,
          paddingVertical: 10,
          marginHorizontal: 10,
        }}>
        {props.search &&
          <Search
            searchRef={r => searchRef = r}
            onFocus={() => {
              LayoutAnimation.easeInEaseOut()
              // setSearchWidth(width - 150)
            }
            }
            onBlur={() => {
              LayoutAnimation.easeInEaseOut()
              // setSearchWidth(150)
            }}
            placeholder={Translate.t('Search')}
            onChangeText={text => {
              props.searchFilterFunction(text)
              props.setValue(text)
            }}
            autoCorrect={false}
            value={props.value}
            containerStyle={{
              backgroundColor: 'transparent',
              // minWidth: searchWidth,
              // width: searchWidth,
              // maxWidth: width,
              // borderWidth: .3,
              borderRadius: 18,
              flex: 1,
              // marginRight: 50,
              // borderColor: isDarkMode ? Colors.black : Colors.lightGrey,
            }}
          />
        }
      </View>
    </SafeAreaView>
  )
}

export default Header

const style = StyleSheet.create({
  safeAreaStyle: {
    // backgroundColor: 'rgba(52, 52, 52, 0.1)',
    // position: 'absolute',
    // top: 20,
    zIndex: 10,
    left: 0,
    right: 0,
  },
  container: {
    // backgroundColor: '#fae609',
    marginTop: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
  },
  iconView: {
    width: 60,
    paddingTop: 10,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    fontSize: 16,
    fontWeight: '700',
    // paddingTop: 15
  },
})
