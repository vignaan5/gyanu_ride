import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_API_KEY} from '@env'

const SearchTravelPoints = () => {
  return (
    <View>
       <GooglePlacesAutocomplete
                   placeholder='🟢 Search Your Location'
                    //ref={pl_ref}
                   listHoverColor="grey"

                   styles={{container:{flex:1,},textInput:{fontSize:18,backgroundColor:"#D3D3D3"},}}

                   query={{key: GOOGLE_MAPS_API_KEY,
                            language:'en'      }}

                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                             
                            debounce={400}
                      
                   
                  

                  onPress={(data,details)=>
                  {
                    
                    
                          
                     //setplat(details?.geometry.location.lat);
                    // setplng(details?.geometry.location.lng);   
                     //sheetRef.current?.snapToIndex(0); 

                     console.log(details?.geometry.location.lat+" "+details?.geometry.location.lng);
                      
                  }}

                                      
            >


              </GooglePlacesAutocomplete>
    </View>
  )
}

export default SearchTravelPoints

 const styles = StyleSheet.create({})