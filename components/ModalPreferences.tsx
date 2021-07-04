
import React, { FC, useState } from 'react'
import {  Modal, StyleSheet, View } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'

import { usePreferences } from '../hooks/usePreferences'
import { Preferences } from '../src/data/preferencesManager'


interface ModalPreferencesPops {
    close : () => void
    visible : boolean
}
export const ModalPreferences : FC<ModalPreferencesPops> = ({close, visible}) => {
    const {preferences,savePreferences,loadPreferences} = usePreferences()
    const  [localPreferences, setLocalPreferences] = useState<Preferences>(preferences)
    React.useEffect(() => {
        loadPreferences()
    }, [])
    React.useEffect(() => {
     
        setLocalPreferences(preferences)
      
      }, [preferences])
    return <Modal
    animationType='slide'
   
    onRequestClose = {close}
    visible = {visible}>
    
         <Text style = {styles.title} h4>Preferencias</Text>
      
        <View style = {styles.container}>
       
            <Input value = {localPreferences.ip} onChangeText = {(text) => setLocalPreferences({
                ip : text
            })} label = 'Ruta del Servidor'/>

           
        </View>
        <View style  = {styles.btnContainer}>

            <Button style = {styles.btn}  title = 'Guardar' onPress = {() => {
                 savePreferences(localPreferences)
                close()
               
            }} />
            <Button style = {[styles.btn]}   type='outline' title = 'Cancelar'  onPress = {close} />
        </View>
       
    </Modal>
}

const styles = StyleSheet.create({
    title : {
        textAlign : 'center',
        marginVertical: 10
        
    },
    container : {
        height : '70%',
        marginTop : 20
       
       
    },
    btn : {
        
       width : '100%',
     
       
    },
    btnContainer : {
        height : '15%',
      
        justifyContent : 'space-around'
        
        
    }
})