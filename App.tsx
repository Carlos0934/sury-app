import { ThemeProvider, DefaultTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import useCachedResources from './hooks/useCachedResources'

import Navigation from './navigation'
import { store } from './redux/store'
export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ThemeProvider value={DefaultTheme}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </ThemeProvider>
    )
  }
}
