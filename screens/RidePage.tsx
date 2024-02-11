import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import MapView, { Marker, MarkerAnimated } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import BottomSheet from '@gorhom/bottom-sheet'
import { mapStyle } from '../compenents/MapStyle'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { Directions } from 'react-native-gesture-handler'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_API_KEY} from '@env'
import { endRideStatus, getRideStatus } from '../firebase/firestoreActions'



const RidePage = () => {

   const dispatcher = useDispatch();
   const navigator = useNavigation(); 

  const bottomSheetRef = useRef<BottomSheet>(null);

   // variables
   const snapPoints = useMemo(() => ['25%', '50%',"90%"], []);

   // callbacks
   const handleSheetChanges = useCallback((index: number) => {
     console.log('handleSheetChanges', index);
   }, []);
 
    
    const {mobileNumber}    = useSelector((state:RootState)=>state.AuthAccess)
    const {otp,riderLat,riderLng,passengerMobile,accepted,approvedRiderMobile,requestActive,distance,fareprice,ongoingride,pickuplat,pickuplng} = useSelector((state:RootState)=>state.CurrentRideStatus)
    const {MapLatitudeDelta,MapLongittudeDelta} = useSelector((state:RootState)=>state.Map)

     useEffect(()=>{
      var interval = setInterval(async()=>{ dispatcher(getRideStatus(mobileNumber));if(ongoingride==false){clearInterval(interval);}},15000)
      
     },[]);


  return (
    <>
    <MapView customMapStyle={mapStyle} style={tw`h-3/4`} initialRegion={{latitude:pickuplat,longitude:pickuplng,latitudeDelta:MapLatitudeDelta,longitudeDelta:MapLongittudeDelta}}>
       <Marker coordinate={{latitude:pickuplat,longitude:pickuplng}}  image={require("../images/greenpin3.png")}  ></Marker>
       <Marker coordinate={{latitude:riderLat,longitude:riderLng}}  image={require("../images/RedCar.png")}  ></Marker>
       <MapViewDirections origin={{latitude:riderLat,longitude:riderLng}} destination={{latitude:pickuplat,longitude:pickuplng}} apikey={GOOGLE_MAPS_API_KEY}></MapViewDirections>
    </MapView>
    <BottomSheet style={{flex:1}} snapPoints={snapPoints} index={0} ref={bottomSheetRef} >
      <>
      <View>
      <Pressable onPress={()=>{navigator.navigate('menu')}}>
           <Image  source={require("../images/hamburgerIcon.png")} style={{marginLeft:10,marginBottom:5}}></Image>
           </Pressable>
               
           <View style={{height:50,borderWidth:2,borderBottomColor:"black",borderRadius:40,backgroundColor:"green",marginLeft:20,marginRight:20}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            
           
             <Text style={{fontSize:30,color:"white"}}>Your OTP : {otp}</Text>
             
            </View>                      
           </View>
                   
           <View style={{height:100,width:100,justifyContent:'center',alignItems:'center',alignSelf:'center'}}></View>
          
           <Button title='Cancle your Ride' onPress={()=>{dispatcher(endRideStatus(mobileNumber));}}></Button>
              
              <View style={{height:100,width:200,borderRadius:1}}></View>
                         <Text>Rider Mobile:9603690535</Text>
           </View>
      </>
    </BottomSheet>
    </>
  )
}

export default RidePage

const styles = StyleSheet.create({})