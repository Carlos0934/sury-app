
import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Divider,ListItem,Text } from 'react-native-elements'

import { Client, ItemQuantity, Order } from '../src/data'
import { CompleteOrderAction } from './CompleteOrderAction'
import { CompleteOrderButton } from './CompleteOrderButton'

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
        <Text style={styles.clientTitle} h4 >
          Total: ${order.total}
        </Text>
        <Divider />
        <View>
        <FlatList
        contentContainerStyle = {{
         
          minHeight : '60%'
        }}
        keyExtractor = {(item) => item.item.id.toString() }
          data={order.items}
          renderItem={({ item }) => (
            <ListItem key = {item.item.code} containerStyle = {styles.item} >
                
              <Text style = {[styles.itemName, styles.itemText]}>{item.item.name}</Text>
             
              
              <Text style = {styles.itemNumber}> Precio: ${item.item.price}  Cantidad: {item.quantity}</Text>
               
          
              <Text  style = {styles.itemTotal}> Total: ${ item.item.price * item.quantity}</Text>
              
              </ListItem>
        
          )}
        />
     
        </View>
       
      </View>
      {edit &&  <CompleteOrderButton/>}
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
    marginHorizontal : 'auto',
    justifyContent : 'center',
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
