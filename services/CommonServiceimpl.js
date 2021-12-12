import { Platform } from 'react-native'

export const isIos = () => {
  return Platform.OS === 'ios'
}

export const keyboardAvoidViewBehavior = () => {
  return isIos() ? 'padding' : null
}
