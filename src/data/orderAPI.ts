import { Item, Order } from "../data";
import { OrderDTO } from "../dtos";
import { ItemQuantityMapper } from "../mappers/itemQuantityMapper";
import { APIConsumer } from "./base";
import {format} from 'date-fns'



export class OrderAPI extends APIConsumer<OrderDTO> {
  
    constructor() {
       super(
        '/orders',
        
          
       )
    }
    private  itemQuantityMapper = new ItemQuantityMapper()
    private OrderToDTO(order : Order) : Partial<OrderDTO> {
      const items = this.itemQuantityMapper.MapToDTO(order.items)
       
        return {
          
            
            client : order.client.id,
            items, 
            localCreated : format( new Date(order.created), 'yyyy-MM-dd HH:mm')
        }
    }
    public async sendOrders(orders : Order[]) : Promise<void> {
        try {
        
            await Promise.all(orders.map(order => this.save(this.OrderToDTO(order)) ))  
        } catch (error) {
            console.log(error)
            throw error
        }
       
    }
 
   
}