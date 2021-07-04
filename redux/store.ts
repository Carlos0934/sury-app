import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { orderReducer } from './order'
import { OrderBuilderReducer } from './orderBuilder'
import { preferenceReducer } from './preferences'
import { selectedOrdersReducer } from './selectdOrders'
import { SyncReducer } from './sync'
import { UserReducer } from './user'

export const store = configureStore({
  reducer: {
    order: orderReducer,
    selected: selectedOrdersReducer,
    sync: SyncReducer,
    builder: OrderBuilderReducer,
    user: UserReducer,
    preferences : preferenceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
