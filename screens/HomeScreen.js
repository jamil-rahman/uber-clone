import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavigationOptions from '../components/NavigationOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavorites from '../components/NavFavorites';


const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
                    }} 
                />

                <GooglePlacesAutocomplete 
                placeholder="Enter pickup point"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}  //searches after 400ms after typing is finished
                styles={{
                    container:{
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18,
                    },
                }}
                query={{
                    key: GOOGLE_MAPS_KEY,
                    language: 'bn' //for bangla language
                }}
                minLength={2}   //minimum lenght of string needed to start searching
                enablePoweredByContainer= {false}   //removes the poweredByGoogle watermark
                onPress={(data, details = null)=>{
                    dispatch(setOrigin({        //dispatching or sending the information back to the data layer which takes a callback function, whose parameter is an object
                        location: details.geometry.location,
                        description: data.description
                    }))
                    dispatch(setDestination(null))
                }}
                fetchDetails={true}
                returnKeyType={'search'}


                />

                <NavigationOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

