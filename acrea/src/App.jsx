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
import PropertyPage from './views/PropertyPage/PropertyPage'
import ViewAllProperties from './views/ViewAllProperties/ViewAllProperties'
import FavoritedProperties from './views/FavoritedProperties/FavoritedProperties'
import Logout from './views/Logout/Logout';
import About from './views/About/About';
import AddProperty from './views/AddProperty/AddProperty'
import ForgotPassword from './views/ForgotPassword/ForgotPassword'

function App() {
  var authUserDetails = useSelector(data=>data.AuthUserDetailsSlice)
  
  return (
    // for page routing purpose
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SIgnUP />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        {authUserDetails.usrEmail && (<Route path='/editProfile' element={<EditProfile />} />)}
        
        <Route path='/AddProperty' element={<AddProperty />} />
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