import { Button, StyleSheet, Text, TextInput, Touchable, View } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-ico-flags';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AuthReducerSlice } from '../redux/reducers/AuthReducer';
import { useNavigation } from '@react-navigation/native';
import { getMobileNumber, getOtpStatus } from '../firebase/firestoreActions';

const LoginScreen = () => {
 
   const {mobileNumber,otpAuthStatus}  = useSelector((state:RootState)=>state.AuthAccess);

   const navigator = useNavigation();

   const Dispatcher = useDispatch();


   const check_auth_and_send_otp_if_not_signed_in =async()=>
   {

   const otpstatus=   await getOtpStatus();
   const mobilenumber_status =await getMobileNumber();

   if(otpstatus!=null && otpstatus=="yes" && mobilenumber_status!=null && mobilenumber_status!="")
   {
           Dispatcher(AuthReducerSlice.actions.updatephno(mobilenumber_status));
           Dispatcher(AuthReducerSlice.actions.acceptOtp());
   }
   
   }

    useEffect(()=>{

       check_auth_and_send_otp_if_not_signed_in();


    },[]);
 
 
    return (
    
    <View>
         <Image source={require("../images/logos/vignaan.png")} style={{height:150,width:200,alignSelf:'auto'}} ></Image>
      
      <Text style={{color:"black",fontSize:20}}>What is your Mobile Number ?</Text>
      <View style={{height:40}}></View>
    <View style={{flex:1,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>

    <View style={{height:20,backgroundColor:"#faf3dd"}}>
     <Icon name="india" height="20" width="30" />
     </View>
     <View style={{height:20,width:30,backgroundColor:"#faf3dd"}}>
      <Text style={{color:"black"}}>+91</Text>
     </View>
     <View style={{height:20,width:12}}/>
     <TextInput onChangeText={(mobile_number)=>{Dispatcher(AuthReducerSlice.actions.updatephno(mobile_number));}} inputMode='tel' maxLength={10} placeholder='Your Number Here'   style={{height:40,borderColor:"grey",borderWidth:0.5,borderRadius:50,textAlign:'center'}} ></TextInput>
    </View>
         
    <View style={{height:60}}></View>


            <TouchableOpacity onPress={()=>{navigator.navigate('enterOtp');}} style={{alignItems:'center',borderRadius:80,borderColor:"black",backgroundColor:"black",marginLeft:99,marginRight:99}}>
                
        { mobileNumber.length==10     && <Button  title='Continue' color="black"  onPress={()=>{navigator.navigate('enterOtp');}}  ></Button> }
                    
            </TouchableOpacity>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})