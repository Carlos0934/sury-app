import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Preferences, PreferencesManager } from "../src/data/preferencesManager";


export interface PreferencesState {
    loading : boolean
    error? : boolean
    data : Preferences
   
}

const defaultState  : PreferencesState = {
    loading : false,
    data : {
        ip : 'http://localhost:3000'
    }
    

}

const preferencesManager = new PreferencesManager()
export const ChangeIp = createAction<string>('@preferences/changeIp')
export const SavePreferences = createAsyncThunk('@preferences/save', async (preferences : Preferences) => {
    await preferencesManager.savePreferences(preferences)
  
    return preferences
})

export const LoadPreferences = createAsyncThunk('@preferences/load', async ()  => {
 const preferences = await preferencesManager.getPreferences()
 
  return preferences
})
export const preferenceReducer =  createReducer<PreferencesState>(defaultState, builder => {
    builder.addCase(ChangeIp, (state, action) => {
        state.data.ip = action.payload
    })

    builder.addCase(LoadPreferences.pending, (state) => {
        state.loading = true 
    })
    builder.addCase(LoadPreferences.rejected, (state) => {
        state.loading = false
        state.error = true  
    })
    builder.addCase(LoadPreferences.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.data = action.payload
    })


    builder.addCase(SavePreferences.pending, (state) => {
        state.loading = true 
    })
    builder.addCase(SavePreferences.rejected, (state) => {
        state.loading = false
        state.error = true  
    })
    builder.addCase(SavePreferences.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.data = action.payload
    })


})