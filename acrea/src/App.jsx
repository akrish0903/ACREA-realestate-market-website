import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './auth/SignIn/SignIn'
import SIgnUP from './auth/SIgnUP/SIgnUP'
import Dashboard from './views/Dashboard/Dashboard'
import NoPageFound from './views/NoPageFound/NoPageFound'

function App() {
  return (
    // for page routing purpose
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SIgnUP />} />
        <Route path='/' element={<Dashboard/>} />
        <Route path='*' element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App