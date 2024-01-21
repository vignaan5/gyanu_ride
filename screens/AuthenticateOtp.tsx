import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import AuthReducer, { AuthReducerSlice } from '../redux/reducers/AuthReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AuthenticateOtp = () => {

    const {mobileNumber,otpAuthStatus}  = useSelector((state:RootState)=>state.AuthAccess);
    const [OTP,setOtp] = useState("");

       
  const [confirm, setConfirm] = useState(null);
  
  const navigator = useNavigation();
  
  const dispatcher = useDispatch();


    async function signInWithPhoneNumber(phoneNumber:string) {
        console.log("opening chrome for phno"+phoneNumber);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    
      }

      async function confirmCode() {
        console.log("otp entered is "+OTP);
        
          await confirm.confirm(OTP).then(async(result)=>{ dispatcher(AuthReducerSlice.actions.acceptOtp());navigator.goBack();}).catch((error)=>{console.log(error);});
    
      }

      useEffect(()=>
      {
        console.log(mobileNumber);
        signInWithPhoneNumber("+91 "+mobileNumber);
      },[]);



  return (
    <SafeAreaView>
        <View style={{height:5}}></View>
        <Image source={require("../images/logos/vignaan.png")} style={{height:150,width:200,alignSelf:'auto'}} ></Image>
         <Text>Your otp has been sent to {mobileNumber}</Text>
     {confirm &&   <OtpInput numberOfDigits={6} onTextChange={(otp)=>{setOtp(otp);}}></OtpInput> }
         <View style={{height:5}}></View>
              
         <TouchableOpacity onPress={()=>{}} style={{alignItems:'center',borderRadius:80,borderColor:"black",backgroundColor:"black",marginLeft:99,marginRight:99}}>
                
                { OTP.length==6     && <Button  title='Continue' color="black"  onPress={async()=>{await confirmCode();}}  ></Button> }
                            
                    </TouchableOpacity>

         
    </SafeAreaView>
  )
}

export default AuthenticateOtp

const styles = StyleSheet.create({})