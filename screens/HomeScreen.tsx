import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './LoginScreen';
import AuthenticateOtp from './AuthenticateOtp';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import MyBottomSheet from '../compenents/MyBottomSheet';
import Map from '../compenents/Map';
import MapScreen from './MapScreen';
import MenuScreen from './MenuScreen';
import ProfileScreen from './ProfileScreen';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import ConfirmRideScreen from './ConfirmRideScreen';
import RideOptionsScreen from './RideOptionsScreen';
import RidePage from './RidePage';
import { getRideStatus } from '../firebase/firestoreActions';


const Stack = createNativeStackNavigator();






const HomeScreen = () => {

const dispatcher = useDispatch();



    const {mobileNumber,otpAuthStatus}  = useSelector((state:RootState)=>state.AuthAccess)
    const {passengerMobile,accepted,approvedRiderMobile,requestActive,distance,fareprice,ongoingride,pickuplat,pickuplng} = useSelector((state:RootState)=>state.CurrentRideStatus)
 
   
     useEffect(()=>{

      dispatcher(getRideStatus(mobileNumber))

 },[]);


  return (
    <>
    {!otpAuthStatus &&
    <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='enterOtp' component={AuthenticateOtp} options={{headerShown:true,title:"",headerTransparent:true}}></Stack.Screen>

    </Stack.Navigator>  }


    {otpAuthStatus &&   !ongoingride &&

       <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={MyBottomSheet} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='menu' component={MenuScreen}></Stack.Screen>
        <Stack.Screen name='profile' component={ProfileScreen}></Stack.Screen>
        <Stack.Screen name='rideoptions' component={RideOptionsScreen} options={{headerTransparent:true,headerTitle:""}}></Stack.Screen>
        <Stack.Screen name='confirmRide' component={ConfirmRideScreen}></Stack.Screen>
        <Stack.Screen name='ongoingride' component={RidePage}></Stack.Screen>
       </Stack.Navigator>
   
    }

    {
      ongoingride &&  <Stack.Navigator initialRouteName='currentRideScreen'>

                         <Stack.Screen name='currentRideScreen' component={RidePage} options={{headerShown:false}}></Stack.Screen> 
                         <Stack.Screen name='menu' component={MenuScreen}></Stack.Screen>
             
      </Stack.Navigator>  
    }



    </>
  )
}

export default HomeScreen



const styles = StyleSheet.create({});


export const Map_with_BottomSheet = ()=>{
  return(
    <View  style={{flex:1}}>
      
      
    <MyBottomSheet></MyBottomSheet>
    </View>
  )
}