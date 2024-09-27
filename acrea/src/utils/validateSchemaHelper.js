import * as Yup from 'yup';

const validateSchemaHelper = {
    usrFullName: "",
    usrEmail: Yup.string()
        .email('Invalid email address.')
        .matches(/^[A-Za-z][A-Za-z0-9]*@[A-Za-z]+\.[A-Za-z0-9]+$/, 'Email should start with an alphabet, may contain numbers, have an alphabet before and after @, and a dot followed by alphanumeric.')
        .required('Email is required.'),
    usrPhoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only digits.')
        .min(10, 'Phone number must be at least 10 digits.')
        .max(10, 'Phone number cannot be more than 15 digits.')
        .required('Phone number is required.'),
    usrPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters.')
        .required('Password is required')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character.'),
    usrReptPassword: Yup.string()
        .oneOf([Yup.ref('usrPassword'), null], 'Passwords must match.')
        .required('Confirm password is required.'),
};
export default validateSchemaHelper;