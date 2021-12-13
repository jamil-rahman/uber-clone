import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, PixelRatio, Platform } from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { mapStyles } from '../assets/map-styles'
import { selectDestiation, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from "@env"
import { and } from 'react-native-reanimated'


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestiation)
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    const iosEdgePadding = { top: 50, right: 50, bottom: 50, left: 50 };

    const androidEdgePadding = {
        top: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.top),
        right: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.right),
        bottom: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.bottom),
        left: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.left),
    }
    const edge_Padding = (Platform.OS === 'android') ? androidEdgePadding : iosEdgePadding;
    

    useEffect(()=>{
        if(!origin || !destination) return;
        
        //zooming out when destination and origin selected
        mapRef.current.fitToSuppliedMarkers(['origin','destination'], {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        });

    },[origin, destination])

    useEffect(() => {
        if(!origin || !destination) return;

        const getTravelTime = async() =>{
            fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`)
            .then((res)=>res.json())
            .then(data=>{
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
        };
      getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_KEY])

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
