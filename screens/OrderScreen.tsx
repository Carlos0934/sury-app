import * as React from 'react'
import { AppHeader } from '../components/AppHeader'
import { OrderView } from '../components/OrderView'
import { useAppSelector } from '../redux/store'

export function OrderScreen() {
  const { client, items, total } = useAppSelector((state) => state.builder)
  if (!client) return <></>
  return (
    <>
      <AppHeader title='Orden' />
      <OrderView
        edit
        order={{
          client,
          items: Object.values(items),
          total :  Object.values(items).reduce((acc,value ) => acc + value.item.price * value.quantity, 0),
        }}
      />
    </>
  )
}
