import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import { Order } from '../src/data'
import { OrderRepository } from '../src/data/orderRepository'

interface OrderState {
  data: Order[]
  loading: boolean
  error: boolean
}
const defaultState: OrderState = {
  data: [],
  loading: false,
  error: false,
}
const orderRepository = new OrderRepository()
export const fetchOrders = createAsyncThunk('@order/fetchAll', async () => {
  const orders = await orderRepository.findAll()
  return orders
})
export const sendOrder = createAsyncThunk(
  '@order/sendOne',
  async (order: Order) => {
    await orderRepository.sendOne(order)
    return order
  }
)
export const addOrder = createAsyncThunk(
  '@order/create',
  async (order: Order) => {
    return await orderRepository.save(order)
  }
)
export const updateOrder = createAsyncThunk(
  '@order/update',
  async (order: Order) => {
    return await orderRepository.update(order)
  }
)
export const removeOrders = createAsyncThunk(
  '@order/remove',
  async (orders: Record<string, Order>) => {
    return await orderRepository.remove(orders)
  }
)

export const completeDay = createAsyncThunk(
  '@order/completeDay',
  async (orders: Order[]) => {
    return await orderRepository.completeDay(orders)
  }
)
export const orderReducer = createReducer<OrderState>(
  defaultState,
  (builder) => {
    builder.addCase(fetchOrders.rejected, () => {
      return {
        data: [],
        loading: false,
        error: true,
      }
    })
    builder.addCase(fetchOrders.pending, () => {
      return {
        data: [],
        loading: true,
        error: false,
      }
    })

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return {
        data: action.payload,
        loading: false,
        error: false,
      }
    })

    builder.addCase(sendOrder.pending, (state) => {
      return {
        data: state.data,
        loading: true,
        error: false,
      }
    })

    builder.addCase(sendOrder.rejected, (state) => {
      return {
        data: state.data,
        loading: false,
        error: true,
      }
    })

    builder.addCase(sendOrder.fulfilled, (state, action) => {
      return {
        data: state.data.map((order) =>
          order.key === action.payload.key ? action.payload : order
        ),
        loading: false,
        error: false,
      }
    })

    builder.addCase(addOrder.pending, (state, action) => {
      return {
        loading: true,
        data: state.data,
        error: false,
      }
    })
    builder.addCase(addOrder.rejected, (state, action) => {
      return {
        loading: false,
        data: state.data,
        error: true,
      }
    })
    builder.addCase(addOrder.fulfilled, (state, action) => {
      return {
        loading: false,
        data: state.data.concat(action.payload),
        error: false,
      }
    })

    builder.addCase(removeOrders.pending, (state, action) => {
      return {
        loading: true,
        data: state.data,
        error: false,
      }
    })
    builder.addCase(removeOrders.rejected, (state, action) => {
      return {
        loading: false,
        data: state.data,
        error: true,
      }
    })
    builder.addCase(removeOrders.fulfilled, (state, action) => {
      state.loading = false
      state.error = false

      state.data = state.data.filter(
        (order) => !Boolean(action.payload[order.key])
      )
    })

    builder.addCase(updateOrder.pending, (state, action) => {
      return {
        loading: true,
        data: state.data,
        error: false,
      }
    })
    builder.addCase(updateOrder.rejected, (state, action) => {
      return {
        loading: false,
        data: state.data,
        error: true,
      }
    })
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      return {
        ...state,
        data: state.data.map((order) =>
          order.key === action.payload.key ? action.payload : order
        ),
      }
    })
    builder.addCase(completeDay.pending, (state, action) => {
      return {
        loading: true,
        data: state.data,
        error: false,
      }
    })

    builder.addCase(completeDay.rejected, (state, action) => {
      return {
        loading: false,
        data: state.data,
        error: true,
      }
    })

    builder.addCase(completeDay.fulfilled, (state, action) => {
      state.loading = false
      state.error = false

      state.data = state.data = state.data.filter(
        (order) => !Boolean(action.payload[order.key])
      )
    })
  }
)
