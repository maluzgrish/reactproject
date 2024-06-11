// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import medicineReducer from './medicineSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicines: medicineReducer,
  },
});
