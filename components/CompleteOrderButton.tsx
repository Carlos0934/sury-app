import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { addOrder } from '../redux/order'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { v4 } from 'uuid'
import { resetBuilder } from '../redux/orderBuilder'
import { Screens } from '../navigation'
import { Button, Icon } from 'react-native-elements'
import { Alert } from 'react-native'

export const CompleteOrderButton : React.FC = () => {
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
    <Button
    buttonStyle = {{
      marginHorizontal : 15,
      height: 50
    }}
    title = 'Completar'
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
      iconPosition  ='right'
     
      icon={<Icon name='done'  color='white' containerStyle = {{
        paddingHorizontal : 5,
      }} />}
    />
  )
}