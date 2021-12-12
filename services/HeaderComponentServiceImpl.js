import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HeaderComponentServiceImpl = {
  getMarginTop () {
    return useSafeAreaInsets().top + 9
  },
}

export default HeaderComponentServiceImpl
