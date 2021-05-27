import * as React from 'react'

import { FloatAction } from '../components/FloatActions'
import { OrderList } from '../components/OrderList'
import { Topbar } from '../components/Topbar'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../redux/store'
import { fetchOrders } from '../redux/order'
export default function HomeScreen() {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(fetchOrders())
  }, [])
  return (
    <>
      <Topbar />

      <OrderList />

      <FloatAction />
      <Loading />
    </>
  )
}
