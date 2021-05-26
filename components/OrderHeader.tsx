import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { toggleClient } from '../redux/orderBuilder'
import { useAppDispatch, useAppSelector } from '../redux/store'

export const OrderHeader = () => {
  const { goBack } = useNavigation()
  const client = useAppSelector((state) => state.builder.client)
  const dispatch = useAppDispatch()
  return (
    <Header
      placement='center'
      leftComponent={{
        icon: 'arrow-back',
        color: 'white',
        onPress: () => {
          if (client) {
            dispatch(toggleClient())
          } else {
            goBack()
          }
        },
      }}
      centerComponent={{
        text: client ? 'Selecione  Articulos' : 'Selecionar Cliente',
        style: styles.text,
      }}
    />
  )
}

export const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
  },
})
