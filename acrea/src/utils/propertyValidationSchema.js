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
    beds: Yup.number()
      .min(0, 'Number of beds cannot be negative.')
      .max(10, 'Number of beds seems unreasonably high.')
      .when('userListingType', {
        is: 'Land',
        then: () => Yup.number().equals([0], 'Land properties cannot have beds'),
        otherwise: () => Yup.number().required('Number of beds is required')
      }),
    bath: Yup.number()
      .min(0, 'Number of baths cannot be negative.')
      .max(8, 'Number of baths seems unreasonably high.')
      .when('userListingType', {
        is: 'Land',
        then: () => Yup.number().equals([0], 'Land properties cannot have baths'),
        otherwise: () => Yup.number().required('Number of baths is required')
      }),
  }),
  usrPrice: Yup.number()
    .positive('Price must be a positive number.')
    .required('Price is required.'),
  userListingImage: Yup.array(),
  ageOfProperty: Yup.number()
    .min(0, 'Age of property cannot be negative')
    .required('Age of property is required'),
  commercialZone: Yup.boolean()
    .required('Commercial zone status is required'),
  gatedCommunity: Yup.boolean()
    .required('Gated community status is required'),
  floorNumber: Yup.number()
    .when('userListingType', {
      is: (val) => val === 'Apartment',
      then: () => Yup.number()
        .required('Floor number is required for apartments')
        .min(0, 'Floor number cannot be negative')
        .max(100, 'Floor number seems too high'),
      otherwise: () => Yup.number().notRequired()
    })
});

export default propertyValidationSchema;
