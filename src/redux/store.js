import { configureStore } from "@reduxjs/toolkit";
import finalDataReducer from "./allSlice";

const store=configureStore({
    reducer:{
        finalData:finalDataReducer
    }
})

export default store