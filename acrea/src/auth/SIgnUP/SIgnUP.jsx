import React, { useState } from 'react'
import Styles from "./css/SignUp.module.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import { Config } from '../../config/Config';
import useApi from '../../utils/useApi';

function SIgnUP() {
  const [isHovered, setIsHovered] = useState(false);

  const [userObj, setUserObj] = useState({
    usrFullName: "",
    usrEmail: "",
    usrMobileNumber: "",
    usrPassword: "",
    usrReptPassword: "",
    usrType: "",
  })

  async function signUpHandler(e) {
    e.preventDefault();
    if (
      userObj.usrFullName === "" ||
      userObj.usrEmail === "" ||
      userObj.usrMobileNumber === "" ||
      userObj.usrPassword === "" ||
      userObj.usrReptPassword === "" ||
      userObj.usrType === ""
    ) {
      alert("Please fill all felids.")
    } else if (userObj.usrPassword !== userObj.usrReptPassword) {
      alert("Confirm password is not same as password.")
    } else {
      var signUpHandlerApiCalled = await useApi({
        url: "/signup",
        method: "POST",
        data: {
          usrFullName: userObj.usrFullName,
          usrEmail: userObj.usrEmail,
          usrMobileNumber: userObj.usrMobileNumber,
          usrPassword: userObj.usrPassword,
          usrType: userObj.usrType,
        },
      })
      console.log("-----res api----->", signUpHandlerApiCalled)
    }
  }


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
            <div className={Styles.screenRightContainerMidTopButtons}>
              <button type="button" onClick={() => setUserObj({ ...userObj, usrType: "buyer" })} className={`btn ${userObj.usrType === "buyer" ? "btn-danger" : "btn-outline-danger"}`}>Buyer</button>
              <button type="button" onClick={() => setUserObj({ ...userObj, usrType: "agent" })} className={`btn ${userObj.usrType === "agent" ? "btn-danger" : "btn-outline-danger"}`}>Agent/Builder</button>
            </div>

            <form className={Styles.screenRightContainerMidForm}>
              <input
                placeholder='Enter your Name'
                type='text'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrFullName}
                onChange={(e) => { setUserObj({ ...userObj, usrFullName: e.target.value }) }}
              />
              <input
                placeholder='Enter your Email'
                type='email'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrEmail}
                onChange={(e) => { setUserObj({ ...userObj, usrEmail: e.target.value }) }}
              />
              <input
                placeholder='Enter your Phone Number'
                type='number'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrMobileNumber}
                onChange={(e) => { setUserObj({ ...userObj, usrMobileNumber: e.target.value }) }}
              />
              <div style={{
                flexDirection: "column",
                alignItems: "end"
              }}>
                <div style={{
                  alignItems: "center",
                  justifyContent: "right"
                }}>
                  <input
                    placeholder='Enter your Password'
                    type='password'
                    style={{ fontSize: Config.fontSize.regular }}
                    value={userObj.usrPassword}
                    onChange={(e) => { setUserObj({ ...userObj, usrPassword: e.target.value }) }}
                  />

                  <RemoveRedEyeIcon
                    color={Config.color.textColor}
                    className={Styles.screenRightContainerMidFormEyeIcon} />
                </div>
                {/* <p
                  className={Styles.screenRightContainerMidFormForgetPass}
                  style={{
                    fontSize: Config.fontSize.xsmall,
                    color: Config.color.primaryColor1000
                  }}
                >Forgot Password</p> */}
              </div>
              <div style={{
                flexDirection: "column",
                alignItems: "end"
              }}>
                <div style={{
                  alignItems: "center",
                  justifyContent: "right"
                }}>
                  <input
                    placeholder='Confirm your Password'
                    type='password'
                    style={{ fontSize: Config.fontSize.regular }}
                    value={userObj.usrReptPassword}
                    onChange={(e) => { setUserObj({ ...userObj, usrReptPassword: e.target.value }) }}
                  />

                  <RemoveRedEyeIcon
                    color={Config.color.textColor}
                    className={Styles.screenRightContainerMidFormEyeIcon} />
                </div>
                {/* <p
                  className={Styles.screenRightContainerMidFormForgetPass}
                  style={{
                    fontSize: Config.fontSize.xsmall,
                    color: Config.color.primaryColor1000
                  }}
                >Forgot Password</p> */}
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
              onClick={signUpHandler}
            >Sign Up</button>
            <Link to={"/signin"} style={{ textDecoration: "none" }}>
              <p style={{
                fontSize: Config.fontSize.small,
                color: Config.color.primaryColor1000,
                cursor: "pointer"
              }}>Already Have Account? Sign In</p>
            </Link>
          </div>
        </div>
      </div>

      {/* left */}
      <div
        className={Styles.screenLeft}
      />
    </div>
  )
}

export default SIgnUP