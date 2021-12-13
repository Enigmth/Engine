import AsyncStorage from '@react-native-async-storage/async-storage'

export function setAsyncStorage (key, value) {
  AsyncStorage.setItem(key, value.toString()).catch((er) => {
    console.log(er)
  })
}

export function multiGet (items) {
  return AsyncStorage.multiGet(items)
}

export function getAsyncStorage (item) {
  return AsyncStorage.getItem(item)
}
