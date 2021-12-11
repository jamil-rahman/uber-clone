import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { mapStyles } from '../assets/map-styles'
import { selectDestiation, selectOrigin } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from "@env"

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestiation)
    const mapRef = useRef(null)

    useEffect(()=>{
        if(!origin || !destination) return;
        
        //zooming out when destination and origin selected
        mapRef.current.fitToSuppliedMarkers(['origin','destination'], {
            edgePadding: {
                top: 50, right: 50, bottom: 50, left: 50
            },
        });

    },[origin, destination])

    return (
        <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        customMapStyle={mapStyles}
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        >
            {origin && destination && (
                <MapViewDirections
                    lineDashPattern={[0]}
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeWidth={3}
                    strokeColor= "black"
                    optimizeWaypoints={true}
                    
                />
            )}

            {origin?.location &&(
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}

                    title="Origin"
                    description={origin.description}
                    identifier="origin"

                />
            )}

            {destination?.location &&(
                <Marker
                    coordinate={{
                    latitude:   destination.location.lat,
                    longitude:  destination.location.lng,
                        }}

                    title="Destination"
                    description={destination.description}
                    identifier="destination"

                />
            )}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
})
