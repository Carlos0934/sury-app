import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants  from 'expo-constants'
import Axios, { AxiosInstance, AxiosError } from 'axios'
import { NotificationService } from '../services/notificationService'


export function AxiosErrorHandler(err: AxiosError): any {
  if (err.response) {
   

    if (err.response.status >= 500 && err.response.data.detail) {
      NotificationService.Message(
        'Error del servidor',
        err.response.data.detail
      )
      return
    }
    if (err.response.status >= 500) {
      NotificationService.Message('Error!!!', 'Error del servidor')
      return
    }

    if (err.response.status === 401 || err.response.status === 403) {
      NotificationService.Message(
        'Error de credenciales',
        'Credenciales enviadas no validas, asegure de que sean correctas o comuníquese con una persona que posea el rol de administrador'
      )
      return
    }

    if (err.response.status >= 400 && err.response.data.detail !== '') {
      NotificationService.Message('Error del cliente', err.response.data.detail)
      return
    }

    if (err.response.status >= 400) {
      NotificationService.Message('Error!!!', 'Error del cliente')
      return
    }

    if (err.response.data && err.response.data.detail) {
      NotificationService.Message('Mensaje de error', err.response.data.detail)
      return
    }
  }
  if (err.request) {
    NotificationService.Message('Mensaje de error', err.message)
    return
  }

  return Promise.reject(err)
}


export async function getToken(): Promise<null | string> {
  const data = await AsyncStorage.getItem('auth-key')
  if (!data) {
    return null
  }
  

  return JSON.parse(data).token
}

const host = Constants.manifest.extra!.host
export class BaseFetch {
  public axios!: AxiosInstance

  constructor(protected url: string) {
    getToken().then((token) => {
      

      this.axios = Axios.create({
        baseURL: host + url,
        timeout: 10000,
        headers: {
          Authorization: token,
        },
      })

      this.axios.interceptors.response.use((res) => {
        return res
      }, AxiosErrorHandler)
    })
  }
}


export default BaseFetch