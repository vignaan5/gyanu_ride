import { configureStore } from "@reduxjs/toolkit";
import MyBottomSheetReducer from "./reducers/MyBottomSheetReducer";
import AuthReducer from "./reducers/AuthReducer";
import MapReducer from "./reducers/MapReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import onGoingRideReducer from "./reducers/onGoingRideReducer";



export const store=configureStore
(
  {
    reducer:{MyBottomSheet:MyBottomSheetReducer,AuthAccess:AuthReducer,Map:MapReducer,profile:ProfileReducer,CurrentRideStatus:onGoingRideReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
  }
);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch