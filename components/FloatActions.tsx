import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { SpeedDial } from 'react-native-elements'
import { useSync } from '../hooks/useSync'
import { Screens } from '../navigation'

export const FloatAction = () => {
  const [open, setOpen] = React.useState(false)
  const { navigate } = useNavigation()
  const { sync } = useSync()
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
        onPress={() => console.log('Delete Something')}
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
