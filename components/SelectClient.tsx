import * as React from 'react'
import { View } from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'
import { FAB } from 'react-native-elements/dist/buttons/FAB'
import { Icon } from 'react-native-elements/dist/icons/Icon'

import { useSearchClient } from '../hooks/useSearchClient'
import { Client } from '../src/data'

export type SelectClientProps = {
  onClientSelected: (client: Client) => void
}
export const SelectClient: React.FC<SelectClientProps> = ({
  onClientSelected,
}) => {
  const { result, handleChange } = useSearchClient()

  return (
    <>
      <SearchBar
        platform='android'
        onChangeText={(value) => handleChange(value)}
      />
      <View>
        {result.map((client, i) => (
          <ListItem key={i} onPress={() => onClientSelected(client)}>
            <ListItem.Title>
              {client.name + ' ' + client.lastname}
            </ListItem.Title>
            <ListItem.Subtitle>{}</ListItem.Subtitle>
          </ListItem>
        ))}
      </View>
    </>
  )
}
