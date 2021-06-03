import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { UserRolesDTO } from '../src/dtos'
import {AuthService} from '../src/data/auth'
export interface UserState {
  data: {
    user: string
    role: UserRolesDTO
    token : string
  }
  loading: boolean
  error: boolean
}
const defaultState: UserState = {
  data: {
    user: '',
    role: 'seller',
    token : ''
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
  token : string
}
const authService = new AuthService()
async function Login(view: LoginView): Promise<LoginData> {
  const isSuccess = await authService.login(view.user, view.password)
  if (!isSuccess) 
  throw new Error('Credenciales invalidas')
  const user = await authService.getUser()
  return user
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
