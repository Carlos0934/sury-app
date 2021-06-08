import * as React from 'react'
import {

  FlatList,

  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-elements'
import { ListItem } from 'react-native-elements'
import { useSearchItem } from '../hooks/useSearchItem'
import { removeItem } from '../redux/orderBuilder'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { ItemQuantity } from '../src/data'
import { ModalSelectQuantity } from './ModalSelectQuantity'
import { SearchBar } from './SearchBar'

export const ItemListView = () => {

  const selectedItems = useAppSelector((state) => state.builder.items)
  const dispatch = useAppDispatch()

  const [selectedItem, setSelectedItem] = React.useState<Partial<ItemQuantity> | null>(null)
  const {handleChange, result, search} = useSearchItem()
  return (
    <>
      <SearchBar placeholder = 'Buscar Artciculo' handleSearch = {handleChange} search = {search}/>
  
      <FlatList
        data={result}
        renderItem={({ item, index }) => (
          <ListItem
            key={item.code}
            containerStyle={[styles.listItem, selectedItems[item.code]  ?  styles.listItemSelected : {}]}
            onPress={() => {
              if (selectedItems[item.code]) {
                dispatch(removeItem(item))
              } else {
                setSelectedItem({
                  item : item,
                  quantity : 0
                })
              }
            }}
          >
            <Text style = {{fontWeight : '700'}}>{item.code}  {item.name}</Text>
            <Text>${item.price}</Text>
            
            <View style = {{width : 200}}>
            <Text style = {{
              textAlign : 'right',
              
              
            }}>Cantidad seclecionada:   {selectedItems[item.code]?.quantity ?? 0}</Text>
            </View>
           
          </ListItem>
        )}
      />
      <ModalSelectQuantity selectedItem = {selectedItem} onSelectedItem ={setSelectedItem}/>
    </>
  )
}

const styles = StyleSheet.create({
  
  input: {
    width: 150,
  },
  listItem : {
    width: '100%'
  },
  listItemSelected : {
    backgroundColor : '#d3d3d3'
  }
})

