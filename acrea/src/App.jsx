import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SignIn from './auth/SignIn/SignIn'
import SIgnUP from './auth/SIgnUP/SIgnUP'
import Dashboard from './views/Dashboard/Dashboard'
import NoPageFound from './views/NoPageFound/NoPageFound'

import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import About from './views/About/About'
import AddProperty from './views/AddProperty/AddProperty'
import EditProfile from './views/EditProfile/EditProfile'
import EditProperty from './views/EditProperty/EditProperty'
import FavoritedProperties from './views/FavoritedProperties/FavoritedProperties'
import ForgotPassword from './views/ForgotPassword/ForgotPassword'
import Logout from './views/Logout/Logout'
import PropertyPage from './views/PropertyPage/PropertyPage'
import ViewAllProperties from './views/ViewAllProperties/ViewAllProperties'
import BuyerList from './views/UsersList/BuyerList'
import AgentList from './views/UsersList/AgentList'
import { AuthUserDetailsSliceAction } from './store/AuthUserDetailsSlice'
import Schedule from './views/Schedule/Schedule'
import ScheduleList from './views/ScheduleList/ScheduleList'
import AgentDetails from './views/AgentDetails/AgentDetails'

function App() {
  var authUserDetails = useSelector(data => data.AuthUserDetailsSlice)
  const dispatch = useDispatch();

  function importOldUserData() {
    //if user is logged in already make him logged in 
    if (localStorage.getItem("access_token") && authUserDetails.usrAccessToken === null) {
      dispatch(AuthUserDetailsSliceAction.setUsrEmail(localStorage.getItem("usrEmail")));
      dispatch(AuthUserDetailsSliceAction.setUsrFullName(localStorage.getItem("usrFullName")));
      dispatch(AuthUserDetailsSliceAction.setUsrMobileNumber(localStorage.getItem("usrMobileNumber")));
      dispatch(AuthUserDetailsSliceAction.setUsrType(localStorage.getItem("usrType")));
      dispatch(AuthUserDetailsSliceAction.setAccessToken(localStorage.getItem("access_token")));
      dispatch(AuthUserDetailsSliceAction.setRefreshToken(localStorage.getItem("refresh_token")));
      dispatch(AuthUserDetailsSliceAction.setUsrProfileUrl(localStorage.getItem("usrProfileUrl")));
      dispatch(AuthUserDetailsSliceAction.setUserBio(localStorage.getItem("userBio")));
    }
  }
  importOldUserData()
  return (
    // for page routing purpose
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SIgnUP />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        {authUserDetails.usrEmail && (<Route path='/editProfile' element={<EditProfile />} />)}

        {authUserDetails.usrType === "agent" && (<Route path='/AddProperty' element={<AddProperty />} />)}
        {authUserDetails.usrType === "agent" && (<Route path='/EditProperty' element={<EditProperty /> }/>)}
        {(authUserDetails.usrType === "agent" || authUserDetails.usrType === "buyer" )&& (<Route path='/ScheduleList' element={<ScheduleList /> }/>)}

        {authUserDetails.usrType === "admin" && (<Route path='/BuyerList' element={<BuyerList />} />)}
        {(authUserDetails.usrType === "admin" || authUserDetails.usrType === "buyer")&& (<Route path='/AgentList' element={<AgentList />} />)}
        {authUserDetails.usrType === "admin" && (<Route path='/EditProperty' element={<EditProperty /> }/>)}

        <Route path='/Schedule' element={<Schedule/>} />
        <Route path='/AgentDetails' element={<AgentDetails />} />

        
        
        <Route path='/FavoritedProperties' element={<FavoritedProperties />} />
        <Route path='/PropertyPage' element={<PropertyPage />} />
        <Route path='/viewAllProperties' element={<ViewAllProperties />} />
        <Route path='/About' element={<About />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App