import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'

import { Client, Item } from '../src/data'
import { BaseFetch } from '../src/data/axios'
import { ClientAPI } from '../src/data/clientAPI'
import { ItemAPI } from '../src/data/itemAPI'
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

const itemAPI =new ItemAPI()
const clientAPI = new ClientAPI()

export const findClients = createAsyncThunk<Client[]>(
  '@sync/fetchClients',
  async () => {
    return clientAPI.find()
  }
)
export const findItems = createAsyncThunk('@sync/fetchItems', async () => {
 
  return itemAPI.find()
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
