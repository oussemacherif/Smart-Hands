import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice"
import location from "./location";
import adaptReducer from "./adaptSlice"


const store=configureStore({

reducer:{
map:mapReducer,
location:location,
adopt: adaptReducer,
}




})

export default store