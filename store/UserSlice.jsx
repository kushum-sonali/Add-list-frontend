import React from "react";
import { createSlice } from "@reduxjs/toolkit";
const userSlice= createSlice({
    name:"user",
    initialState:{
        user:null,
    },
    reducers:{

        login:(state,action)=>{
            console.log(state,action);
            state.user=action.payload;

        },
        logout:(state,action)=>{
            console.log(state,action);
            state.user(action.payload);
        }
    }
})
export const {login,logout}=userSlice.actions;
export default userSlice.reducer