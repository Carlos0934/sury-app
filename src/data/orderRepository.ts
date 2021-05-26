import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import {v4} from 'uuid'
import { Order } from '../data'

export class OrderRepository {
  private key: string = '|orders|'
  constructor() {}

  async save(order: Order): Promise<Order> {
    order.sent = false
    order.key = v4()
    order.created
    const orders = await this.findAll()
    orders.push(order)
    await AsyncStorage.setItem(this.key, JSON.stringify(orders))
    return order
  }

  async remove(ordersToRemove: Record<string, Order>): Promise< Record<string, Order>> {
    let orders = await this.findAll()
    const ordersRemoved : Record<string, Order> = {}
    console.log(ordersRemoved)
    orders = orders.filter((order) => {
      if (Boolean(ordersToRemove[order.key]))
      {
        console.log(order.key)
        ordersRemoved[order.key] = order
        return true
      }  
      return false
    })
    await AsyncStorage.setItem(this.key, JSON.stringify(orders))
    return ordersRemoved
  }

  async update(orderToUpdate: Order): Promise<Order> {
    let orders = await this.findAll()
    orders = orders.map((order) =>
      order.key === orderToUpdate.key ? orderToUpdate : order
    )
    return orderToUpdate
  }
  async findAll(): Promise<Order[]> {
    try {
      const json = await AsyncStorage.getItem(this.key)
      if (!json) throw new Error()

      return JSON.parse(json)
    } catch (error) {
      AsyncStorage.setItem(this.key, JSON.stringify([]))
      return []
    }
  }
  async findOne(key: string): Promise<Order | undefined> {
    const orders = await this.findAll()
    return orders.find((order) => order.key === key)
  }

  async sendOne(order: Order) {
    /// call api and send order
    order.sent = true
  }
}