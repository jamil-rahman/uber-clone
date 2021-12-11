import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: "33 Green Road, Dhaka, Bangladesh"
    },
    {
        id:'244',
        icon: 'briefcase',
        location: 'Work',
        destiantion: 'Independent University, Bangladesh, Dhaka, Bangladesh'
    },
];

const Test = () => {
    return (
        <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={()=>
            <View style={[tw`bg-gray-200`,{
                height: 0.5
            }]
            }>

            </View>
        }
        renderItem={({item:{
            location, destiantion, icon
        }})=>{
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
            
            }}
      />
        
    )
}

export default Test

const styles = StyleSheet.create({})
