import React from 'react'
import { Text } from 'react-native'
import GlobalState from '../GlobalState'

const DefaultText = (props) => {
  const context = React.useContext(GlobalState)
  return (
    <Text style={{ color: context.textColor }}>
      {props.children}
    </Text>
  )
}

export default DefaultText;
