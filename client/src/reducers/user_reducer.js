import { createSlice } from "@reduxjs/toolkit";

const user_reducer = createSlice({
    name:"users",
    initialState:{
        user:null,
    },
    reducers: {
        SetUser : (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {SetUser} = user_reducer.actions;
export default user_reducer.reducer;