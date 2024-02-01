import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import MyBottomSheetReducer, { MyBottomSheetReducerSlice } from '../redux/reducers/MyBottomSheetReducer';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_API_KEY} from '@env'
import { useNavigation } from '@react-navigation/native';
import SearchTravelPoints from './searchTravelPoints';
import { MapSlice } from '../redux/reducers/MapReducer';
import { mapStyle } from './MapStyle';
import tw from 'tailwind-react-native-classnames'
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import { Image } from 'react-native';



const MyBottomSheet = () => {

  const navigator = useNavigation();
  const {mobileNumber} =useSelector((state:RootState)=>state.AuthAccess);

  const {My_Bottom_Sheet_Handle_Index,My_Bottom_Sheet_Sanp_Points_Array,My_Bottom_Sheet_Background_Color} =useSelector((state:RootState)=>state.MyBottomSheet);

  const Dispatcher = useDispatch();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const mapRef = useRef<MapView>();
   
  const PickupLoc_SearchBarRef = useRef();

  const DropLoc_SearchBarRef = useRef();
  // variables
  const snapPoints = useMemo(() => My_Bottom_Sheet_Sanp_Points_Array, []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    Dispatcher(MyBottomSheetReducerSlice.actions.updateHandleSheetIndex(index));
    //console.log('handleSheetChanges', index);
    
  }, []);


   const{DropLatitude,DropLongitude,DropMarkerVisible,MapLatitude,MapLatitudeDelta,MapLongittudeDelta,MapLongitude,PickupLatittude,PickupLongitude,PickupMarkerVisible,canSelectPickUpMarker,canSelectDropMarker} =useSelector((state:RootState)=>state.Map);
  
    
   useEffect(()=>
   {
     Geocoder.init(GOOGLE_MAPS_API_KEY);
           

           
   },[]);


  // renders
  return (
      
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
           
              onRegionChangeComplete={(r)=>
                {
                  if(PickupMarkerVisible && !DropMarkerVisible && canSelectPickUpMarker  )
                  {
                      
                       
                     
                  }
                  else if(!PickupMarkerVisible && DropMarkerVisible && canSelectDropMarker)
                  {
                   
                  }

                }}



    onRegionChange={(r)=>
      {
            if(PickupMarkerVisible && !DropMarkerVisible && canSelectPickUpMarker )
            {

              Dispatcher(MapSlice.actions.AssignPickupMarkerCoords([r.latitude,r.longitude]));
                 //setplat(r.latitude);
                 //setplng(r.longitude);
                 
              
            }
            else if(!PickupMarkerVisible && DropMarkerVisible && canSelectDropMarker)
            {
              Dispatcher(MapSlice.actions.AssignDropMarkerCoords([r.latitude,r.longitude]));

              //setdlat(r.latitude);
              //setdlng(r.longitude);
            }

      }}
  
  style={tw`h-3/4`}
  customMapStyle={mapStyle}
  
  zoomControlEnabled={true} >    
        { PickupMarkerVisible &&
    <Marker coordinate={{latitude:PickupLatittude,longitude:PickupLongitude}}  image={require("../images/greenpin3.png")}  >

    </Marker>
}

{   DropMarkerVisible &&
    <Marker coordinate={{latitude:DropLatitude,longitude:DropLongitude}}   image={require("../images/pinkpin3.png")}    >

</Marker>
}
    
{  PickupMarkerVisible && DropMarkerVisible &&
    <MapViewDirections origin={{latitude:PickupLatittude,longitude:PickupLongitude}} destination={{latitude:DropLatitude,longitude:DropLongitude}} strokeColor="black" strokeWidth={3} apikey={GOOGLE_MAPS_API_KEY} onReady={result=>{mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{right:30,bottom:100,left:30,top:100}})}} >

    </MapViewDirections>
} 
    
    </MapView>
       


    <View style={{height:100}}></View>
    <View style={{alignContent:"flex-end",alignItems:"center"}}>
      
      
      {PickupMarkerVisible && !DropMarkerVisible && <Button  title="Confirm pickup location"  onPress={()=>{Dispatcher(MapSlice.actions.showDmarker()); bottomSheetRef.current?.snapToIndex(0);Dispatcher(MapSlice.actions.DeselectPickUpMarker());
      
      Geocoder.from(PickupLatittude,PickupLongitude).then((data)=>{
        let fetchDetails=data.results[0].formatted_address;
          PickupLoc_SearchBarRef.current?.setAddressText(fetchDetails);
        console.log(fetchDetails);

       });
      
      }}     ></Button> }
      
      
      
      
      {DropMarkerVisible && !PickupMarkerVisible && <Button title="Confirm drop location" onPress={()=>{Dispatcher(MapSlice.actions.showPmarker()); bottomSheetRef.current?.snapToIndex(0); Dispatcher(MapSlice.actions.DeselectDropMarker());
      
      Geocoder.from(DropLatitude,DropLongitude).then((data)=>{
        let fetchDetails=data.results[0].formatted_address;
        DropLoc_SearchBarRef.current?.setAddressText(fetchDetails);
        console.log(fetchDetails);

       });
      
      }}></Button> }
    </View>
    



      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={My_Bottom_Sheet_Sanp_Points_Array}
        onChange={handleSheetChanges}
      >
        <View style={{}}>
          <View style={{height:10}}></View>
           
           <Pressable onPress={()=>{navigator.navigate('menu')}}>
           <Image  source={require("../images/hamburgerIcon.png")} style={{marginLeft:10,marginBottom:5}}></Image>
           </Pressable>
           
          <GooglePlacesAutocomplete
                   placeholder='🟢 Search Your Location'
                    ref={PickupLoc_SearchBarRef}
                   listHoverColor="grey"

                   styles={{container:{flex:0,},textInput:{fontSize:18,backgroundColor:"#D3D3D3"},}}

                   query={{key: GOOGLE_MAPS_API_KEY,
                            language:'en'      }}

                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                             
                            debounce={400}
                      
                   
                  

                  onPress={(data,details)=>
                  {
                    
                    
                          
                     //setplat(details?.geometry.location.lat);
                    // setplng(details?.geometry.location.lng);   
                     

                     Dispatcher(MapSlice.actions.AssignPickupMarkerCoords([details?.geometry.location.lat,details?.geometry.location.lng]));

                     console.log(details?.geometry.location.lat+" "+details?.geometry.location.lng);

                     bottomSheetRef.current?.snapToIndex(0); 
                      
                  }}

                                      
            >


              </GooglePlacesAutocomplete>

              <TouchableOpacity style={{alignItems:"center",borderRadius:60,backgroundColor:"black"}} >
                 
                 <Button  color={"black"} title="Select Pickup Location on Map"  onPress={()=>{Dispatcher(MapSlice.actions.hideDmarker()); Dispatcher(MapSlice.actions.showPmarker());; mapRef.current?.animateToRegion(
                   {
                     latitude:PickupLatittude,
                     longitude:PickupLongitude,
                     latitudeDelta: 0.065,
                     longitudeDelta: 0.01
                   },
                   500
                 );  bottomSheetRef.current?.close();  Dispatcher(MapSlice.actions.selectPickUpMarker());   }}>
 
                 </Button>
               </TouchableOpacity>

              <GooglePlacesAutocomplete
                   placeholder='🔴 Search Destination'

                   ref={DropLoc_SearchBarRef}

                   

                   styles={{container:{flex:0},textInput:{fontSize:18,backgroundColor:"#D3D3D3"},}}

                   query={{key: GOOGLE_MAPS_API_KEY,
                            language:'en'      }}

                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'

                            debounce={400}
                      
                  

                            onPress={(data,details)=>
                              {
                                
                                 
                              
                                Dispatcher(MapSlice.actions.AssignDropMarkerCoords([details?.geometry.location.lat,details?.geometry.location.lng]));

                                 //setdlat(details?.geometry.location.lat);
                                // setdlng(details?.geometry.location.lng);    
                                 bottomSheetRef.current?.snapToIndex(0);

                                

                                  
                              }}



                enablePoweredByContainer={false}

                    
              >


              </GooglePlacesAutocomplete>

              <TouchableOpacity style={{alignItems:"center",backgroundColor:"black",borderRadius:60}}>
              <Button  color={"black"} title="Select Drop Location on Map" onPress={()=>{ Dispatcher(MapSlice.actions.showDmarker());  Dispatcher(MapSlice.actions.hidePmarker()); mapRef.current?.animateToRegion(
                  {
                    latitude:DropLatitude,
                    longitude:DropLongitude,
                    latitudeDelta: 0.065,
                    longitudeDelta: 0.01
                  },
                  500
                );  bottomSheetRef.current?.close();  Dispatcher(MapSlice.actions.showDmarker()); Dispatcher(MapSlice.actions.selectDropMarker());   }} >

                </Button>
              </TouchableOpacity>
              
           
         
        
          
        </View>
      </BottomSheet>
      </View>
    
    
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyBottomSheet;