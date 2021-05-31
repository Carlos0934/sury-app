import { Mapper } from "."
import { Client } from "../data"
import { ClientDTO } from "../dtos"


export  class ClientMapper implements Mapper<Client , ClientDTO>  {
    
  
    dataToDTO(data : Client) : ClientDTO {
       
        return {
            id : data.id,
            name : data.name,
            address  : data.address,
            last_name : data.lastname,
            phone_number : data.phoneNumber,
            deleted : data.deleted,
        }
    }

    async DTOToData(dto : ClientDTO) : Promise<Client> {
        
        return {
            deleted : dto.deleted,
            id : dto.id,
            name : dto.name,
            address  : dto.address,
            lastname : dto.last_name,
            phoneNumber : dto.phone_number
        }
    }

}