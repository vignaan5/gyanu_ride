import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './LoginScreen';
import AuthenticateOtp from './AuthenticateOtp';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import MyBottomSheet from '../compenents/MyBottomActionSheet ';


const Stack = createNativeStackNavigator();


const HomeScreen = () => {

    const {mobileNumber,otpAuthStatus}  = useSelector((state:RootState)=>state.AuthAccess)


  return (
    <>
    {!otpAuthStatus &&
    <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='enterOtp' component={AuthenticateOtp} options={{headerShown:true,title:"",headerTransparent:true}}></Stack.Screen>

    </Stack.Navigator>  }


    {otpAuthStatus && <MyBottomSheet></MyBottomSheet>}


    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({});