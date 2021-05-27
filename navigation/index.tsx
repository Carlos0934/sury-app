/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { SelectClientScreen } from '../screens/SelectClientScreen'
import { SelectItemScreen } from '../screens/SelectItemScreen'
import HomeScreen from '../screens/HomeScreen'

import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { OrderScreen } from '../screens/OrderScreen'
import LoginScreen from '../screens/LoginScreen'

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

type Screen = Record<string, keyof RootStackParamList>
export enum Screens {
  Root = 'Root',
  SelectClient = 'SelectClient',
  SelectItems = 'SelectItem',
  Order = 'Order',
  Login = 'Login',
}

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Root' component={HomeScreen} />
      <Stack.Screen name='SelectClient' component={SelectClientScreen} />
      <Stack.Screen name='SelectItem' component={SelectItemScreen} />
      <Stack.Screen name='Order' component={OrderScreen} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  )
}
