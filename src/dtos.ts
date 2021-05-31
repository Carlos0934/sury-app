export interface BaseDTO {
  id: number
  deleted?: boolean
}

export interface ItemDTO extends BaseDTO {
  price: number
  cost: number
  name: string
  code: string
}

export interface ClientDTO extends BaseDTO {
  address: string
  name: string
  last_name: string
  phone_number: string
 
}

export type UserRolesDTO = 'employee' | 'admin' | 'seller'
export interface UserDTO extends BaseDTO {
  username: string
  email: string
  password: string
  role: UserRolesDTO
}

export interface ItemQuantityDTO {
  item: number
  quantity: number
}

export interface UserAuthDTO {
  token: string
  role: UserRolesDTO
  user: string
}

export interface OrderDTO extends BaseDTO {
  items: ItemQuantityDTO[]
  total: number
  client: number
  created: string
}
export type PaymentMethodDTO = 'T' | 'E'
export type SaleMethodDTO = 'O' | 'P'

export interface CategoryDTO extends BaseDTO {
  name: string
}
