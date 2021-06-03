import * as React from 'react'
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { Button, Input, Text, SearchBar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'
import { useSearchItem } from '../hooks/useSearchItem'
import { addItem, removeItem } from '../redux/orderBuilder'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Item } from '../src/data'

export const ItemListView = () => {
  const items = useAppSelector((state) => state.sync.items.data)
  const selectedItems = useAppSelector((state) => state.builder.items)
  const dispatch = useAppDispatch()
  const [selectedItem, setSelectedItem] = React.useState<Item>()
  const [selectedQuantity, setSelectedQuantity] = React.useState<number>()
  const {handleChange, result} = useSearchItem()
  return (
    <>
    <SearchBar
        platform='android'
        onChangeText={(value) => handleChange(value)}
      />
      <FlatList
        data={result}
        renderItem={({ item, index }) => (
          <ListItem
            key={item.price}
            style={{ marginVertical: 5 }}
            onPress={() => {
              if (selectedItems[item.name]) {
                dispatch(removeItem(item))
              } else {
                setSelectedItem(item)
              }
            }}
          >
            <ListItem.Title> {item.code} - {item.name}</ListItem.Title>
            <ListItem.Subtitle right>${item.price}</ListItem.Subtitle>
          </ListItem>
        )}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={Boolean(selectedItem)}
        onRequestClose={() => {
          setSelectedItem(undefined)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              labelStyle={{
                textAlign: 'center',
              }}
              inputContainerStyle={styles.input}
              onChangeText={(e) => setSelectedQuantity(Number(e))}
              textAlign='center'
              keyboardType='numeric'
              label='Cantidad'
            />
            <Text h4>
              $
              {selectedQuantity !== undefined && selectedItem !== undefined
                ? selectedItem.price * selectedQuantity
                : 0}
            </Text>
            <Button
              containerStyle={styles.button}
              title='Agregar'
              onPress={() => {
                if (selectedQuantity && selectedItem && selectedQuantity > 0) {
                  dispatch(
                    addItem({
                      item: selectedItem,
                      quantity: selectedQuantity,
                    })
                  )
                  setSelectedItem(undefined)
                  setSelectedQuantity(undefined)
                }
              }}
            />
            <Button
              onPress={() => {
                setSelectedItem(undefined)
                setSelectedQuantity(undefined)
              }}
              title='Salir'
              type='outline'
              titleStyle={{
                color: '#fff',
              }}
              containerStyle={styles.buttonClose}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,

    marginTop: 20,
    elevation: 2,
    width: 200,

    backgroundColor: '#2196F3',
    color: '#fff',
  },

  buttonClose: {
    marginTop: 20,
    backgroundColor: '#fd3030',
    borderRadius: 20,
    elevation: 1,
    width: 200,
  },
  input: {
    width: 150,
  },
})
