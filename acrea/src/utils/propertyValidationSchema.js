import * as Yup from 'yup';

const propertyValidationSchema = Yup.object().shape({
  userListingType: Yup.string()
    .oneOf(['Land', 'Apartment', 'House', 'Room', 'Other'], 'Invalid property type.')
    .required('Property type is required.'),
  usrListingName: Yup.string()
    .min(3, 'Listing name must be at least 3 characters.')
    .max(100, 'Listing name cannot exceed 100 characters.')
    .required('Listing name is required.'),
  usrListingDescription: Yup.string()
    .max(1000, 'Description cannot exceed 1000 characters.'),
  usrListingSquareFeet: Yup.number()
    .required('Square feet is required.')
    .positive('Square feet must be a positive number.'),
    
  location: Yup.object().shape({
    street: Yup.string().required('Street is required.'),
    city: Yup.string().required('City is required.'),
    state: Yup.string().required('State is required.'),
    pinCode: Yup.number()
      .positive('Pin code must be a positive number.')
      .test('len', 'Pin code must be exactly 6 digits.', val => val && val.toString().length === 6)
      .required('Pin code is required.'),
  }),
  usrAmenities: Yup.array().of(Yup.string()),
  usrExtraFacilities: Yup.object().shape({
    beds: Yup.number().min(0, 'Number of beds cannot be negative.'),
    bath: Yup.number().min(0, 'Number of baths cannot be negative.'),
  }),
  usrPrice: Yup.number()
    .positive('Price must be a positive number.')
    .required('Price is required.'),
  userListingImage: Yup.string().url('Must be a valid URL.'),
});

export default propertyValidationSchema;
