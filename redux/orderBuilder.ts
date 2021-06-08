import { createAction, createReducer } from '@reduxjs/toolkit'
import { create } from 'domain'
import { Client, Item, ItemQuantity } from '../src/data'

interface OrderBuilderState {
  client?: Client
  items: Record<string, ItemQuantity>
  total: number
}

const defaultState: OrderBuilderState = {
  client: undefined,
  items: {},
  total: 0,
}
export const toggleClient = createAction<Client | undefined>(
  '@OrderBuilder/toggleClient'
)

export const addItem = createAction<ItemQuantity>('@OrderBuilder/addItem')
export const removeItem = createAction<Item>('@OrderBuilder/removeItem')
export const setTotal = createAction('@OrderBuilder/setTotal')
export const resetBuilder = createAction('@OrderBuilder/reset')
export const OrderBuilderReducer = createReducer<OrderBuilderState>(
  defaultState,
  (builder) => {
    builder.addCase(toggleClient, (state, action) => {
      if (state.client) delete state.client
      else state.client = action.payload
    })

    builder.addCase(addItem, (state, action) => {
      const detail = state.items[action.payload.item.code]
      if (detail)
        state.items[action.payload.item.code].quantity +=
          action.payload.quantity
      else state.items[action.payload.item.code] = action.payload
    })

    builder.addCase(removeItem, (state, action) => {
      delete state.items[action.payload.code]
    })

    builder.addCase(setTotal, (state) => {
      state.total = Object.values(state.items).reduce(
        (prev, act) => prev + act.item.price,
        0
      )
    })
    builder.addCase(resetBuilder, () => {
      return defaultState
    })
  }
)
