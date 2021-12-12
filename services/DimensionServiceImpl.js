import React from 'react'
import { Dimensions } from 'react-native'

const DimensionServiceImpl = {
  get () {
    return Dimensions.get('window')
  },
  getWidth () {
    return this.get().width
  },
  getHeight () {
    return this.get().height
  },
}

export default DimensionServiceImpl
