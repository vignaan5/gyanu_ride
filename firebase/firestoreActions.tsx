import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getProfile = createAsyncThunk("getProfile",async(mobileNumber:string)=>{

    const firestoreData = await firestore().collection('Passengers').doc("+91 "+mobileNumber).get();

    if(firestoreData.data()==undefined)
    {
        return null;
    }
   else
   {
     return firestoreData.data()["profile"];
   }
    
  
});


export const updateProfile = createAsyncThunk("updateProfile",async(profile:object)=>{

    
    const firestoreData = await firestore().collection('Passengers').doc("+91 "+profile["profile"]["mobile"]).update(profile);
  
     return profile["profile"];
    
  
});

export const setProfile = createAsyncThunk("setProfile",async(profile:object)=>{

    console.log("setting Profile for "+profile["profile"]["mobile"]);
    const firestoreData = await firestore().collection('Passengers').doc("+91 "+profile["profile"]["mobile"]).set(profile);

  
     return profile["profile"];
    
  
});





export async function getProfilePassengerFunction(mobileNumber:string)
{
    console.log("checking data for "+mobileNumber);

     

    const firestoreData = await firestore().collection('Passengers').doc("+91 "+mobileNumber).get();
    
    if(firestoreData.data()==undefined)
    {
        return null;
    }
    else
    {
        return firestoreData.data()["profile"];
    }
    
    console.log(firestoreData.data());

    return null;
    //return firestoreData.data()["profile"];
}




export async function storeMobileNumber  (value:string)  {
    try {
     
        
      await AsyncStorage.setItem('MobileNumber',value);
    } catch (e) {
      // saving error
    }
  };

export  async function storeOtpStatus  (value:string)  {
    try {
     
        
      await AsyncStorage.setItem('OtpAccepted',value);
    } catch (e) {
      // saving error
    }
  };

export  async function getMobileNumber ()  {
    try {
      const value = await AsyncStorage.getItem('MobileNumber');
      if (value !== null) {
        
        return value;
      }
      
    } catch (e) {
      // error reading value
      console.log("Error reading data"+e);
      return null;
    }
  };

export  async function getOtpStatus ()  {
    try {
      const value = await AsyncStorage.getItem('OtpAccepted');
      if (value !== null) {
        
        return value;
      }
      
    } catch (e) {
      // error reading value
      console.log("Error reading data"+e);
      return null;
    }
  };



