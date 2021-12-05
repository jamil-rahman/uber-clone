import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavigationOptions from '../components/NavigationOptions';

const HomeScreen = () => {
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

                <NavigationOptions />
                
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue",
    }
})
