import * as React from 'react'
import { SafeAreaView, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { toggleSelectedOrder } from '../redux/selectdOrders'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Order } from '../src/data'
import { OrderListItem } from './OrderListItem'

export const OrderList = () => {
  const { data, loading, error } = useAppSelector((state) => state.order)
  const { orders } = useAppSelector((state) => state.selected)
  const dispatch = useAppDispatch()
  const onSelect = React.useCallback((order: Order) => {
    dispatch(toggleSelectedOrder(order.key))
  }, [])
  return (
    <FlatList
      data={data}
      ListFooterComponent={<SafeAreaView />}
      renderItem={({ item, index }) => (
        <OrderListItem
          order={item}
          key={index}
          onSelect={onSelect}
          selected={orders[item.key] ?? false}
        />
      )}
    />
  )
}
