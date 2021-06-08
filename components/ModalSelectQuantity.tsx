import * as React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { addItem } from '../redux/orderBuilder'
import { useAppDispatch } from '../redux/store'
import { ItemQuantity } from '../src/data'

export type ModalSelectQuantityProps = {
    selectedItem : Partial<ItemQuantity> | null
    onSelectedItem (item : Partial<ItemQuantity> | null) : void
}
export const ModalSelectQuantity : React.FC<ModalSelectQuantityProps> =  ({selectedItem, onSelectedItem}) => {
    const dispatch = useAppDispatch()
    return (
        <Modal
animationType='slide'
transparent={true}
visible={Boolean(selectedItem)}
onRequestClose={() => {
  onSelectedItem(null)
}}
>
<View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Input
      labelStyle={{
        textAlign: 'center',
      }}
    
      
      inputContainerStyle={styles.input}
      onChangeText={(e) => onSelectedItem({ item : selectedItem?.item, quantity: Number(e)})}
      textAlign='center'
      keyboardType='numeric'
      label='Cantidad del Articulo'
    />
    <Text h4>
      $
      {selectedItem?.item && selectedItem.quantity 
        ? selectedItem.item.price * selectedItem.quantity
        : 0}
    </Text>
    <Button
      containerStyle={styles.button}
      title='Agregar'
      onPress={() => {
        if (selectedItem && selectedItem.quantity   &&selectedItem.quantity > 0 && selectedItem.item) {
          dispatch(
            addItem({
              item: selectedItem.item,
              quantity: selectedItem.quantity,
            })
          )
          onSelectedItem(null)
          
        }
      }}
    />
    <Button
      onPress={() => {
        onSelectedItem(null)
        
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
    )
}

export default React.memo(ModalSelectQuantity)
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
  