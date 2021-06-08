import  * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon } from "react-native-elements/"

export type SearchBarProps = {
    search : string
    handleSearch(search : string) : void
    placeholder : string
}
export const SearchBar : React.FC<SearchBarProps>= ({search, handleSearch, placeholder}) => {
    
    return (
        <Input
        containerStyle = {{marginTop : 10}}
        placeholder = {placeholder}
        
        value = {search}
        rightIcon = {
            <Visible visible = {search.length > 0}>
                     <Icon
          name='close'
          size={24}
          onPress = {() => handleSearch('')}
          color='#7e7e7e'
        />
            </Visible>
       } 
        leftIcon = {
            <Icon
            
            name='search'
            size={24}
            color='#7e7e7e'  
        />
        
        }
        onChangeText={(value) => handleSearch(value)}
      />
    )
}

export type VisibleProps = {
    visible : boolean
}
const Visible : React.FC<VisibleProps>  = ({visible, children}) => <View style = { visible? styles.enabled : styles.disabled}>
    {children}
</View>

const styles =  StyleSheet.create({
    disabled : {
        display: 'none'
    },
    enabled : {
        display: 'flex'
    }
})