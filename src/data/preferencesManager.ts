import AsyncStorage from "@react-native-async-storage/async-storage"

export interface Preferences {
    ip : string
}

export class PreferencesManager {
    private  static key = '__PREFERENCES__'
    async savePreferences(preferences : Preferences) {
        await AsyncStorage.setItem(PreferencesManager.key, JSON.stringify(preferences))
    }

    async getPreferences() {
        const json = await AsyncStorage.getItem(PreferencesManager.key)
        if (!json)
            throw new Error('Las Preferencias de usuario no existen')
        return JSON.parse(json ) as Preferences
    }
}

