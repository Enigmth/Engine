import React from 'react'
import Request from '../../Request'

const MechanicServiceImpl = {
  get (city) {
    console.log()
    return Request.get(`/engine/get-mechanic-services?city=${city}`)
  },
}

export default MechanicServiceImpl
