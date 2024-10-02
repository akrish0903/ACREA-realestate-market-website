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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const api = useApi;



const handleForgotPassword = async (values, { setSubmitting }) => {
  try {
    const token = "";

    const response = await api({
      url: '/forgot-password',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: values.usrEmail,
        phone: values.usrPhoneNumber,
        password: values.newPassword,
      },
    });
    
    // Check for response or error
    if (response && response.error) {
      toast.error(response.error.message || 'An unknown error occurred');
    } else if (response && response.data) {
      toast.success('Password reset successfully');
      dispatch(AuthUserDetailsSliceAction.setUser(response.data));
      navigate('/signin');
    } else {
      toast.error('Unexpected response format');
    }
  } catch (error) {
    console.error(error); // Log the error object
    toast.error('An error occurred');
  } finally {
    setSubmitting(false);
  }
};
  

  return (
    <Formik
      initialValues={{
        usrEmail: '',
        usrPhoneNumber: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object(validationForgotPassword)} // Ensure this is correct
      onSubmit={handleForgotPassword}
      validateOnChange={true}
      initialErrors={{
        usrEmail: 'Email not filled.',
        usrPhoneNumber: 'Phone Number not filled.',
        newPassword: 'Password not filled.',
        confirmPassword: 'Confirm Password not filled.',
      }}
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

                {/* Phone Number Field */}
                <div style={{ flexDirection: 'column' }}>
                <Field
                    name="usrPhoneNumber"
                    placeholder="Enter your Registered Phone Number"
                    type="text"
                    style={{ fontSize: Config.fontSize.regular }}
                    onBlur={() => { setFieldTouched("usrPhoneNumber") }}
                    onFocus={() => { setFieldTouched("usrPhoneNumber", true, true); }}
                    onChange={handleChange("usrPhoneNumber")}
                    value={values.usrPhoneNumber}
                />
                {touched.usrPhoneNumber && errors.usrPhoneNumber && (
                    <p
                    className={Styles.screenRightContainerMidFormErrorNormal}
                    style={{
                        color: Config.color.warning,
                        fontSize: Config.fontSize.xsmall
                    }}
                    >
                    {errors.usrPhoneNumber}
                    </p>
                )}

                </div>

                {/* New Password Field */}
                <div style={{
                    alignItems: "center",
                    justifyContent: "right"
                    }}>
                    <div style={{ flexDirection: 'column' }}>
                <Field
                    name="newPassword"
                    placeholder="Enter your New Password"
                    type={showPassword ? 'text' : 'password'}
                    style={{ fontSize: Config.fontSize.regular }}
                    onBlur={() => { setFieldTouched("newPassword") }}
                    onFocus={() => { setFieldTouched("newPassword", true, true); }}
                    onChange={handleChange("newPassword")}
                    value={values.newPassword}
                />
                {touched.newPassword && errors.newPassword && (
                    <p
                    className={Styles.screenRightContainerMidFormErrorNormal}
                    style={{
                        color: Config.color.warning,
                        fontSize: Config.fontSize.xsmall
                    }}
                    >
                    {errors.newPassword}
                    </p>
                )}

                </div>
                {/* Toggle Password Visibility */}
                <RemoveRedEyeIcon
                onClick={() => setShowPassword(!showPassword)}
                className={Styles.screenCenterContainerMidFormEyeIcon}
                style={{ cursor: 'pointer' }}
                />
                </div>

                {/* Confirm Password Field */}
                <div style={{
                    alignItems: "center",
                    justifyContent: "right"
                    }}>
                    <div style={{ flexDirection: 'column' }}>
                <Field
                    name="confirmPassword"
                    placeholder="Confirm your New Password"
                    type={showPassword ? 'text' : 'password'}
                    style={{ fontSize: Config.fontSize.regular }}
                    onBlur={() => { setFieldTouched("confirmPassword") }}
                    onFocus={() => { setFieldTouched("confirmPassword", true, true); }}
                    onChange={handleChange("confirmPassword")}
                    value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                    <p
                    className={Styles.screenRightContainerMidFormErrorNormal}
                    style={{
                        color: Config.color.warning,
                        fontSize: Config.fontSize.xsmall
                    }}
                    >
                    {errors.confirmPassword}
                    </p>
                )}
                </div>
                {/* Toggle Password Visibility */}
                <RemoveRedEyeIcon
                onClick={() => setShowPassword(!showPassword)}
                className={Styles.screenCenterContainerMidFormEyeIcon}
                style={{ cursor: 'pointer' }}
                />
                </div>
                <div className={Styles.screenCenterContainerBottom}>
                  <button
                    className={Styles.screenCenterContainerBottomButton}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    style={{
                      fontSize: Config.fontSize.medium,
                      backgroundColor: isHovered
                        ? Config.color.primaryColor800
                        : isValid ? Config.color.background : "grey",
                      color: isHovered
                        ? Config.color.background
                        : Config.color.textColor,
                      transition: 'background-color ,color , transform',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Submit
                  </button>
                </div>
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
