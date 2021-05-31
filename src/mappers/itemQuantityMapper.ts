import { Mapper } from "."
import { ItemQuantity } from "../data"
import { ItemAPI } from "../data/itemAPI"
import { ItemQuantityDTO } from "../dtos"

export class ItemQuantityMapper implements Mapper<ItemQuantity , ItemQuantityDTO> {

    itemAPI = new ItemAPI()

    async dataToDTO(data : ItemQuantity) : Promise<ItemQuantityDTO> {
      
      
        return {
            
            item : data.item.id,
            quantity : data.quantity,
            
            
        }
    }
    async DTOToData(dto : ItemQuantityDTO ) : Promise<ItemQuantity> {
      
        const item = await this.itemAPI.findOne(dto.item)
        return {
            quantity : dto.quantity,
            item : item,
            
            
        }
    }

    async MapToDTO(data : ItemQuantity[]) : Promise<ItemQuantityDTO[]> {
       
        const itemQuantityDots : ItemQuantityDTO[] = await Promise.all(data.map(itemQuantity =>  this.dataToDTO(itemQuantity) ))
        
        return itemQuantityDots
    }
    async MapToData(dtos : ItemQuantityDTO[]) : Promise<ItemQuantity[]> {
        const itemQuantityData : ItemQuantity[] =  await Promise.all(dtos.map(dto => this.DTOToData(dto)) )
      
        return itemQuantityData
    }
}