import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/ForgotPassword.module.css';
import { Config } from '../../config/Config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import validationForgotPassword from '../../utils/validationForgotPassword';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../utils/useApi';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi;

  // Send OTP handler
  const handleSendOTP = async (values) => {
    try {
      const response = await api({
        url: '/send-otp',
        method: 'POST',
        data: {
          usrEmail: values.usrEmail,
        },
      });

      if (response && response.success) {
        toast.success('OTP sent successfully!');
        setOtpSent(true);
      } else {
        toast.error(response?.error?.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send OTP');
    }
  };

  // Verify OTP handler
  const handleVerifyOTP = async (values) => {
    try {
      const response = await api({
        url: '/verify-otp',
        method: 'POST',
        data: {
          usrEmail: values.usrEmail,
          otp: otp,
        },
      });

      if (response && response.success) {
        toast.success('OTP verified successfully!');
        setOtpVerified(true);
      } else {
        toast.error(response?.error?.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify OTP');
    }
  };

  const handleForgotPassword = async (values, { setSubmitting }) => {
    try {
      if (!otpVerified) {
        toast.error('Please verify OTP first');
        return;
      }

      const apiCallPromise = new Promise(async (resolve, reject) => {
        const apiResponse = await api({
          url: "/forgot-password",
          method: "POST",
          data: {
            usrEmail: values.usrEmail,
            usrPassword: values.newPassword,
          },
        });

        if (apiResponse && apiResponse.error) {
          reject(apiResponse.error.message);
        } else {
          resolve(apiResponse);
        }
      });

      await toast.promise(apiCallPromise, {
        pending: "Resetting password...",
        success: {
          render({ data }) {
            setTimeout(() => {
              navigate('/signin');
            }, 2000);
            return "Password reset successfully! Redirecting to login...";
          },
        },
        error: {
          render({ data }) {
            return data || "Failed to reset password";
          },
        },
      }, {
        position: 'bottom-right',
        theme: "dark",
      });

    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error?.message || 'An error occurred while resetting password');
    } finally {
      setSubmitting(false);
    }
  };

  // Add this function to check form validity
  const isFormValid = (values, errors) => {
    if (!otpVerified) return false;
    
    return (
      values.newPassword &&
      values.confirmPassword &&
      values.newPassword === values.confirmPassword &&
      !errors.newPassword &&
      !errors.confirmPassword
    );
  };

  return (
    <Formik
      initialValues={{
        usrEmail: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object(validationForgotPassword)}
      onSubmit={handleForgotPassword}
      validateOnChange={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <div className={`screen ${Styles.ForgotPasswordScreen}`}
          style={{
            backgroundColor: Config.color.background,
            backgroundImage: `url(${Config.imagesPaths.signinBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}>
          <Header />
          <div className={Styles.card1}>
            <div className={Styles.ForgotPasswordContainer}>
              <img
                src={Config.imagesPaths.logo}
                className={Styles.screenCenterContainerImg}
                alt="Logo"
              />
              <Form className={Styles.screenCenterContainerForm}>
                {/* Email Field */}
                <div style={{ flexDirection: 'column' }}>
                  <Field
                    name="usrEmail"
                    placeholder="Enter your Email"
                    type="email"
                    style={{ fontSize: Config.fontSize.regular }}
                    onBlur={() => setFieldTouched("usrEmail")}
                    onFocus={() => setFieldTouched("usrEmail", true, true)}
                    onChange={handleChange}
                    value={values.usrEmail}
                    disabled={otpVerified}
                  />
                  {touched.usrEmail && errors.usrEmail && (
                    <p className={Styles.screenRightContainerMidFormErrorNormal}
                       style={{ color: Config.color.warning, fontSize: Config.fontSize.xsmall }}>
                      {errors.usrEmail}
                    </p>
                  )}
                </div>

                {/* OTP Section */}
                {!otpVerified && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSendOTP(values)}
                      className={Styles.otpButton}
                      disabled={!values.usrEmail || otpSent}
                    >
                      {otpSent ? 'OTP Sent' : 'Send OTP'}
                    </button>

                    {otpSent && (
                      <div style={{ flexDirection: 'column' }}>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className={Styles.otpInput}
                        />
                        <button
                          type="button"
                          onClick={() => handleVerifyOTP(values)}
                          className={Styles.verifyButton}
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Password Fields - Only shown after OTP verification */}
                {otpVerified && (
                  <>
                    {/* New Password Field */}
                    <div style={{ alignItems: "center", justifyContent: "right" }}>
                      <div style={{ flexDirection: 'column' }}>
                        <Field
                          name="newPassword"
                          placeholder="Enter your New Password"
                          type={showPassword ? 'text' : 'password'}
                          style={{ fontSize: Config.fontSize.regular }}
                          onBlur={() => setFieldTouched("newPassword")}
                          onFocus={() => setFieldTouched("newPassword", true, true)}
                          onChange={handleChange}
                          value={values.newPassword}
                        />
                        {touched.newPassword && errors.newPassword && (
                          <p className={Styles.screenRightContainerMidFormErrorNormal}
                             style={{ color: Config.color.warning, fontSize: Config.fontSize.xsmall }}>
                            {errors.newPassword}
                          </p>
                        )}
                      </div>
                      <RemoveRedEyeIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className={Styles.screenCenterContainerMidFormEyeIcon}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div style={{ alignItems: "center", justifyContent: "right" }}>
                      <div style={{ flexDirection: 'column' }}>
                        <Field
                          name="confirmPassword"
                          placeholder="Confirm your New Password"
                          type={showPassword ? 'text' : 'password'}
                          style={{ fontSize: Config.fontSize.regular }}
                          onBlur={() => setFieldTouched("confirmPassword")}
                          onFocus={() => setFieldTouched("confirmPassword", true, true)}
                          onChange={handleChange}
                          value={values.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <p className={Styles.screenRightContainerMidFormErrorNormal}
                             style={{ color: Config.color.warning, fontSize: Config.fontSize.xsmall }}>
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      <RemoveRedEyeIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className={Styles.screenCenterContainerMidFormEyeIcon}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className={Styles.screenCenterContainerBottom}>
                      <button
                        className={Styles.screenCenterContainerBottomButton}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isFormValid(values, errors)}
                        style={{
                          fontSize: Config.fontSize.medium,
                          backgroundColor: isHovered
                            ? Config.color.primaryColor800
                            : isFormValid(values, errors) ? Config.color.background : "grey",
                          color: isHovered
                            ? Config.color.background
                            : Config.color.textColor,
                          transition: 'background-color ,color , transform',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        Reset Password
                      </button>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </Formik>
  );
}

export default ForgotPassword;
