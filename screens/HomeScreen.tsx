import * as React from 'react'

import { Overlay, LinearProgress, Text } from 'react-native-elements'

import { FloatAction } from '../components/FloatActions'
import { OrderList } from '../components/OrderList'
import { Topbar } from '../components/Topbar'
import { useSync } from '../hooks/useSync'

export default function HomeScreen() {
  const { loading } = useSync()
  return (
    <>
      <Topbar />

      <OrderList />

      <FloatAction />
      <Overlay
        isVisible={loading}
        transparent
        overlayStyle={{
          backgroundColor: 'transparent',
        }}
      >
        <LinearProgress
          color='#fff'
          style={{
            width: 200,
          }}
        />
      </Overlay>
    </>
  )
}
