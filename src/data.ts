import { BaseDTO, CategoryDTO } from './dtos'

export interface Client extends BaseDTO {
  address: string
  name: string
  lastname: string
  phoneNumber: string
}

export interface Item extends BaseDTO {
  price: number
  cost: number
  name: string
  category: CategoryDTO
  code: string
}

export interface ItemQuantity {
  item: Item
  quantity: number
}

export interface Order extends BaseDTO {
  key: string
  items: ItemQuantity[]
  total: number
  sent: boolean
  client: Client
  created: string
}
