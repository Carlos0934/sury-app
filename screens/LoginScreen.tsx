import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { Alert, SafeAreaView, StyleSheet, Vibration, View } from 'react-native'
import { Button, Icon, Image, Input } from 'react-native-elements'
import { Loading } from '../components/Loading'
import { ModalPreferences } from '../components/ModalPreferences'


import { Screens } from '../navigation'

import { useAppDispatch, useAppSelector } from '../redux/store'
import { login, LoginView } from '../redux/user'

export default function LoginScreen() {
  const dispatch = useAppDispatch()
  

  const [data, setData] = React.useState<LoginView>({
    user: '',
    password: '',
  })
  const [preferences, SetPreferences] = React.useState(false)
  const { navigate } = useNavigation()
  const user = useAppSelector((state) => state.user)
  React.useEffect(() => {
    if (user.data.user != '' && !user.error && !user.loading)
      navigate(Screens.Root)
    if (user.error) {
      Alert.alert(
        'Credenciales invalidas',
        'Asegurate de que tu usuario o contraseña sean validos'
      )
      Vibration.vibrate([0, 200])
    }
  }, [user])
 
  return (
    <>
    <SafeAreaView>
      <View style = {styles.settings}>
        <Icon name = 'settings' size = {30} color = '#777' onPress = {() => SetPreferences(true)}/>
        
      </View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/logo.png')}
        />
        <Input
          placeholder='Nombre de Usuario'
          leftIcon={<Icon name='person' size={24} color='#868686' />}
          style={styles.input}
          onChangeText={(value) =>
            setData({
              ...data,
              user: value,
            })
          }
        />

        <Input
          placeholder='Contraseña'
          leftIcon={<Icon name='lock' size={24} color='#868686' />}
          onChangeText={(value) =>
            setData({
              ...data,
              password: value,
            })
          }
          secureTextEntry
        />
        <Button
          containerStyle={styles.btn}
          title='Iniciar Sesión'
          onPress={() => {
            if (data.user.length === 0 || data.password.length === 0) {
              Alert.alert('Introduce credenciales validas')
              return
            }

            dispatch(login(data))
          }}
        />
        
      </View>
    </SafeAreaView>
    <ModalPreferences visible = {preferences} close = {() => SetPreferences(false)} />
    
    <Loading />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    paddingHorizontal: 25,
  },
  input: {
    width: 150,
  },
  image: {
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
  btn: {
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
  },
  settings : {
    marginTop : 50,
    marginRight: 25,
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
    
    
  }
})
