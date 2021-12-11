import React from 'react'
import { FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png',
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Order food',
        image: 'https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png',
        screen: "EatScreen", //to be implemented
    }
]

const NavigationOptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    return (
        <View>
            <FlatList       //vertical list by default, but i want to make it horizontal
                data={data}
                horizontal
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> (
                    <TouchableOpacity
                    disabled={!origin} //the options would not show unless a destination is picked
                    onPress={()=>navigation.navigate(item.screen)}
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
                       
                       <View style={tw`${!origin && "opacity-20"}`}>
                           <Image
                           style={{
                               width: 120,
                               height: 120,
                               resizeMode: 'contain'
                           }}
                           source={{uri: item.image}}
                           />
                           <Text style={tw`mt-2 text-lg font-bold`}>{item.title}</Text>
                           <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name="arrowright" type="antdesign" color="white"
                            />
                       </View> 
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default NavigationOptions

const styles = StyleSheet.create({})
