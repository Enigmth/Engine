import Colors from '../constants/Colors'

export const MyTheme = {
  dark: false,
  colors: {
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
  dark: true,
  colors: {
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

