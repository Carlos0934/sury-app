import { Item } from "../data";
import { APIConsumer } from "./base";



export class ItemAPI extends APIConsumer<Item> {
  
    constructor() {
       super(
        '/items'
          
       )
    }

   
}