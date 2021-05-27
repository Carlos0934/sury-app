import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SpeedDial } from 'react-native-elements'
import { useSync } from '../hooks/useSync'
import { Screens } from '../navigation'
import { completeDay } from '../redux/order'
import { useAppDispatch, useAppSelector } from '../redux/store'

export const FloatAction = () => {
  const [open, setOpen] = React.useState(false)
  const { navigate } = useNavigation()
  const { sync } = useSync()
  const orders = useAppSelector((state) => state.order.data)
  const dispatch = useAppDispatch()
  const complete = () => {
    Alert.alert(
      'Terminar día',
      '¿Estas seguro que deseas completar el día? si lo haces todos tus pedidos que realizaste hoy seran enviados y eliminados de tu dispositivo.',
      [
        {
          text: 'No',
        },
        {
          text: 'Sí',
          onPress: () => {
            dispatch(completeDay(orders))
            setOpen(false)
          },
        },
      ]
    )
  }
  return (
    <SpeedDial
      containerStyle={styles.fab}
      isOpen={open}
      icon={{ name: 'edit', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <SpeedDial.Action
        icon={{ name: 'done', color: '#fff' }}
        title='Terminar día'
        onPress={complete}
      />
      <SpeedDial.Action
        icon={{ name: 'cloud-download', color: '#fff' }}
        title='Sincronizar datos'
        onPress={() => {
          sync()
          setOpen(false)
        }}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title='Crear nuevo pedido'
        onPress={() => {
          setOpen(false)
          navigate(Screens.SelectClient)
        }}
      />
    </SpeedDial>
  )
}
const styles = StyleSheet.create({
  fab: {},
})
