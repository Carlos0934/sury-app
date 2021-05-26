import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { FAB, Icon } from 'react-native-elements'

import { AppHeader } from '../components/AppHeader'

import { ItemListView } from '../components/ItemListView'
import { Screens } from '../navigation'
import { setTotal } from '../redux/orderBuilder'

import { useAppDispatch, useAppSelector } from '../redux/store'

export const SelectItemScreen = () => {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const count = useAppSelector(
    (state) => Object.values(state.builder.items).length
  )
  return (
    <>
      <AppHeader
        title={
          count <= 0 ? 'Seleciona un artículo' : `Tienes ${count} articulos`
        }
      />
      <ItemListView />
      {count > 0 && (
        <FAB
          onPress={() => {
            dispatch(setTotal())
            navigate(Screens.Order)
          }}
          placement='right'
          icon={<Icon name='arrow-forward' color='white' />}
        />
      )}
    </>
  )
}
