import React, { useState } from 'react'
import { Config } from '../config/Config'
import { NavLink, useNavigate } from 'react-router-dom';
import Styles from  './css/Footer.module.css';
import { useSelector } from 'react-redux';

function Footer(){
  const userAuthData = useSelector(data => data.AuthUserDetailsSlice); // Select auth data from Redux store
  
return(
        <footer style={{
            color: Config.color.primaryColor900,backgroundColor: Config.color.secondaryColor300
        }}>
          {/* Left Section */}
          <NavLink to={"/"}>
          <div >
            <img src={Config.imagesPaths.logo4} alt="Icon" className={Styles.ftimg} />
          </div>
          </NavLink>
    
          {/* Center Links */}
          {userAuthData.usrAccessToken!==null && (<div className="flex space-x-4">
            <a href="/viewAllProperties" >
              Properties
            </a>
            {/* <a href="/terms-of-service" className="text-red-600 hover:underline">
              Terms of Service
            </a> */}
          </div>)}
    
          {/* Right Section */}
          <div >
            &copy; 2024 Acrea All rights reserved.
          </div>
        </footer>
)
}
export default Footer;