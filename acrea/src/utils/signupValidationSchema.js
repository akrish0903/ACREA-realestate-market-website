import * as Yup from 'yup';

const signupValidationSchema = Yup.object().shape({
    usrType: Yup.string()
        .required('User type is required.'),
    
    usrFullName: Yup.string()
        .trim('Full name can not start or end with spaces.')
        .strict(true)
        .required('Full name is required.')
        .min(2, 'Full name must be at least 2 characters long.')
        .matches(/^[A-Za-z\s]+$/, 'Full name must contain only alphabets and spaces.')
        .test('no-double-space', 'Full name cannot contain double spaces.', value => !/\s{2,}/.test(value)), // Prevent double spaces
    
    usrEmail: Yup.string()
        .email('Invalid email address.')
        .matches(/^[A-Za-z][A-Za-z0-9]*@[A-Za-z]+\.[A-Za-z0-9]+$/, 'Email format not correct.')
        .required('Email is required.'),
    
    usrMobileNumber: Yup.string()
        .trim()
        .strict(true)
        .min(10, 'Phone number must be at least 10 digits.')
        .max(10, 'Phone number must be exactly 10 digits.')
        .matches(/^[0-9]+$/, 'Phone number must contain only digits.')
        .test('not-all-same-digits', 'Phone number cannot be the same digit repeated.', value => !/(.)\1{9}/.test(value))
        .test('not-sequential', 'Phone number cannot be sequential like "1234567890".', value => !/^(0123456789|1234567890|0987654321|9876543210)$/.test(value))
        .required('Phone number is required.'),
    
    usrPassword: Yup.string()
        .trim()
        .strict(true)
        .min(6, 'Password must be at least 6 characters long.')
        .required('Password is required.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character.')
        .test('no-whitespace', 'Password cannot contain spaces.', value => !/\s/.test(value)), // Prevent whitespaces in the password
    
    usrReptPassword: Yup.string()
        .oneOf([Yup.ref('usrPassword'), null], 'Passwords must match.')
        .required('Confirm password is required.'),
});

export default signupValidationSchema;
