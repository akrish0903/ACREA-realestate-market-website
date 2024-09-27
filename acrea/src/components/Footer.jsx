import React, { useState } from 'react'
import { Config } from '../config/Config'
import { NavLink, useNavigate } from 'react-router-dom';
import './css/Footer.module.css';

function Footer(){
return(
        <footer className="flex justify-between items-center p-4 border-t border-gray-200" style={{
            color: Config.color.primaryColor900,backgroundColor: Config.color.secondaryColor300
        }}>
          {/* Left Section */}
          <NavLink to={"/"}>
          <div className="flex items-center">
            <img src="/favicon.ico" alt="Icon" className="w-6 h-6 mr-2" />
          </div>
          </NavLink>
    
          {/* Center Links */}
          <div className="flex space-x-4">
            <a href="/viewAllProperties" >
              Properties
            </a>
            {/* <a href="/terms-of-service" className="text-red-600 hover:underline">
              Terms of Service
            </a> */}
          </div>
    
          {/* Right Section */}
          <div >
            &copy; 2024 Acred All rights reserved.
          </div>
        </footer>
)
}
export default Footer;