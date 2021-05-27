import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { UserRolesDTO } from '../src/dtos'

export interface UserState {
  data: {
    user: string
    role: UserRolesDTO
  }
  loading: boolean
  error: boolean
}
const defaultState: UserState = {
  data: {
    user: '',
    role: 'seller',
  },
  loading: false,
  error: false,
}
export interface LoginView {
  password: string
  user: string
}
export interface LoginData {
  user: string
  role: UserRolesDTO
}
async function Login(view: LoginView): Promise<LoginData> {
  if (view.user !== 'admin' || view.password !== '123456')
    throw new Error('invalid data')
  return {
    user: view.user,
    role: 'seller',
  }
}
export const login = createAsyncThunk(
  '@user/login',
  async (view: LoginView) => {
    return await Login(view)
  }
)

export const logout = createAction('@user/logout')
export const UserReducer = createReducer<UserState>(defaultState, (builder) => {
  builder.addCase(login.pending, (state) => {
    state.loading = true
    state.error = false
  })
  builder.addCase(login.rejected, (state) => {
    state.loading = false
    state.error = true
  })
  builder.addCase(login.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    state.data = action.payload
  })
})
