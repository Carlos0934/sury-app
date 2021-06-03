import { Mapper } from "."
import { ItemQuantity } from "../data"
import { ItemAPI } from "../data/itemAPI"
import { ItemQuantityDTO } from "../dtos"

export class ItemQuantityMapper implements Mapper<ItemQuantity , ItemQuantityDTO> {

    itemAPI = new ItemAPI()

    dataToDTO(data : ItemQuantity) : ItemQuantityDTO {
      
      
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

    MapToDTO(data : ItemQuantity[]) : ItemQuantityDTO[] {
       
        const itemQuantityDots : ItemQuantityDTO[] = data.map(itemQuantity =>  this.dataToDTO(itemQuantity) )
        
        return itemQuantityDots
    }
    async MapToData(dtos : ItemQuantityDTO[]) : Promise<ItemQuantity[]> {
        const itemQuantityData : ItemQuantity[] =  await Promise.all(dtos.map(dto => this.DTOToData(dto)) )
      
        return itemQuantityData
    }
}