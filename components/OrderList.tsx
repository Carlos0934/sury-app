import { useAssets } from 'expo-asset'
import * as React from 'react'
import { Alert, SafeAreaView, StyleSheet, Vibration, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'

import { toggleSelectedOrder } from '../redux/selectdOrders'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Order } from '../src/data'
import { OrderListItem } from './OrderListItem'

export const OrderList = () => {
  const data = useAppSelector((state) => state.order.data)
  const { orders } = useAppSelector((state) => state.selected)
  const dispatch = useAppDispatch()
  const [assets] = useAssets([require('../assets/images/logo.png')])
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
      data.length === 0 && assets && assets.length > 0 && <View style = {styles.emptyOrders}>
        <Image  source = {require('../assets/images/logo.png')}  style={{ width: 200, height: 200, opacity : 0.6 }} />
         <Text style = {styles.emptyOrderText} >Aqui estaran tus pedidos, realiza uno.</Text>
        </View>
       
    }
    </View>
  )
}


const styles = StyleSheet.create({
  emptyOrders : {
    
    marginTop: 100,
    
    justifyContent : 'center',
    
    marginHorizontal : '25%',
    maxWidth: 300
    
    
  },
  emptyOrderText : {
    textAlign : 'center',
    fontSize : 17,
    fontWeight: "bold",
  }
})