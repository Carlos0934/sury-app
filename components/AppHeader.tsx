import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'

export type AppHeaderProps = {
  title: string
}
export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const { goBack } = useNavigation()
  return (
    <>
      <Header
        placement='center'
        leftComponent={{
          icon: 'arrow-back',
          color: 'white',
          onPress: goBack,
        }}
        centerComponent={{
          text: title,
          style: styles.text,
        }}
      />
    </>
  )
}

export const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
  },
})
