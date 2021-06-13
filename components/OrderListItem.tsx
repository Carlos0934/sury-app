import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Icon } from 'react-native-elements'
import { Order } from '../src/data'
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler'
export type OrderListItemProps = {
  order: Order
  selected?: boolean
  onSelect(order: Order): void
  
}
export const OrderListItem: React.FC<OrderListItemProps> = React.memo(
  ({ order, selected, onSelect }) => {
    
    return (
      <TouchableOpacity
        onLongPress = {() => {}}
        onPress={() =>  onSelect(order)}
        style={[styles.container, selected ? styles.containerSelected : {}]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {order.client.name + ' ' + order.client.lastname}
          </Text>
          <Text style={styles.date}>
            {format(new Date(order.created), 'H:mma - dd/MM/yyyy')}
          </Text>
        </View>
        <View style={styles.mid}>
          <Text style={styles.items}>{order.items.length} Articulos</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.total}>Total: ${order.total}</Text>
          <Icon
            size={25}
            color={order.sent ? '#3579DF' : '#d9d9d9'}
            name='backup'
          />
        </View>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    elevation: 2,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  containerSelected: {
    backgroundColor: '#e4e9ee',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mid: {
    flexDirection: 'row',
    marginTop: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    opacity: 0.9,
  },
  total: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  items: {
    opacity: 0.5,
    fontSize: 16,
  },
})
