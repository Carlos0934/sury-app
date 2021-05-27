import { createReducer, createAction } from '@reduxjs/toolkit'
import { Order } from '../src/data'

interface SelectedOrdersState {
  orders: Record<string, Order>
  count: number
}
const defaultState: SelectedOrdersState = {
  orders: {},
  count: 0,
}
export const toggleSelectedOrder = createAction<Order>('@selectedOrders/toggle')

export const clearSelectedOrders = createAction('@selectedOrders/clear')
export const selectedOrdersReducer = createReducer<SelectedOrdersState>(
  defaultState,
  (builder) => {
    builder.addCase(toggleSelectedOrder, (state, action) => {
      const exists = state.orders[action.payload.key] ?? false
      const factor = exists ? -1 : 1
      if (exists) {
        const { [action.payload.key]: removed, ...orders } = state.orders

        return {
          orders,
          count: state.count + factor,
        }
      }
      return {
        orders: { ...state.orders, [action.payload.key]: action.payload },
        count: state.count + factor,
      }
    })
    builder.addCase(clearSelectedOrders, (state) => {
      state.count = 0
      state.orders = {}
    })
  }
)
