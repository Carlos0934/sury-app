import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { AppHeader } from '../components/AppHeader'

import { SelectClient } from '../components/SelectClient'
import { useSync } from '../hooks/useSync'
import { Screens } from '../navigation'
import { toggleClient } from '../redux/orderBuilder'
import { useAppDispatch } from '../redux/store'

export const SelectClientScreen = () => {
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation()
  const {sync} = useSync()
  React.useEffect(() => {
    sync()
  }, [])
  return (
    <>
      <AppHeader title='Selecionar un cliente' />
      <SelectClient
        onClientSelected={(client) => {
          dispatch(toggleClient(client))
          navigate(Screens.SelectItems)
        }}
      />
    </>
  )
}
