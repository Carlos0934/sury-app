
import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Divider,Text } from 'react-native-elements'

import { Client, ItemQuantity, Order } from '../src/data'
import { CompleteOrderAction } from './CompleteOrderAction'

interface OrderView {
  items: ItemQuantity[]
  client: Client
  total: number
}
export type OrderViewProps = {
  order: OrderView
  edit?: boolean
}
export const OrderView: React.FC<OrderViewProps> = ({ order, edit }) => {
  return (
    <>
      <View style={styles.container}>
        <Text h3 style={styles.clientTitle}>
          {order.client.name}
        </Text>
        <Text style={styles.clientTitle} h4>
          ${order.total}
        </Text>
        <Divider />
        <FlatList
        keyExtractor = {(item) => item.item.id.toString() }
          data={order.items}
          renderItem={({ item }) => (
            <View key={item.item.id.toString()} style={styles.item}>
              <Text style = {[styles.itemName, styles.itemText]}>{item.item.name}</Text>
              <View style = {styles.itemDetail}>
              
                <Text style = {styles.itemNumber}> Precio: ${item.item.price}  Cantidad: {item.quantity}</Text>
               
              </View>
              <Text  style = {styles.itemTotal}> Total:{ item.item.price * item.quantity}</Text>
              
              
            </View>
          )}
        />
      </View>
      {edit && <CompleteOrderAction />}
    </>
  )
}

const styles = StyleSheet.create({
  clientTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    marginTop: '10%',
  },
  item: {
    marginVertical : 10,
    width : '100%',
    backgroundColor : '#fff',
    elevation: 2,
    paddingVertical: 7,
    paddingHorizontal : 10
    
  },
  itemName : {
    fontWeight : '700',
    fontStyle : 'italic'
  },
  itemDetail : {
    flexDirection : 'row',
    alignContent : 'center',
    justifyContent : 'center',
    marginVertical : 4
    
  },
 itemText : {
  fontSize : 18,
  textAlign : 'center',
  marginTop : 2

 },
 itemNumber : {
  fontSize : 15,
  textAlign : 'center',
  
   
 },
 itemTotal : {
  fontSize : 16,
  fontWeight : '700',
  textAlign : 'center',
  padding : 2
 }
})
