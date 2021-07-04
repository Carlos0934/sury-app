import { useCallback } from "react"
import { LoadPreferences,  SavePreferences } from "../redux/preferences"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { Preferences } from "../src/data/preferencesManager"


export const usePreferences = () => {
    const preferences = useAppSelector(state => state.preferences.data) 
    const dispatch = useAppDispatch()
    const savePreferences = useCallback((preferences : Preferences) => {
        dispatch(SavePreferences(preferences))
        
    }, []) 
    const loadPreferences = useCallback(() => {
        dispatch(LoadPreferences())
        
    } , [])
    return {preferences, loadPreferences, savePreferences}
}