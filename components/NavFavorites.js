import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: "Green Road, Dhaka, Bangladesh",
    },
    {
        id:'456',
        icon: 'briefcase',
        location: 'Work',
        destiantion: 'Independent University, Bangladesh,',
    },
];

const NavFavorites = () => {
    return (
    <View>
    <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={()=>(
            <View style={[tw`bg-gray-200`, { height: 0.5}]} />

    )}
        renderItem={({ item:{ location, destiantion, icon } })=>(
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon 
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name= {icon}
                    type="ionicon"
                    color="white"
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destiantion}</Text>
                </View>
            </TouchableOpacity>
            
        )}
      />
      </View>
    )
}

export default NavFavorites

const styles = StyleSheet.create({})
