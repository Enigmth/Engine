import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

export const tabBarHeight = () => {
  return useBottomTabBarHeight() + 20
}
