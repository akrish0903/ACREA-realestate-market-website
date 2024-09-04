import React, { useState } from 'react'
import Styles from "./css/SignIn.module.css";
import { Config } from '../../config/Config';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
function SignIn() {

  const [isHovered, setIsHovered] = useState(false)

  return (

    <div
      className={Styles.screen}
      style={{
        backgroundColor: Config.color.background,
        backgroundImage: `url(${Config.imagesPaths.signinBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >


      {/* left */}
      <div
        className={Styles.screenLeft}
      />


      {/* right */}
      <div
        className={Styles.screenRight}
        style={{
          backgroundColor: Config.color.background
        }}
      >
        <div className={Styles.screenRightContainer}>

          {/* first */}
          <img
            src={Config.imagesPaths.logo}
            className={Styles.screenRightContainerImg}
          />

          {/* second */}
          <div className={Styles.screenRightContainerMid}>
            {/* <div className={Styles.screenRightContainerMidTopButtons}>
              <button type="button" className="btn btn-outline-danger">Buyer</button>
              <button type="button" className="btn btn-outline-danger">Agent/Builder</button>
            </div> */}

            <form className={Styles.screenRightContainerMidForm}>
              <input placeholder='Enter your Email' type='email' style={{ fontSize: Config.fontSize.regular }} />
              <div style={{
                flexDirection: "column",
                alignItems: "end"
              }}>
                <div style={{
                  alignItems: "center",
                  justifyContent: "right"
                }}>
                  <input placeholder='Enter your Password' type='password' style={{ fontSize: Config.fontSize.regular }} />

                  <RemoveRedEyeIcon
                    color={Config.color.textColor}
                    className={Styles.screenRightContainerMidFormEyeIcon} />
                </div>
                <p
                  className={Styles.screenRightContainerMidFormForgetPass}
                  style={{
                    fontSize: Config.fontSize.xsmall,
                    color: Config.color.primaryColor1000
                  }}
                >Forgot Password</p>
              </div>
            </form>

          </div>

          {/* bottom / third */}
          <div className={Styles.screenRightContainerBottom}>
            <button
              className={Styles.screenRightContainerBottomButton}
              style={{
                fontSize: Config.fontSize.medium,
                backgroundColor: isHovered ? Config.color.primaryColor1000 : Config.color.background,
                transitionProperty: "background-color ,color ,transform",
                color: isHovered ? Config.color.background : Config.color.textColor,
                transitionDuration: ".5s",
                transitionTimingFunction: "ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
            >Login</button>
            <Link to={"/signup"} style={{textDecoration:"none"}}>
              <p style={{
                fontSize: Config.fontSize.small,
                color: Config.color.primaryColor1000,
                cursor: "pointer"
              }}>Don’t Have Account? Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn