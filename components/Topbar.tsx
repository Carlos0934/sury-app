import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { useAppSelector } from '../redux/store'

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
