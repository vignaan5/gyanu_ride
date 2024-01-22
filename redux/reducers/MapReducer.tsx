import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";


export interface MapState
{
    MapLatitude:number,
    MapLongitude:number,
    MapLatitudeDelta:number,
    MapLongittudeDelta:number,
    PickupLatittude:number,
    PickupLongitude:number,
    DropLatitude:number,
    DropLongitude:number,
    PickupMarkerVisible:boolean,
    DropMarkerVisible:boolean,
canSelectPickUpMarker:boolean,
canSelectDropMarker:boolean,

}


const initialState:MapState=
{
    MapLatitude:17.4065,
    MapLongitude:78.4772,
    MapLatitudeDelta:0.0922,
    MapLongittudeDelta:0.0421,
    PickupLatittude:17.4065,
    PickupLongitude:78.4772,
    DropLatitude:17.4237,
    DropLongitude: 78.4584,
    PickupMarkerVisible:true,
    DropMarkerVisible:false,
    canSelectPickUpMarker:false,
    canSelectDropMarker:false,

}



export const MapSlice = createSlice(
    {
        name:"Map",
        initialState,
        reducers:{
            showPmarker:(state)=>{state.PickupMarkerVisible=true;},
            hidePmarker:(state)=>{state.PickupMarkerVisible=false;},
            showDmarker:(state)=>{state.DropMarkerVisible=true;},
            hideDmarker:(state)=>{state.DropMarkerVisible=false;},
            AssignPickupMarkerCoords:(state,action:PayloadAction<number[]>)=>{state.PickupLatittude=action.payload[0];state.PickupLongitude=action.payload[1];},
            AssignDropMarkerCoords:(state,action:PayloadAction<number[]>)=>{state.DropLatitude=action.payload[0];state.DropLongitude=action.payload[1];},
            selectDropMarker:(state)=>{state.canSelectDropMarker=true;},
            DeselectDropMarker:(state)=>{state.canSelectDropMarker=false},
            selectPickUpMarker:(state)=>{state.canSelectPickUpMarker=true;},
            DeselectPickUpMarker:(state)=>{state.canSelectPickUpMarker=false},

         },

    }
);

export default MapSlice.reducer;