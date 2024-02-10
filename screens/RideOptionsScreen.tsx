
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context'
import { FlatList, GestureHandlerRootView, ScrollView, State } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import MyBottomSheetReducer, { MyBottomSheetReducerSlice } from '../redux/reducers/MyBottomSheetReducer';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_API_KEY} from '@env'
import { useNavigation } from '@react-navigation/native';
import { MapSlice } from '../redux/reducers/MapReducer';
import { mapStyle } from '../compenents/MapStyle';
import tw from 'tailwind-react-native-classnames'
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import { Image } from 'react-native';
import { createRideRequest, getRideStatusDetails } from '../firebase/firestoreActions';


const RideOptionsScreen = () => {

    var [checkedTimes,setCheckedTimes]=useState(0);
    var [checkRideAcceptedStatus,setCheckRideAcceptedStatus] = useState(false)
    var [bookcab,setCab] = useState(true)
    var [bookbike,setbike] = useState(false)
    var bottomSheetRef = useRef()
    var snapPoints:String = ["50%"]
    var [distance,setDistance] = useState(0.0);
    var [carPrice,setCarprice] = useState(0);
    var [bikePrice,setBikeprice] = useState(0);
    const mapRef = useRef<MapView>();
    const{DropLatitude,DropLongitude,DropMarkerVisible,MapLatitude,MapLatitudeDelta,MapLongittudeDelta,MapLongitude,PickupLatittude,PickupLongitude,PickupMarkerVisible,canSelectPickUpMarker,canSelectDropMarker} =useSelector((state:RootState)=>state.Map);
    const {mobileNumber} =useSelector((state:RootState)=>state.AuthAccess);
    const [bookCabBtnStatus,setbookCabBtnStatus] = useState(false);



  return (
        
    <>
    <View style={{flex:1}}>
         <MapView
    provider="google"
     ref={mapRef}
     showsUserLocation={true}
     showsMyLocationButton={true}


      
     
  initialRegion={{
    latitude: PickupLatittude,
    longitude: PickupLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
           
             
  
  style={tw`h-1/2`}
  customMapStyle={mapStyle}
  
  zoomControlEnabled={false} >

<Marker coordinate={{latitude:PickupLatittude,longitude:PickupLongitude}}  image={require("../images/greenpin3.png")}  >

</Marker>



<Marker coordinate={{latitude:DropLatitude,longitude:DropLongitude}}   image={require("../images/pinkpin3.png")}    >

</Marker>



<MapViewDirections origin={{latitude:PickupLatittude,longitude:PickupLongitude}} destination={{latitude:DropLatitude,longitude:DropLongitude}} strokeColor="black" strokeWidth={3} apikey={GOOGLE_MAPS_API_KEY} onReady={result=>{ mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{right:30,bottom:100,left:30,top:100}}); setDistance(result.distance) }} >

</MapViewDirections>


  </MapView>

  <BottomSheet 
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={{borderColor:"black"}}
      >
       
       <ScrollView>

       <Pressable onPress={()=>{ setCab(false); setbike(true); }}>
       <View style={{height:50,borderWidth:2,borderBottomColor:"black",borderRadius:40,backgroundColor:"yellow"}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            
            <Image style={{height:50,width:50}} source={require('../images/vectorbike.png')}></Image>
             <View style={{width:30}}></View>
             <Text style={{fontSize:30,color:"black"}}>BIKE</Text>
             <View style={{width:30}}></View>
             <Text style={{fontSize:30,color:"black"}}>₹ {Math.ceil(20+(7*distance))}</Text>

            </View>                      
           </View>
              <View style={{height:10}}></View>
           
              </Pressable>


              <Pressable onPress={()=>{setCab(true); setbike(false)}}>
           
           <View style={{height:50,borderWidth:2,borderBottomColor:"black",borderRadius:40,backgroundColor:"yellow"}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            
            <Image style={{height:80,width:80}} source={require('../images/vectorcar.png')}></Image>
             <View style={{width:30}}></View>
             <Text style={{fontSize:30,color:"black"}}>CAB</Text>
             <View style={{width:30}}></View>
             <Text style={{fontSize:30,color:"black"}}>₹ {Math.ceil(20+(11*distance))}</Text>

            </View>                      
           </View>

           </Pressable>

           <View style={{height:40,borderBottomColor:"black",borderBottomWidth:1,shadowColor:"grey",shadowOffset:10}}></View>

            <View style={{height:50}}></View>

           { bookbike &&  <TouchableOpacity style={{margin:10,backgroundColor:"black",borderRadius:60,alignItems:'center'}}>
                    <Button title='Book Bike'  color={"black"}></Button>
             </TouchableOpacity> }

          { bookcab &&   <TouchableOpacity disabled={bookCabBtnStatus} style={{margin:10,borderRadius:60,backgroundColor:"black",alignItems:'center'}}>
                    <Button  disabled={bookCabBtnStatus}  title='Book Cab' onPress={async()=>{setbookCabBtnStatus(true); setTimeout(async() => {
                  await createRideRequest(mobileNumber,PickupLatittude,PickupLongitude,distance,20+(11*distance));    
                    }, 10000);   var actioncount=0;var interval = setInterval(async()=>{actioncount++;if(actioncount>=3){setTimeout(() => {
                      
                      setbookCabBtnStatus(false);          }, 5000);  clearInterval(interval);}var status=await getRideStatusDetails(mobileNumber); if(status==undefined){actioncount=0;}; console.log(status)},5000)  }}  color={"black"}></Button>
             </TouchableOpacity>}

           </ScrollView>

      </BottomSheet>

      </View>
      
  </>
    
  )
}

export default RideOptionsScreen

const styles = StyleSheet.create({})