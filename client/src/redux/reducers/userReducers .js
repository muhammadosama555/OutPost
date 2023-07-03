import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        currentUser: null,
    },
    reducers: {
        loginSuccess: (state,action) => {
          state.currentUser = action.payload;
        },
       
        logoutSuccess: (state) => {
          state.currentUser = null;
        },
       
        
    }
})

export const {
              loginSuccess,
              logoutSuccess,
            } = userSlice.actions
export default userSlice.reducer