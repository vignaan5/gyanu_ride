import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState
{
    otpAuthStatus:boolean,
    mobileNumber:string,
}


const initialState:AuthState={
    otpAuthStatus:true,
    mobileNumber:"9849564329",
}


export const AuthReducerSlice = createSlice(
    {
    name:"AuthAccess",
    initialState,
    reducers:
    {
        updatephno:(state,action:PayloadAction<string>)=>{ state.mobileNumber=action.payload; } ,
        acceptOtp:(state)=>{state.otpAuthStatus=true;},
        rejectOtp:(state)=>{state.otpAuthStatus=false},
    }

    }
);

export default AuthReducerSlice.reducer; 