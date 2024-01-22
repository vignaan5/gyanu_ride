import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import tw from 'tailwind-react-native-classnames'
import { mapStyle } from './MapStyle'
import { Marker } from 'react-native-maps'



const Map = () => {
 
     const {MapLatitude,MapLongitude,MapLatitudeDelta,MapLongittudeDelta} = useSelector((state:RootState)=>state.Map);
    
  
    return (

    <MapView customMapStyle={mapStyle} initialRegion={{latitude:MapLatitude,longitude:MapLongitude,latitudeDelta:MapLatitudeDelta,longitudeDelta:MapLongittudeDelta}} style={tw`h-3/4`} >
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})