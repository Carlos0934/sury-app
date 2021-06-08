import * as React from 'react'

import { FloatAction } from '../components/FloatActions'
import { OrderList } from '../components/OrderList'
import { Topbar } from '../components/Topbar'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../redux/store'
import { fetchOrders } from '../redux/order'
import { useSync } from '../hooks/useSync'
export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const {sync} = useSync()
  React.useEffect(() => {
    dispatch(fetchOrders())
    sync()
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
