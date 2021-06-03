import * as React from 'react'
import { Overlay, LinearProgress, Text } from 'react-native-elements'
import { useSync } from '../hooks/useSync'
import { useAppSelector } from '../redux/store'
export const Loading = () => {
  const { loading } = useSync()
  const orderLoading = useAppSelector((state) => state.order.loading)
  const userLoading = useAppSelector(state => state.user.loading)
  return (
    <Overlay
      isVisible={loading || orderLoading || userLoading}
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
  )
}
