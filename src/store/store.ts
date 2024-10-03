import { configureStore } from "@reduxjs/toolkit";
import { pageUserReducer } from "./pageUser/slice";

export const store = configureStore({
    reducer:{
        pageUserReducer,
    }
})