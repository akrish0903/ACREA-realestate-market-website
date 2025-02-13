import * as Yup from 'yup';

const validationForgotPassword = {
    usrEmail: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
};

export default validationForgotPassword;