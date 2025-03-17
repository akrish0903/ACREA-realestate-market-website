import { createSlice } from "@reduxjs/toolkit";

var initialAuthState = {
    _id: null,
    usrEmail: null,
    usrFullName: null,
    usrMobileNumber: null,
    usrType: null,
    usrRefreshToken: null,
    usrAccessToken: null,
    usrProfileUrl: null,
    userBio: null,
}

var AuthUserDetailsSlice = createSlice({
    name: "AuthUserDetailsSlice",
    initialState: initialAuthState,
    reducers: {
        setUsrID: (state, action) => {
            state._id = action.payload;
        },
        setUsrEmail: (state, action) => {
            state.usrEmail = action.payload;
        },
        setUsrFullName: (state, action) => {
            state.usrFullName = action.payload;
        },
        setUsrMobileNumber: (state, action) => {
            state.usrMobileNumber = action.payload;
        },
        setUsrType: (state, action) => {
            state.usrType = action.payload;
        },
        setUsrProfileUrl: (state, action) => {
            state.usrProfileUrl = action.payload;
        },
        setUserBio: (state, action) => {
            state.userBio = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.usrRefreshToken = action.payload;
        },
        setAccessToken: (state, action) => {
            state.usrAccessToken = action.payload;
        },
        clearUserData: (state) => {
            state._id = null;
            state.usrEmail = null;
            state.usrFullName = null;
            state.usrMobileNumber = null;
            state.usrType = null;
            state.usrRefreshToken = null;
            state.usrAccessToken = null;
            state.usrProfileUrl = null;
            state.userBio = null;
        },
    }
})

export const AuthUserDetailsSliceAction = AuthUserDetailsSlice.actions;
export default AuthUserDetailsSlice;