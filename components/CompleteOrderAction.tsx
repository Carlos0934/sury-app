import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { Alert } from 'react-native'
import { FAB, Icon } from 'react-native-elements'

import { v4 } from 'uuid'
import { Screens } from '../navigation'
import { addOrder } from '../redux/order'
import { resetBuilder } from '../redux/orderBuilder'
import { useAppDispatch, useAppSelector } from '../redux/store'

export const CompleteOrderAction = () => {
  const { items, client, total } = useAppSelector((state) => state.builder)
  const dispatch = useAppDispatch()
 
  const {navigate} = useNavigation()

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
    dispatch(resetBuilder())
    navigate(Screens.Root)
   
  }
  return (
    <FAB
      onPress={() => {
        Alert.alert(
          'Confirmación',
          '¿Esta seguro que desea completar la orden?',
          [
          
            {
              text: 'Cancel',
            },
            {
              onPress: completeOrder,
              text: 'Ok',
            },
          ]
        )
      }}
      placement='right'
      icon={<Icon name='done' color='white' />}
    />
  )
}
