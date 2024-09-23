import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './auth/SignIn/SignIn'
import SIgnUP from './auth/SIgnUP/SIgnUP'
import Dashboard from './views/Dashboard/Dashboard'
import NoPageFound from './views/NoPageFound/NoPageFound'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './views/EditProfile/EditProfile'
import { useSelector } from 'react-redux'
import ViewAllProperties from './views/ViewAllProperties/ViewAllProperties'

function App() {
  var authUserDetails = useSelector(data=>data.AuthUserDetailsSlice)
  
  return (
    // for page routing purpose
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SIgnUP />} />
        {authUserDetails.usrEmail && (<Route path='/editProfile' element={<EditProfile />} />)}
        
        <Route path='/viewAllProperties' element={<ViewAllProperties />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App