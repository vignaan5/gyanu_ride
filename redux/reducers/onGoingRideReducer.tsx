import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { endRideStatus, getRideStatus } from "../../firebase/firestoreActions";
import { act } from "react-test-renderer";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface onGoingRideState
{
    accepted:boolean,
    approvedRiderMobile:string,
    distance:number,
    fareprice:number,
    ongoingride:boolean,
    passengerMobile:string,
    pickuplat:number,
    pickuplng:number,
    requestActive:boolean
    riderLat:number,
    riderLng:number,
    otp:number,
    droplat:number,
    droplng:number
    
}


const initialState:onGoingRideState={
    accepted:false,
    approvedRiderMobile:"",
    distance:0.0,
    fareprice:0.0,
    ongoingride:false,
    passengerMobile:"",
    pickuplat:0.0,
    pickuplng:0.0,
    requestActive:false,
    riderLat:17.4239,
    riderLng:78.4738,
    otp:9999,
    droplat:0.0,
    droplng:0.0
}


export const RideStatusSlice = createSlice(
    {
    name:"CurrentRideStatus",
    initialState,
    reducers:
    {
        
       
    },
    extraReducers:builder=>
    {
        builder.addCase(getRideStatus.fulfilled,(state,action)=>{
          state.accepted=action.payload["accepted"];
          state.approvedRiderMobile=action.payload["approvedRiderMobile"];
          state.distance=action.payload["distance"];
          state.fareprice=action.payload["farePrice"];
          state.ongoingride=action.payload["ongoingride"];
          state.passengerMobile=action.payload["passengerMobile"];
          state.pickuplat=((action.payload["pickupCoords"])as FirebaseFirestoreTypes.GeoPoint).latitude;
          state.pickuplng=((action.payload["pickupCoords"])as FirebaseFirestoreTypes.GeoPoint).longitude;
          state.riderLat=((action.payload["riderCoords"])as FirebaseFirestoreTypes.GeoPoint).latitude;
          state.riderLng=((action.payload["riderCoords"])as FirebaseFirestoreTypes.GeoPoint).longitude;
          state.requestActive=action.payload["requestActive"];
          state.otp=action.payload["otp"];
          state.droplat=((action.payload["dropCoords"])as FirebaseFirestoreTypes.GeoPoint).latitude;
          state.droplng=((action.payload["dropCoords"])as FirebaseFirestoreTypes.GeoPoint).longitude;      
        });
        builder.addCase(endRideStatus.fulfilled,(state,action)=>{
           
            state.ongoingride=false;
               
          });
    }

    }
);

export default RideStatusSlice.reducer; 