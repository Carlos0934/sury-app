import * as React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { removeOrders } from '../redux/order'
import { clearSelectedOrders } from '../redux/selectdOrders'
import { useAppDispatch, useAppSelector } from '../redux/store'

export const Topbar = () => {
  const count = useAppSelector((state) => state.selected.count)
  const isSelected = count > 0
  return (
    <Header
      containerStyle={[
        styles.container,
        isSelected ? styles.containerSelected : {},
      ]}
      placement={isSelected ? 'left' : 'center'}
      centerComponent={{
        text: isSelected ? `${count} selecionados` : 'Pedidos',
        style: [styles.headerTitle, isSelected ? styles.selectedStyle : {}],
      }}
      rightComponent={isSelected ? <Toolbar /> : <></>}
    />
  )
}

export const Toolbar = () => {
  const orders = useAppSelector((state) => state.selected.orders)
  const dispatch = useAppDispatch()
  const deleteToolbar = () => {
    Alert.alert(
      'Borrar pedidos',
      'Esta seguro que desea borrar los pedidos selecionados?',
      [
        {
          text: 'No',
        },
        {
          text: 'Si',
          onPress: () => {
            dispatch(removeOrders(orders))
            dispatch(clearSelectedOrders())
          },
        },
      ]
    )
  }
  return (
    <View style={styles.toolbar}>
      <Icon
        color='#3579DF'
        size={30}
        name='backup'
        style={styles.toolbarIcon}
      />
      <Icon
        color='#eb3434'
        size={30}
        name='delete'
        style={styles.toolbarIcon}
        onPress={deleteToolbar}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 85,
    alignItems: 'center',
  },
  containerSelected: {
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  selectedStyle: {
    fontSize: 18,
    color: '#111',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  toolbarIcon: {
    //marginHorizontal: 20,
  },
})
