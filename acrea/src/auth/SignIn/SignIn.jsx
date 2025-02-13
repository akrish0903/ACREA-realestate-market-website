import React, { useState } from 'react';
import Styles from "./css/SignIn.module.css";
import { Config } from '../../config/Config';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useApi from '../../utils/useApi';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import validateSchemaHelper from '../../utils/validateSchemaHelper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SignIn() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    usrEmail: validateSchemaHelper.usrEmail,
    usrPassword: validateSchemaHelper.usrPassword,
  });

  async function signInHandler(userObj, formicHelpers) {

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
            dispatch(AuthUserDetailsSliceAction.setUsrID(data.user_details._id));
            localStorage.setItem("_id",data.user_details._id);
            dispatch(AuthUserDetailsSliceAction.setUsrEmail(data.user_details.usrEmail));
            localStorage.setItem("usrEmail",data.user_details.usrEmail);
            dispatch(AuthUserDetailsSliceAction.setUsrFullName(data.user_details.usrFullName));
            localStorage.setItem("usrFullName",data.user_details.usrFullName);
            dispatch(AuthUserDetailsSliceAction.setUsrMobileNumber(data.user_details.usrMobileNumber));
            localStorage.setItem("usrMobileNumber",data.user_details.usrMobileNumber);
            dispatch(AuthUserDetailsSliceAction.setUsrType(data.user_details.usrType));
            localStorage.setItem("usrType",data.user_details.usrType);
            dispatch(AuthUserDetailsSliceAction.setAccessToken(data.access_token));
            localStorage.setItem("access_token",data.access_token);
            dispatch(AuthUserDetailsSliceAction.setRefreshToken(data.refresh_token));
            localStorage.setItem("refresh_token",data.refresh_token);
            dispatch(AuthUserDetailsSliceAction.setUsrProfileUrl(data.user_details.usrProfileUrl));
            localStorage.setItem("usrProfileUrl",data.user_details.usrProfileUrl);
            dispatch(AuthUserDetailsSliceAction.setUserBio(data.user_details.userBio));
            localStorage.setItem("userBio",data.user_details.userBio);

            formicHelpers.resetForm();


            // logout 

            setTimeout(() => {

              toast.info("Session Expired", {
                position: 'bottom-left',
              });
              navigate("/signin");
            }, 60 * 60 * 1000);

            // Redirecting back to dashboard
            setTimeout(() => {
              navigate("/");
            }, 1000);

            return "Account signed in successfully. Redirecting to dashboard page.";
          },
        },
        error: {
          render({ toastProps, closeToast, data }) {
            return data;
          },
        },
      }, {
        position: 'bottom-left',
      });

    } catch (error) {
      console.log("Sign in err ---> ", error);
    }
  }
  

  return (
    <Formik
      initialValues={{
        usrEmail: "",
        usrPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={signInHandler}
      initialErrors={{
        usrEmail: "Not touched",
        usrPassword: "Not touched",
      }}
      validateOnChange={true} 
    >
      {({
        values,
        errors,
        handleChange,
        touched,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => {

        return <div
          className={Styles.screen}
          style={{
            backgroundColor: Config.color.background,
            backgroundImage: `url(${Config.imagesPaths.signinBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <ArrowBackIcon onClick={() => { navigate("/") }}
            style={{
              color: Config.color.background,
              width: "5rem",
              height: "5rem",
              position: "absolute",
              zIndex: 1,
              top: "2rem",
              left: "2rem",
              cursor: "pointer"
            }}
          />
          {/* left */}
          <div className={Styles.screenLeft} />

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

                <Form className={Styles.screenRightContainerMidForm}>
                  <div style={{ flexDirection: "column" }}>
                    <Field
                      placeholder='Enter your Email'
                      type='email'
                      style={{ fontSize: Config.fontSize.regular }}
                      value={values.usrEmail}
                      onBlur={() => { setFieldTouched("usrEmail") }}
                      onFocus={() => { setFieldTouched("usrEmail", true, true); }}
                      onChange={handleChange("usrEmail")}
                      id='email'
                    />
                    {touched.usrEmail && errors.usrEmail && (
                      <p
                        className={Styles.screenRightContainerMidFormErrorNormal}
                        style={{
                          color: Config.color.warning,
                          fontSize: Config.fontSize.xsmall
                        }}
                      >
                        {errors.usrEmail}
                      </p>
                    )}
                  </div>
                  <div style={{
                    flexDirection: "column",
                    alignItems: "end"
                  }}>
                    <div style={{
                      alignItems: "center",
                      justifyContent: "right"
                    }}>
                      <div style={{ flexDirection: 'column' }}>
                      <Field
                        placeholder='Enter your Password'
                        type={showPassword ? 'text' : 'password'} // Show or hide password based on state
                        style={{ fontSize: Config.fontSize.regular }}
                        value={values.usrPassword}
                        onChange={handleChange("usrPassword")}
                        onFocus={() => { setFieldTouched("usrPassword", true, true); }} // Validate on focus
                        onBlur={() => { setFieldTouched("usrPassword") }}
                        id='password'
                      />
                      {touched.usrPassword && errors.usrPassword && (
                        <p
                          className={Styles.screenRightContainerMidFormErrorPassword}
                          style={{
                            color: Config.color.warning,
                            fontSize: Config.fontSize.xsmall
                          }}
                        >{errors.usrPassword}</p>)}
                      </div>
                      <RemoveRedEyeIcon onClick={() => { setShowPassword(!showPassword) }} 
                        className={Styles.screenRightContainerMidFormEyeIcon}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    <Link to={"/ForgotPassword"} style={{ textDecoration: "none" }}>
                    <p
                      className={Styles.screenRightContainerMidFormForgetPass}
                      style={{
                        fontSize: Config.fontSize.xsmall,
                        color: Config.color.primaryColor800
                      }}
                    >Forgot Password</p>
                    </Link>
                  </div>
                </Form>

              </div>

              {/* bottom / third */}
              <div className={Styles.screenRightContainerBottom}>
                <button
                  className={Styles.screenRightContainerBottomButton}
                  onClick={handleSubmit}
                  type='submit'
                  disabled={!isValid}
                  style={{
                    fontSize: Config.fontSize.medium,
                    backgroundColor: isHovered ? Config.color.primaryColor800 : isValid ? Config.color.background : "grey",
                    transitionProperty: "background-color ,color ,transform",
                    color: isHovered ? Config.color.background : Config.color.textColor,
                    transitionDuration: ".5s",
                    transitionTimingFunction: "ease",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => { setIsHovered(true) }}
                  onMouseLeave={() => { setIsHovered(false) }}
                  id='login'
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
      }}
    </Formik>
  )
}

export default SignIn;
