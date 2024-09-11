import {configureStore} from "@reduxjs/toolkit"
import AuthUserDetailsSlice from "./AuthUserDetailsSlice"
var reducerStore = configureStore({
    reducer:{
        AuthUserDetailsSlice:AuthUserDetailsSlice.reducer,
    }
})
export default reducerStore