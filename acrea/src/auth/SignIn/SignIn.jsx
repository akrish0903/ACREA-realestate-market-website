import React, { useState } from 'react'
import Styles from "./css/SignIn.module.css";
import { Config } from '../../config/Config';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useApi from '../../utils/useApi';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { useDispatch } from 'react-redux';
function SignIn() {

  const [isHovered, setIsHovered] = useState(false)

  const [userObj, setUserObj] = useState({
    usrEmail: "",
    usrPassword: "",
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function signInHandler(e) {
    e.preventDefault();
    if (
      userObj.usrEmail === "" || userObj.usrPassword === "") {
      toast.error("Please fill all fields.", {
        position: 'bottom-left',
      });
    } else {
      try {
        // toast notification
        const apiCallPromise = new Promise(async (resolve, reject) => {
          const apiResponse = await useApi({
            url: "/signin",
            method: "POST",
            data: {
              usrEmail: userObj.usrEmail,
              usrPassword: userObj.usrPassword,
            },
          });
          if (apiResponse && apiResponse.error) {
            reject(apiResponse.error.message);
          } else {
            resolve(apiResponse);
          }
        });

        //showing toast
        // Use toast.promise with the new wrapped promise
        await toast.promise(apiCallPromise, {
          pending: "Signing in user..!!",
          success: {
            render({ toastProps, closeToast, data }) {
              
              // Updating details to class
              dispatch(AuthUserDetailsSliceAction.setUsrEmail(data.user_details.usrEmail));
              dispatch(AuthUserDetailsSliceAction.setUsrFullName(data.user_details.usrFullName));
              dispatch(AuthUserDetailsSliceAction.setUsrMobileNumber(data.user_details.usrMobileNumber));
              dispatch(AuthUserDetailsSliceAction.setUsrType(data.user_details.usrType));
              dispatch(AuthUserDetailsSliceAction.setAccessToken(data.access_token));
              dispatch(AuthUserDetailsSliceAction.setRefreshToken(data.refresh_token));
              dispatch(AuthUserDetailsSliceAction.setUsrProfileUrl(data.user_details.usrProfileUrl));
              dispatch(AuthUserDetailsSliceAction.setUserBio(data.user_details.userBio));


              // seting state back to normal
              setUserObj({
                usrEmail: "",
                usrPassword: ""
              })

              // logout 
              setTimeout(() => {

                toast.info("Session Expired", {
                  position: 'bottom-left',
                });
                navigate("/signin");
              }, 60 * 60 * 1000)

              // Redirecting back to dashboard
              setTimeout(() => {
                navigate("/");
              }, 5000)

              return "Account signed in successfully. Redirecting to dashboard page."
            },
          },
          error: {
            render({ toastProps, closeToast, data }) {
              return data
            },
          },
        }, {
          position: 'bottom-left',
        });

      } catch (error) {
        console.log("Sign in err ---> ", error)
      }

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
              <input
                placeholder='Enter your Email'
                type='email'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrEmail}
                onChange={(e) => { setUserObj({ ...userObj, usrEmail: e.target.value }) }}
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
                <p
                  className={Styles.screenRightContainerMidFormForgetPass}
                  style={{
                    fontSize: Config.fontSize.xsmall,
                    color: Config.color.primaryColor800
                  }}
                >Forgot Password</p>
              </div>
            </form>

          </div>

          {/* bottom / third */}
          <div className={Styles.screenRightContainerBottom}>
            <button
              className={Styles.screenRightContainerBottomButton}
              onClick={signInHandler}
              style={{
                fontSize: Config.fontSize.medium,
                backgroundColor: isHovered ? Config.color.primaryColor800 : Config.color.background,
                transitionProperty: "background-color ,color ,transform",
                color: isHovered ? Config.color.background : Config.color.textColor,
                transitionDuration: ".5s",
                transitionTimingFunction: "ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
            >Login</button>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <p style={{
                fontSize: Config.fontSize.small,
                color: Config.color.primaryColor800,
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