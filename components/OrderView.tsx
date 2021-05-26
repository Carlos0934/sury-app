import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Divider, FAB, Icon, ListItem, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Screens } from '../navigation'
import { useAppSelector } from '../redux/store'
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
          data={order.items}
          renderItem={({ item }) => (
            <View key={item.item.id} style={styles.item}>
              <Text>
                {`${item.item.name} $${item.item.price} ${item.quantity}  $${
                  item.item.price * item.quantity
                }`}
              </Text>
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
  item: {},
})
