import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";


import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Combine multiple reducers
const rootReducer = combineReducers({
    auth: authReducer,

});

export default persistReducer(persistConfig, rootReducer);
