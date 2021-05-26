import * as React from 'react'
import { Alert } from 'react-native'
import { FAB } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { v4 } from 'uuid'
import { addOrder } from '../redux/order'
import { useAppDispatch, useAppSelector } from '../redux/store'

export const CompleteOrderAction = () => {
  const { items, client, total } = useAppSelector((state) => state.builder)
  const dispatch = useAppDispatch()
  const completeOrder = () => {
    const parsedItems = Object.values(items)
    if (!client || parsedItems.length === 0) return
    dispatch(
      addOrder({
        client,
        items: parsedItems,
        id: -1,
        created: new Date().toUTCString(),
        key: v4(),
        sent: false,
        total,
      })
    )
  }
  return (
    <FAB
      onPress={() => {
        Alert.alert(
          'Confirmación',
          'Esta seguro que desea completar la orden?',
          [
            {
              onPress: completeOrder,
              text: 'Ok',
            },
            {
              text: 'Cancel',
            },
          ]
        )
      }}
      placement='right'
      icon={<Icon name='done' color='white' />}
    />
  )
}
