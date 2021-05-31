import * as React from 'react'
import { Alert, SafeAreaView, StyleSheet, Vibration, View } from 'react-native'
import { Text } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'

import { toggleSelectedOrder } from '../redux/selectdOrders'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Order } from '../src/data'
import { OrderListItem } from './OrderListItem'

export const OrderList = () => {
  const data = useAppSelector((state) => state.order.data)
  const { orders } = useAppSelector((state) => state.selected)
  const dispatch = useAppDispatch()
  const onSelect = React.useCallback((order: Order) => {
    if(order.sent){
      Vibration.vibrate([0, 400])
      Alert.alert('Pedido ya enviado', 'no puedes enviar o borrar un pedido ya enviado.')
    }
    else
    dispatch(toggleSelectedOrder(order))
  }, [])
  return (
    <View>
    <FlatList
      data={data}
      ListFooterComponent={<SafeAreaView />}
      renderItem={({ item, index }) => (
        <OrderListItem
          order={item}
          key={index}
          onSelect={onSelect}
          selected={ Boolean(orders[item.key]) }
        />
      )}
    />
    {
      data.length === 0 && <Text style = {styles.emptyOrders}>Aqui estaran tus pedidos, realiza uno</Text>
    }
    </View>
  )
}


const styles = StyleSheet.create({
  emptyOrders : {
    textAlign : 'center',
    marginTop: 50,
    justifyContent : 'center',
    fontWeight: "bold",
    marginHorizontal : '25%',
    maxWidth: 300
    
    
  }
})