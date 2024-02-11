import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Double, Float } from 'react-native/Libraries/Types/CodegenTypes';


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

export const getRideStatus = createAsyncThunk("getRideStatus",async(mobileNumber:string)=>{

  console.log("checking if ride accepted ?");
  const firestoreData = await firestore().collection('RideQ').doc('Queue').get();
    
  if(firestoreData.data()==undefined)
  {
      return null;
  }
  else
  {
      console.log("got rideStatus : "+firestoreData.data()[mobileNumber])
      return firestoreData.data()[mobileNumber];
  }
  

});

export const endRideStatus = createAsyncThunk("endRideStatus",async(mobileNumber:string)=>{

  console.log("checking if ride accepted ?");
  const nested_Update = mobileNumber+".ongoingride";
  const firestoreData = await firestore().collection('RideQ').doc('Queue').update({[nested_Update]:false});
    

  

});




export const updateProfile = createAsyncThunk("updateProfile",async(profile:object)=>{

    
    const firestoreData = await firestore().collection('Passengers').doc("+91 "+profile["profile"]["mobile"]).update(profile);
  
     return profile["profile"];
    
  
});

export async function getRideStatusDetails(mobileNumber:string)
{
  const firestoreData = await firestore().collection('RideQ').doc('Queue').get();
    
  if(firestoreData.data()==undefined)
  {
      return null;
  }
  else
  {
      console.log(firestoreData.data()[mobileNumber])
      return firestoreData.data()[mobileNumber];
  }
  
  console.log(firestoreData.data());

  return null;
}


export const setProfile = createAsyncThunk("setProfile",async(profile:object)=>{

    console.log("setting Profile for "+profile["profile"]["mobile"]);
    const firestoreData = await firestore().collection('Passengers').doc("+91 "+profile["profile"]["mobile"]).set(profile);

  
     return profile["profile"];
    
  
});




export async function createRideRequest(mobileNumber:string,pickuplat:Double,pickuplng:Double,dist:Double,fare:Double,droplat:Double,droplng:Double){

        var profile = await getProfilePassengerFunction(mobileNumber);
        var strmobile:string = profile["mobile"];
        var rideRequestData = {[strmobile]:{accepted:false,approvedRiderMobile:"",ongoingride:false,passengerMobile:mobileNumber,pickupCoords:new firebase.firestore.GeoPoint(pickuplat, pickuplng),requestActive:true,farePrice:fare,distance:dist,riderCoords:new firebase.firestore.GeoPoint(17.4239,78.4738),otp:Math.floor(Math.random() * 9000 + 1000),dropCoords:new firebase.firestore.GeoPoint(droplat, droplng)}}
         
        const firestoreData = await firestore().collection('RideQ').doc('Queue').set(rideRequestData,{merge:true})

        return
}



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



