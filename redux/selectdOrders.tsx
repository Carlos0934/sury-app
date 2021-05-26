import { createReducer, createAction } from '@reduxjs/toolkit'

interface SelectedOrdersState {
  orders: Record<string, boolean>
  count: number
}
const defaultState: SelectedOrdersState = {
  orders: {},
  count: 0,
}
export const toggleSelectedOrder = createAction<string>(
  '@selectedOrders/toggle'
)

export const selectedOrdersReducer = createReducer<SelectedOrdersState>(
  defaultState,
  (builder) => {
    builder.addCase(toggleSelectedOrder, (state, action) => {
      const exists = state.orders[action.payload] ?? false
      const factor = exists ? -1 : 1
      return {
        orders: { ...state.orders, [action.payload]: !exists },
        count: state.count + factor,
      }
    })
  }
)
