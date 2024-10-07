import * as Yup from 'yup';

export const propertyValidationSchema = Yup.object().shape({
  userListingType: Yup.string()
    .required('Property type is required'),
  usrListingName: Yup.string()
    .required('Listing name is required')
    .max(100, 'Listing name cannot exceed 100 characters'),
  usrListingDescription: Yup.string()
    .max(500, 'Description cannot exceed 500 characters'),
  usrListingSquareFeet: Yup.number()
    .required('Square feet is required')
    .positive('Square feet must be a positive number')
    .integer('Square feet must be an integer'),
  location: Yup.object().shape({
    street: Yup.string()
      .required('Street is required'),
    city: Yup.string()
      .required('City is required'),
    state: Yup.string()
      .required('State is required'),
    pinCode: Yup.number()
      .required('Pin code is required')
      .positive('Pin code must be a positive number')
      .integer('Pin code must be an integer'),
  }),
  usrAmenities: Yup.array()
    .of(Yup.string())
    .nullable(),
  usrExtraFacilities: Yup.object().shape({
    beds: Yup.number()
      .nullable()
      .positive('Beds must be a positive number')
      .integer('Beds must be an integer'),
    bath: Yup.number()
      .nullable()
      .positive('Baths must be a positive number')
      .integer('Baths must be an integer'),
  }),
  usrPrice: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  userListingImage: Yup.string()
    .url('Image URL must be a valid URL')
    .nullable(),
});
