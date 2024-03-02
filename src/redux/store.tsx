import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./productSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const store=configureStore({
    reducer:{
        products:ProductSlice.reducer
    }
})


export const useAppDispatch:()=>typeof store.dispatch=useDispatch;

export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;