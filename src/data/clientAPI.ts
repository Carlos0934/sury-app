import { Client } from "../data"
import { ClientDTO } from "../dtos"
import { ClientMapper } from "../mappers/clientMapper"
import { APIConsumer } from "./base"
import { MappedAPI } from "./mapped"

export class ClientAPI extends MappedAPI<Client , ClientDTO> {
    private invalidClient : Client = {
        name : 'Cliente',
        lastname : 'Borrado',
        address : '',
        phoneNumber : '',
        id : -1,
       
    }
 
    constructor() {
       super(
           new APIConsumer('/clients'),
           new ClientMapper()
       )
    }
    
 

    async findOne(id : number) {
        if (id < this.invalidClient.id)
        return this.invalidClient

        try {
            return await super.findOne(id)
        } catch (error) {
            
            return this.invalidClient
        }
    }
}
