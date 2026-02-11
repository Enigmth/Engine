import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Colors from '../constants/Colors'

export const MyTheme = {
  ...NavigationDefaultTheme,
  dark: NavigationDefaultTheme.dark,
  fonts: NavigationDefaultTheme.fonts,
  colors: {
    ...NavigationDefaultTheme.colors,
    textColor: '#000',
    backgroundColor: '#fff',
    card: Colors.lightGrey,
    text: 'rgb(28, 28, 30)',
    border: '#cdd4d5',
    notification: 'rgb(255, 69, 58)',
    primary: Colors.lightDark,
    background: Colors.white,
  },
}

export const DarkTheme = {
  ...NavigationDarkTheme,
  dark: NavigationDarkTheme.dark,
  fonts: NavigationDarkTheme.fonts,
  colors: {
    ...NavigationDarkTheme.colors,
    textColor: '#fff',
    backgroundColor: '#000',
    card: Colors.lightDarkTransparent,
    text: Colors.white,
    border: 'rgba(41,42,44,0.2)',
    notification: 'rgb(255, 69, 58)',
    primary: Colors.borderGrey,
    background: '#000',
  },
}
