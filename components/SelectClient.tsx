import * as React from 'react'
import { View } from 'react-native'
import {  ListItem} from 'react-native-elements'



import {SearchBar} from './SearchBar'

import { useSearchClient } from '../hooks/useSearchClient'
import { Client } from '../src/data'

export type SelectClientProps = {
  onClientSelected: (client: Client) => void
}
export const SelectClient: React.FC<SelectClientProps> = ({
  onClientSelected,
}) => {
  const { result, handleChange, search } = useSearchClient()
 
  return (
    <>
      <SearchBar handleSearch = {handleChange} search = {search}   placeholder = 'Buscar Cliente'/>
      
      <View>
        {result.map((client, i) => (
          <ListItem key={i} onPress={() => onClientSelected(client)}>
            <ListItem.Title>
              {client.name + ' ' + client.lastname}
            </ListItem.Title>
            
          </ListItem>
        ))}
      </View>
    </>
  )
}
