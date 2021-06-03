
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserAuthDTO } from "../dtos"
import  BaseFetch  from "./axios"


export class AuthService {
    api : BaseFetch   = new BaseFetch('/api/auth')   
    private key = 'auth-key'
    constructor() {
    
    }
    private validateAuthData(data : Partial<UserAuthDTO>) : boolean {
       
        return data != null &&  data.token != null && data.user != null && data.role != null
    }
    async login( username : string , password : string ) : Promise<boolean>  {
        const response = await this.api.axios.post('/' , {
            'username' : username,
            'password' : password
        })
        
        const data : Partial<UserAuthDTO> = response.data
        if (this.validateAuthData(data)) {
            await AsyncStorage.setItem(this.key,  JSON.stringify(data))
            return true 
        }
            
        return false
    }

    async getUser() : Promise<UserAuthDTO> {
        const auth = await AsyncStorage.getItem(this.key)
        if (auth == null) {
            throw new Error('Datos de autenticación no guardados')
        }
        const data : UserAuthDTO = JSON.parse(auth) 
        if (!this.validateAuthData(data)) {
            throw new Error('Datos de autenticación invalidos')
        }
        
        return data
    }
    async isAuth() : Promise<boolean> {
        return await AsyncStorage.getItem(this.key) !== null
    }

    async logout() : Promise<void> {
        await AsyncStorage.removeItem(this.key)
    }
}