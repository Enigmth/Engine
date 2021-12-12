import * as geolib from 'geolib'

const GeolibServiceImpl = {
  getNearPlace (location, places) {
    return geolib.findNearest(
      location
      , places)
  },
  orderByDistance (location, places) {
    return geolib.orderByDistance(location, places)
  },
}

export default GeolibServiceImpl
