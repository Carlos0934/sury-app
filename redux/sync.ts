import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'

import { Client, Item } from '../src/data'
import { sleep } from '../utils/sleep'

export interface SyncState {
  clients: {
    loading: boolean
    error: boolean
    data: Client[]
  }
  items: {
    loading: boolean
    error: boolean
    data: Item[]
  }
}
const defaultGroup = {
  loading: false,
  error: false,
  data: [],
}
const defaultState: SyncState = {
  clients: defaultGroup,
  items: defaultGroup,
}

export const findClients = createAsyncThunk<Client[]>(
  '@sync/fetchClients',
  async () => {
    await sleep(2000)
    return Promise.resolve([
      {
        id: 1,
        address: '',
        lastname: 'Olivo Sanchez',
        phoneNumber: '',
        name: 'Carlos',
      },
      {
        id: 2,
        address: '',
        lastname: 'Joseador',
        phoneNumber: '',
        name: 'Josias',
      },
    ])
  }
)
export const findItems = createAsyncThunk('@sync/fetchItems', async () => {
  return [
    {
      id: 1,
      name: 'Dulce de leche',
      price: 20,
    },
    {
      id: 2,
      name: 'Chocolate del 9 ',
      price: 5,
    },
    {
      id: 3,
      name: 'Refresco',
      price: 15,
    },
    {
      id: 4,
      name: 'Empanada',
      price: 25,
    },
  ] as Item[]
})
export const SyncReducer = createReducer(defaultState, (builder) => {
  builder.addCase(findClients.pending, (state) => {
    return {
      ...state,
      clients: {
        loading: true,
        data: [],
        error: false,
      },
    }
  })

  builder.addCase(findClients.rejected, (state) => {
    return {
      ...state,
      clients: {
        loading: false,
        data: [],
        error: true,
      },
    }
  })

  builder.addCase(findClients.fulfilled, (state, action) => {
    return {
      ...state,
      clients: {
        loading: false,
        data: action.payload,
        error: false,
      },
    }
  })

  builder.addCase(findItems.pending, (state) => {
    return {
      ...state,
      items: {
        loading: true,
        data: [],
        error: false,
      },
    }
  })

  builder.addCase(findItems.rejected, (state) => {
    return {
      ...state,
      items: {
        loading: false,
        data: [],
        error: true,
      },
    }
  })

  builder.addCase(findItems.fulfilled, (state, action) => {
    return {
      ...state,
      items: {
        loading: false,
        data: action.payload,
        error: false,
      },
    }
  })
})
