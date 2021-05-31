import { BaseDTO } from "../dtos"
import { Mapper } from "../mappers"
import { APIPaged } from "./base"


export class MappedAPI<T extends BaseDTO , D extends BaseDTO>    {

    
    constructor(
        
        protected api : APIPaged<D>,
        protected mapper : Mapper<T , D>
    ){
        
    }
    
    
  
    async find() : Promise<T[]> {
        const data = await Promise.all(( await this.api.find())
            .map(inventoryDTO => this.mapper.DTOToData(inventoryDTO)))
        return  data
    }

    async findOne(id : number) : Promise<T> {
        const dto = await this.api.findOne(id)

        return this.mapper.DTOToData(dto)
    }

    async save(inventory : T)  {
   
        const dto =  await this.mapper.dataToDTO(inventory)
      

        return   this.api.save(dto)
    }
    
    async update(inventory : T) {
        const dto =  await this.mapper.dataToDTO(inventory)

        return this.api.update(dto)
    }

    async delete(id : number) {
        return this.api.delete(id)
    }
}  