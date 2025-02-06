import React, { useState, useEffect } from 'react';
import Styles from "./css/SignUp.module.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import useApi from '../../utils/useApi';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import signupValidationSchema from '../../utils/signupValidationSchema'; // Import the validation schema

function SIgnUP() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // State for form validation status
  const navigate = useNavigate();
  
  const [userObj, setUserObj] = useState({
    usrFullName: "",
    usrEmail: "",
    usrMobileNumber: "",
    usrPassword: "",
    usrReptPassword: "",
    usrType: "",
  });

  const [validationErrors, setValidationErrors] = useState({}); // State for validation errors
  const [otp, setOtp] = useState(""); // Added OTP state
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent

  // Toggle password visibility
  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword(!showPassword);
  };

  async function validateField(name, value) {
    try {
      await signupValidationSchema.validateAt(name, { ...userObj, [name]: value });
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setValidationErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  }

  // Use useEffect to check if the form is valid whenever userObj or validationErrors change
  useEffect(() => {
    const checkFormValidity = async () => {
      try {
        await signupValidationSchema.validate(userObj, { abortEarly: false });
        setIsFormValid(true); // No validation errors, form is valid
      } catch (error) {
        setIsFormValid(false); // There are validation errors
      }
    };
    checkFormValidity();
  }, [userObj, validationErrors]);

  // Send OTP
  const sendOtpHandler = async () => {
    if (!userObj.usrEmail) {
      toast.error("Enter email first!");
      return;
    }
    const response = await useApi({
      url: "/send-otp",
      method: "POST",
      data: { usrEmail: userObj.usrEmail },
    });

    if (response.success) {
      toast.success("OTP sent to email!");
      setOtpSent(true);
    } else {
      toast.error(response.error);
    }
  };

  // Signup with OTP verification
  async function signUpHandler(e) {
    e.preventDefault();
    
    if (!otpSent) {
      toast.error("Please verify OTP first!");
      return;
    }

    const response = await useApi({
      url: "/verify-otp",
      method: "POST",
      data: { usrEmail: userObj.usrEmail, otp: otp },
    });

    if (response.success) {
      toast.success("OTP verified, Signing up...");

      // Validate the entire object before the API call
      await signupValidationSchema.validate(userObj, { abortEarly: false });

      // Proceed with the API call if validation passes
      const apiCallPromise = new Promise(async (resolve, reject) => {
        const apiResponse = await useApi({
          url: "/signup",
          method: "POST",
          data: {
            ...userObj,
            usrProfileUrl: null,
            userBio: null,
            usrStatus: true
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
        pending: "Signing up new user..!!",
        success: {
          render({ toastProps, closeToast, data }) {
            setUserObj({
              usrFullName: "",
              usrEmail: "",
              usrMobileNumber: "",
              usrPassword: "",
              usrReptPassword: "",
              usrType: "",
            });
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
            console.log(data);
            return "Account created successfully. Redirecting to login page.";
          },
        },
        error: {
          render({ toastProps, closeToast, data }) {
            return data;
          },
        },
      }, {
        position: 'bottom-right',
      });

    } else {
      toast.error("Invalid OTP!");
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
      <ArrowBackIcon onClick={() => { navigate("/") }}
        style={{
          color: Config.color.textColor,
          width: "5rem",
          height: "5rem",
          position: "absolute",
          zIndex: 1,
          top: "2rem",
          left: "2rem",
          cursor: "pointer"
        }}
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
            <div className={Styles.screenRightContainerMidTopButtons}>
              <button type="button" onClick={() => setUserObj({ ...userObj, usrType: "buyer" })} className={`btn ${userObj.usrType === "buyer" ? "btn-danger" : "btn-outline-danger"}`}>Buyer</button>
              <button type="button" onClick={() => setUserObj({ ...userObj, usrType: "agent" })} className={`btn ${userObj.usrType === "agent" ? "btn-danger" : "btn-outline-danger"}`}>Agent</button>
              <button type="button" onClick={() => setUserObj({ ...userObj, usrType: "owner" })} className={`btn ${userObj.usrType === "owner" ? "btn-danger" : "btn-outline-danger"}`}>Owner</button>
            </div>

            <form className={Styles.screenRightContainerMidForm}>
              <input
                placeholder='Enter your Name'
                type='text'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrFullName}
                onFocus={() => validateField('usrFullName', userObj.usrFullName)} // Validate on focus
                onChange={(e) => {
                  setUserObj({ ...userObj, usrFullName: e.target.value });
                  validateField('usrFullName', e.target.value); // Validate on change
                }}
              />
              {validationErrors.usrFullName && <p className={Styles.error} style={{color: Config.color.primaryColor900}}>{validationErrors.usrFullName}</p>}

              <input
                placeholder='Enter your Email'
                type='email'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrEmail}
                onFocus={() => validateField('usrEmail', userObj.usrEmail)} // Validate on focus
                onChange={(e) => {
                  setUserObj({ ...userObj, usrEmail: e.target.value });
                  validateField('usrEmail', e.target.value); // Validate on change
                }}
              />
              {validationErrors.usrEmail && <p className={Styles.error} style={{color: Config.color.primaryColor900}}>{validationErrors.usrEmail}</p>}
              
              <button type="button" onClick={sendOtpHandler} className={Styles.otpButton}>
                Send OTP
              </button>
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              )}

              <input
                placeholder='Enter your Phone Number'
                type='text'
                style={{ fontSize: Config.fontSize.regular }}
                value={userObj.usrMobileNumber}
                onFocus={() => validateField('usrMobileNumber', userObj.usrMobileNumber)} // Validate on focus
                onChange={(e) => {
                  setUserObj({ ...userObj, usrMobileNumber: e.target.value }); 
                  validateField('usrMobileNumber', e.target.value);// Validate on change
                }}
              />
              {validationErrors.usrMobileNumber && <p className={Styles.error} style={{color: Config.color.primaryColor900}}>{validationErrors.usrMobileNumber}</p>}

              <div style={{ flexDirection: "column", alignItems: "end" }}>
                <div style={{ alignItems: "center", justifyContent: "right" }}>
                  <input
                    placeholder='Enter your Password'
                    type={showPassword ? 'text' : 'password'}
                    style={{ fontSize: Config.fontSize.regular }}
                    value={userObj.usrPassword}
                    onFocus={() => validateField('usrPassword', userObj.usrPassword)} // Validate on focus
                    onChange={(e) => {
                      setUserObj({ ...userObj, usrPassword: e.target.value });
                      validateField('usrPassword', e.target.value); // Validate on change
                    }}
                  />
                  <RemoveRedEyeIcon
                    color={Config.color.textColor}
                    className={Styles.screenRightContainerMidFormEyeIcon}
                    onClick={togglePasswordVisibility1}
                  />
                </div>
                {validationErrors.usrPassword && <p className={Styles.error} style={{color: Config.color.primaryColor900}}>{validationErrors.usrPassword}</p>}
              </div>

              <div style={{ flexDirection: "column", alignItems: "end" }}>
                <div style={{ alignItems: "center", justifyContent: "right" }}>
                  <input
                    placeholder='Confirm your Password'
                    type={showPassword ? 'text' : 'password'}
                    style={{ fontSize: Config.fontSize.regular }}
                    value={userObj.usrReptPassword}
                    onFocus={() => validateField('usrReptPassword', userObj.usrReptPassword)} // Validate on focus
                    onChange={(e) => {
                      setUserObj({ ...userObj, usrReptPassword: e.target.value });
                      validateField('usrReptPassword', e.target.value); // Validate on change
                    }}
                  />
                  <RemoveRedEyeIcon
                    color={Config.color.textColor}
                    className={Styles.screenRightContainerMidFormEyeIcon}
                    onClick={togglePasswordVisibility2}
                  />
                </div>
                {validationErrors.usrReptPassword && <p className={Styles.error} style={{color: Config.color.primaryColor900}}>{validationErrors.usrReptPassword}</p>}
              </div>
            </form>
          </div>

              {/* bottom / third */}
          <div className={Styles.screenRightContainerBottom}>
            <button
              className={Styles.screenRightContainerBottomButton}
              style={{
                fontSize: Config.fontSize.medium,
                backgroundColor: isHovered ? Config.color.primaryColor800 : isFormValid ? Config.color.background : "grey",
                transitionProperty: "background-color ,color ,transform",
                color: isHovered ? Config.color.background : Config.color.textColor,
                transitionDuration: ".5s",
                transitionTimingFunction: "ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
              type="submit"
              onClick={signUpHandler}
              disabled={!isFormValid} // Button will be disabled if form is invalid  
            >
              Sign Up
            </button>
            <Link to={"/signin"} style={{ textDecoration: "none" }}>
               <p style={{
                 fontSize: Config.fontSize.small,
                 color: Config.color.primaryColor800,
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
  );
}

export default SIgnUP;