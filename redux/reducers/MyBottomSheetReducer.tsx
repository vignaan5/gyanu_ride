import BottomSheetBackground from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackground/BottomSheetBackground";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";


export interface MyBottomSheetState
{
    My_Bottom_Sheet_Handle_Index:number,
    My_Bottom_Sheet_Sanp_Points_Array:string[],
    My_Bottom_Sheet_Background_Color:string,

}


const initialState:MyBottomSheetState={
    My_Bottom_Sheet_Handle_Index:0,
    My_Bottom_Sheet_Sanp_Points_Array:["25%","50%","90%"],
    My_Bottom_Sheet_Background_Color:'white',

}



export const MyBottomSheetReducerSlice = createSlice(
    {
        name:"MyBottomSheet",
        initialState,
        reducers:{
            closeSheet:(state)=>{
                state.My_Bottom_Sheet_Handle_Index=-1;
            },
            openSheet:(state)=>{
                state.My_Bottom_Sheet_Handle_Index=0;
            },
            updateHandleSheetIndex:(state,action: PayloadAction<number>)=>
            {
                state.My_Bottom_Sheet_Handle_Index=action.payload;
                console.log(state.My_Bottom_Sheet_Handle_Index);
            },
            updateHandleSheetBackgroundColor:(state)=>
            {
                   if(state.My_Bottom_Sheet_Handle_Index==-1)
                   {
                         state.My_Bottom_Sheet_Background_Color="white";
                   }
                   else
                   {
                    state.My_Bottom_Sheet_Background_Color="white";
                   }
            }
            

        }

    }
);

export default MyBottomSheetReducerSlice.reducer;