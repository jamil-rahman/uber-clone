import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'
import 'intl'
import 'intl/locale-data/jsonp/en-IN'

const data = [
    {
        id: 'Uber-X-123',
        title: 'UberX',
        multiplier: 1,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png"
    },
    {
        id: 'Uber-Moto-456',
        title: 'UberMoto',
        multiplier: 0.35,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Moto.png"
    },
    {
        id: 'Uber-X-Premier-789',
        title: 'Uber Premier',
        multiplier: 1.2,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png"
    }
]

const SURGE_RATE = 1.5


const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
     
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('NavigateCard')} 
                style={tw`absolute z-50 top-3 left-5 p-3 rounded-full`}>
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
            </View>

            <FlatList
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={( {item: {id, title, image, multiplier}, item })=>(
                <TouchableOpacity 
                onPress={()=>setSelected(item)}
                style={tw`flex-row items-center justify-between px-10 ${id===selected?.id && "bg-gray-200"}`}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain"
                        }}
                        source={{uri: image}}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl text-center`}>{title}</Text>
                        <Text style={tw`text-center font-bold`}>Drop off in {travelTimeInformation?.duration?.text}</Text>
                    </View>
                    <Text style={[tw`text-xl font-semibold`]}>
                        {new Intl.NumberFormat("en-IN",{
                            style: "currency",
                            currency: "BDT",
                        }).format(
                            (travelTimeInformation?.duration?.value * SURGE_RATE * multiplier)/6
                            
                            )}
                        

                    </Text>
                </TouchableOpacity>
            )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
