import { configureStore } from "@reduxjs/toolkit";
import MyBottomSheetReducer from "./reducers/MyBottomSheetReducer";
import AuthReducer from "./reducers/AuthReducer";



export const store=configureStore
(
  {
    reducer:{MyBottomSheet:MyBottomSheetReducer,AuthAccess:AuthReducer}
  }
);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch