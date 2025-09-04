import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/valueSlice';
import roleReducer from "./slice/roleSlice";

export const store = configureStore({
  reducer: {
    value : counterReducer,
    roleValue : roleReducer
  },
})

export type RootState = ReturnType <typeof store.getState>;