import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import { v4 } from 'uuid'
import { Order } from '../data'
import { OrderAPI } from './orderAPI'

export class OrderRepository {
  private key: string = '|orders|'
  private orderAPI = new OrderAPI()
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

  async remove(
    ordersToRemove: Record<string, Order>
  ): Promise<Record<string, Order>> {
    let orders = await this.findAll()
    const ordersRemoved: Record<string, Order> = {}

    orders = orders.filter((order) => {
      if (Boolean(ordersToRemove[order.key])) {
        ordersRemoved[order.key] = order
        return false
      }
      return true
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
  private async send(orders: Order[]) {
    await this.orderAPI.sendOrders(orders)
  }
  async sendOne(order: Order) {
    order.sent = true
    
    await this.update(order)
    return order.key
  }
  async completeDay(orders: Order[]): Promise<Record<string, boolean>> {
    const now = new Date()
    const keys: Record<string, boolean> = {}
    for (const order of orders) {
      const createdAt = new Date(order.created)
      if (this.sameDay(createdAt, now)) {
        await this.send([order])
        await this.remove({ [order.key]: order })
        keys[order.key] = true
      }
    }
    return keys
  }

  private sameDay(d1: Date, d2: Date) {
    return (
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    )
  }
}
