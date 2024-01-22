import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import AuthReducer, { AuthReducerSlice } from '../redux/reducers/AuthReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getMobileNumber, getOtpStatus, getProfile, getProfilePassengerFunction, setProfile, storeMobileNumber, storeOtpStatus, updateProfile } from '../firebase/firestoreActions';

const AuthenticateOtp = () => {

   const [status,setStatus] = useState("");
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
        
          await confirm.confirm(OTP).then(async(result)=>{
             if(await getProfilePassengerFunction(mobileNumber)==null)
             {
                setStatus("no profile found");
                try
                {
               dispatcher(setProfile({profile:{emergencyContact:"",gender:"",mobile:mobileNumber,name:""}}));
                }
                catch(err)
                {
                      setStatus("error in updating profile");
                }
             }
             else
             {
              dispatcher(getProfile(mobileNumber));
             } 
            

             await storeMobileNumber(mobileNumber);

             await storeOtpStatus("yes");

             dispatcher(AuthReducerSlice.actions.acceptOtp());

             dispatcher(AuthReducerSlice.actions.updatephno(mobileNumber));

             dispatcher(getProfilePassengerFunction(mobileNumber));

             navigator.goBack();
            }).catch((error)=>{console.log(error);});
    
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
       <Text>{status}</Text>
         
    </SafeAreaView>
  )
}

export default AuthenticateOtp

const styles = StyleSheet.create({})