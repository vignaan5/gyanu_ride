import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProfile, setProfile, updateProfile } from "../../firebase/firestoreActions";

export interface AuthState
{
    name:string,
    mobileNumber:string,
    gender:string,
    EmergencyContact:string
    
}


const initialState:AuthState={
    name:"",
    mobileNumber:"",
    gender:"",
    EmergencyContact:""
}


export const profileSlice = createSlice(
    {
    name:"profile",
    initialState,
    reducers:
    {
      
    },
    extraReducers:builder=>
    {
        builder.addCase(getProfile.fulfilled,(state,action)=>{
          //state.value=action.payload;
          state.name=action.payload["name"];
          state.gender=action.payload["gender"];
          state.EmergencyContact=action.payload["emergencyContact"];
          state.mobileNumber=action.payload["mobile"];
         
        });
  
        builder.addCase(updateProfile.fulfilled,(state,action)=>{
            state.name=action.payload["name"];
            state.gender=action.payload["gender"];
            state.EmergencyContact=action.payload["emergencyContact"];
            state.mobileNumber=action.payload["mobile"];
        });

        builder.addCase(setProfile.fulfilled,(state,action)=>{
            state.name=action.payload["name"];
            state.gender=action.payload["gender"];
            state.EmergencyContact=action.payload["emergencyContact"];
            state.mobileNumber=action.payload["mobile"];
        });
    }
}
);

export default profileSlice.reducer; 