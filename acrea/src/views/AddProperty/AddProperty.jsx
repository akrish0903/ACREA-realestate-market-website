import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/AddProperty.module.css";
import { Config } from '../../config/Config';
import useApi from '../../utils/useApi';
import propertyValidationSchema from '../../utils/propertyValidationSchema';
import { Button, CircularProgress } from '@mui/material';
import LocationPicker from '../../components/LocationPicker';

function AddProperty() {
  const authUserDetails = useSelector(data => data.AuthUserDetailsSlice);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);

  const formik = useFormik({
    initialValues: {
      userListingType: "Land",
      usrListingName: "",
      usrListingDescription: "",
      usrListingSquareFeet: 0,
      location: {
        street: "",
        district: "",
        city: "",
        state: "",
        pinCode: 0,
        latitude: 0,
        longitude: 0,
      },
      usrAmenities: [],
      usrExtraFacilities: {
        beds: 0,
        bath: 0
      },
      usrPrice: 0,
      userListingImage: [],
      ageOfProperty: 0,
      commercialZone: false,
      gatedCommunity: false,
      floorNumber: 0
    },
    validationSchema: propertyValidationSchema,
    onSubmit: addPropertyHandler,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
  
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("userListingImage", file); // Append each file to the FormData
    });
  
    try {
      const response = await fetch(`${Config.apiBaseUrl}/upload-photos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUserDetails.usrAccessToken}`, // Include the authorization token
        },
        body: formData,
      });
  
      const data = await response.json();
      if (data.imageUrls) {
        setImageUrls(data.imageUrls); // Update the state with the uploaded image URLs
        formik.setFieldValue('userListingImage', data.imageUrls); // Set Formik field value
        toast.success("Images uploaded successfully!");
      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Error uploading images");
    }
  };

  async function addPropertyHandler(values) {
    const propertyData = {
        ...values,
        userListingImage: imageUrls // Ensure this is set to the array of image URLs
    };

    try {
        const apiResponse = await useApi({
            url: "/add-properties",
            method: "POST",
            authRequired: true,
            authToken: authUserDetails.usrAccessToken,
            data: propertyData,
        });

        // Check if the response indicates success
        if (apiResponse && apiResponse.message === "Property added Success.") {
            // Handle success case
            formik.resetForm();
            navigate(-1);
            toast.success(apiResponse.message); // Show success message
        } else {
            // Handle error case
            throw new Error(apiResponse.message || 'Failed to add property');
        }
    } catch (error) {
        console.error('Error adding property:', error);
        toast.error(error.message || 'An error occurred while adding the property.');
    }
}

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    let updatedAmenities = [...formik.values.usrAmenities];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      updatedAmenities = updatedAmenities.filter(amenity => amenity !== value);
    }
    formik.setFieldValue('usrAmenities', updatedAmenities);
  };

  const handlePredictPrice = async () => {
    setIsPredicting(true);
    try {
      const response = await fetch(`${Config.apiBaseUrl}/ai/predict-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUserDetails.usrAccessToken}`,
        },
        body: JSON.stringify(formik.values),
      });

      const data = await response.json();
      if (data.predictedPrice) {
        setPredictedPrice(data.predictedPrice);
        toast.success('Price prediction successful!');
      } else {
        toast.error('Failed to predict price');
      }
    } catch (error) {
      console.error('Price prediction error:', error);
      toast.error('Error predicting price');
    } finally {
      setIsPredicting(false);
    }
  };

  const areRequiredFieldsFilled = () => {
    const requiredFields = [
      'userListingType',
      'usrListingName',
      'usrListingSquareFeet',
      'location.street',
      'location.city',
      'location.state',
      'location.pinCode',
      'ageOfProperty'
    ];
    
    return requiredFields.every(field => {
      const value = field.includes('.')
        ? formik.values[field.split('.')[0]][field.split('.')[1]]
        : formik.values[field];
      return value !== '' && value !== 0 && value !== null && value !== undefined;
    });
  };

  // Add validation function
  async function validateField(name, value) {
    try {
      // For nested objects like location and usrExtraFacilities
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        await propertyValidationSchema.validateAt(name, {
          ...formik.values,
          [parent]: { ...formik.values[parent], [child]: value }
        });
      } else {
        await propertyValidationSchema.validateAt(name, { ...formik.values, [name]: value });
      }
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setValidationErrors(prev => ({ ...prev, [name]: err.message }));
    }
  }

  // Example of a reusable input component with live validation
  const ValidatedInput = ({ label, name, type = 'text', ...props }) => (
    <div className={`${Styles.formGroup} ${validationErrors[name] ? Styles.hasError : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        {...props}
        onChange={(e) => {
          const value = type === 'number' ? Number(e.target.value) : e.target.value;
          formik.setFieldValue(name, value);
          validateField(name, value);
        }}
        onBlur={(e) => {
          formik.handleBlur(e);
          validateField(name, e.target.value);
        }}
        value={formik.values[name]}
      />
      {validationErrors[name] && (
        <div className={Styles.errorMessage}>{validationErrors[name]}</div>
      )}
    </div>
  );

  const handlePinCodeChange = async (e) => {
    const pincode = e.target.value;
    formik.setFieldValue('location.pinCode', pincode);

    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const [data] = await response.json();

        if (data.Status === "Success") {
          const postOffice = data.PostOffice[0];
          formik.setFieldValue('location.district', postOffice.District);
          formik.setFieldValue('location.state', postOffice.State);
          validateField('location.district', postOffice.District);
          validateField('location.state', postOffice.State);
        } else {
          toast.error("Invalid PIN Code");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        toast.error("Error fetching location data");
      }
    }
  };

  return (
    <div className={`screen ${Styles.addPropertyScreen}`} style={{ backgroundColor: Config.color.secondaryColor200 }}>
      <Header />
      <div className={Styles.card1}>
        <div className={Styles.formContainer}>
          <form onSubmit={formik.handleSubmit}>
            <h2 className={Styles.formTitle}>Add Property</h2>

            <div className={Styles.formGroup}>
              <label htmlFor="userListingType">Property Type</label>
              <select
                id="userListingType"
                name="userListingType"
                {...formik.getFieldProps('userListingType')}
              >
                <option value="Land">Land</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Room">Room</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.userListingType && formik.errors.userListingType ? (
                <div className={Styles.errorMessage}>{formik.errors.userListingType}</div>
              ) : null}
            </div>

            <div className={`${Styles.formGroup}  ${formik.touched.usrListingName && formik.errors.usrListingName ? Styles.hasError : ''}`}>
              <label htmlFor="usrListingName">Listing Name</label>
              <input
                type="text"
                id="usrListingName"
                {...formik.getFieldProps('usrListingName')}
                placeholder="eg. Beautiful Apartment In Mumbai"
              />
              {formik.touched.usrListingName && formik.errors.usrListingName ? (
                <div className={Styles.errorMessage}>{formik.errors.usrListingName}</div>
              ) : null}
            </div>

            <div className={`${Styles.formGroup}  ${formik.touched.usrListingDescription && formik.errors.usrListingDescription ? Styles.hasError : ''}`}>
              <label htmlFor="usrListingDescription">Description</label>
              <textarea
                id="usrListingDescription"
                {...formik.getFieldProps('usrListingDescription')}
                rows="4"
                placeholder="Add an optional description of your property"
              ></textarea>
              {formik.touched.usrListingDescription && formik.errors.usrListingDescription ? (
                <div className={Styles.errorMessage}>{formik.errors.usrListingDescription}</div>
              ) : null}
            </div>

            <div className={`${Styles.formGroup}  ${formik.touched.usrListingSquareFeet && formik.errors.usrListingSquareFeet ? Styles.hasError : ''}`}>
              <label htmlFor="usrListingSquareFeet">Square Feet</label>
              <input
                type="number"
                id="usrListingSquareFeet"
                min="0"
                {...formik.getFieldProps('usrListingSquareFeet')}
              />
              {formik.touched.usrListingSquareFeet && formik.errors.usrListingSquareFeet ? (
                <div className={Styles.errorMessage}>{formik.errors.usrListingSquareFeet}</div>
              ) : null}
            </div>

            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}> 
                <label>Location</label>
                <input
                  type="text"
                  id="street"
                  {...formik.getFieldProps('location.street')}
                  placeholder="Street"
                  className={formik.touched.location?.street && formik.errors.location?.street ? Styles.hasError : ''}
                />
                {formik.touched.location?.street && formik.errors.location?.street ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.street}</div>
                ) : null}
              
                <input
                  type="number"
                  id="pinCode"
                  placeholder="PIN Code"
                  className={`${formik.touched.location?.pinCode && formik.errors.location?.pinCode ? Styles.hasError : ''} ${Styles.pincodeInput}`}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      handlePinCodeChange(e);
                    }
                  }}
                  value={formik.values.location.pinCode || ''}
                />
                {isLoadingPincode && <CircularProgress size={20} className={Styles.pincodeLoader} />}
                {formik.touched.location?.pinCode && formik.errors.location?.pinCode ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.pinCode}</div>
                ) : null}

                <input
                  type="text"
                  id="district"
                  {...formik.getFieldProps('location.district')}
                  placeholder="District"
                  className={formik.touched.location?.district && formik.errors.location?.district ? Styles.hasError : ''}
                  readOnly  // Make district field read-only
                />
                {formik.touched.location?.district && formik.errors.location?.district ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.district}</div>
                ) : null}

                <input
                  type="text"
                  id="city"
                  {...formik.getFieldProps('location.city')}
                  placeholder="City/Town/Village"
                  className={formik.touched.location?.city && formik.errors.location?.city ? Styles.hasError : ''}
                />
                {formik.touched.location?.city && formik.errors.location?.city ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.city}</div>
                ) : null}
              
                <select
                  id="state"
                  {...formik.getFieldProps('location.state')}
                  className={formik.touched.location?.state && formik.errors.location?.state ? Styles.hasError : ''}
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
                {formik.touched.location?.state && formik.errors.location?.state ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.state}</div>
                ) : null}
              </div>
              <div className={Styles.locationGroup}> 
                <label>Map Location</label>
                <LocationPicker 
                    onLocationSelect={(position) => {
                        if (position && position.lat && position.lng) {
                            formik.setFieldValue('location.latitude', position.lat, false);
                            formik.setFieldValue('location.longitude', position.lng, false);
                        }
                    }}
                    initialPosition={
                        formik.values.location.latitude && formik.values.location.longitude
                            ? { 
                                lat: formik.values.location.latitude, 
                                lng: formik.values.location.longitude 
                            }
                            : null
                    }
                />
                {((formik.touched.location?.latitude && formik.errors.location?.latitude) ||
                  (formik.touched.location?.longitude && formik.errors.location?.longitude)) && (
                    <div className={Styles.errorMessage}>Please select a location on the map</div>
                )}
              </div>
            </div>

            <div className={Styles.ageOfPropertyGroup}>
              <div className={`${Styles.formGroup} ${(formik.touched.ageOfProperty || formik.values.ageOfProperty < 0) && formik.errors.ageOfProperty ? Styles.hasError : ''}`}>
                <label htmlFor="ageOfProperty">Age of Property (in years)</label>
                <input
                  type="number"
                  id="ageOfProperty"
                  name="ageOfProperty"
                  min="0"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    formik.setFieldTouched('ageOfProperty', true, true);
                    formik.setFieldValue('ageOfProperty', value);
                    formik.validateField('ageOfProperty');
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.ageOfProperty}
                />
                {((formik.touched.ageOfProperty || formik.values.ageOfProperty < 0) && formik.errors.ageOfProperty) && (
                  <div className={Styles.errorMessage}>
                    {formik.errors.ageOfProperty}
                  </div>
                )}
              </div>
            </div>
            
            <div className={Styles.amenitiesSection}>
              <label>Amenities</label>
              <div className={Styles.selectAllContainer}>
                <input
                  type="checkbox"
                  id="selectAllAmenities"
                  onChange={(e) => {
                    const amenities = ['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 
                      'Swimming Pool', 'Hot Tub', '24/7 Security', 'Wheelchair Accessible', 
                      'Elevator Access', 'Dishwasher', 'Gym/Fitness Center', 'Air Conditioning'];
                    formik.setFieldValue('usrAmenities', e.target.checked ? amenities : []);
                  }}
                  checked={formik.values.usrAmenities.length === 12}
                />
                <label htmlFor="selectAllAmenities" className={Styles.selectAllLabel}>Select All</label>
              </div>

              <div className={Styles.amenitiesGrid}>
                {['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 'Swimming Pool', 'Hot Tub', '24/7 Security', 'Wheelchair Accessible', 'Elevator Access', 'Dishwasher', 'Gym/Fitness Center', 'Air Conditioning'].map((amenity) => (
                  <div className={Styles.amenityItem} key={amenity}>
                    <input
                      type="checkbox"
                      id={`amenity_${amenity}`}
                      name="usrAmenities"
                      value={amenity}
                      checked={formik.values.usrAmenities.includes(amenity)}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor={`amenity_${amenity}`} className={Styles.amenityLabel}>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}>
                <label>Number of (Leave blank if not applicable)</label>
                <div className={Styles.flexRow}>
                  <div className={`${Styles.formGroup} ${(formik.touched.usrExtraFacilities?.beds || formik.values.usrExtraFacilities?.beds < 0) && formik.errors.usrExtraFacilities?.beds ? Styles.hasError : ''}`}>
                    <label htmlFor="beds">Beds</label>
                    <input
                      type="number"
                      id="beds"
                      name="usrExtraFacilities.beds"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        formik.setFieldTouched('usrExtraFacilities.beds', true, true);
                        formik.setFieldValue('usrExtraFacilities.beds', value);
                        formik.validateField('usrExtraFacilities');  // Validate the entire usrExtraFacilities object
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.usrExtraFacilities.beds}
                      disabled={formik.values.userListingType === 'Land'}
                      min="0"
                      max="10"
                    />
                    {(formik.touched.usrExtraFacilities?.beds || formik.values.usrExtraFacilities?.beds < 0) && 
                     formik.errors.usrExtraFacilities?.beds && (
                      <div className={Styles.errorMessage}>
                        {formik.errors.usrExtraFacilities.beds}
                      </div>
                    )}
                  </div>
                  
                  <div className={`${Styles.formGroup} ${(formik.touched.usrExtraFacilities?.bath || formik.values.usrExtraFacilities?.bath < 0) && formik.errors.usrExtraFacilities?.bath ? Styles.hasError : ''}`}>
                    <label htmlFor="baths">Baths</label>
                    <input
                      type="number"
                      id="baths"
                      name="usrExtraFacilities.bath"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        formik.setFieldTouched('usrExtraFacilities.bath', true, true);
                        formik.setFieldValue('usrExtraFacilities.bath', value);
                        formik.validateField('usrExtraFacilities');  // Validate the entire usrExtraFacilities object
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.usrExtraFacilities.bath}
                      disabled={formik.values.userListingType === 'Land'}
                      min="0"
                      max="8"
                    />
                    {(formik.touched.usrExtraFacilities?.bath || formik.values.usrExtraFacilities?.bath < 0) && 
                     formik.errors.usrExtraFacilities?.bath && (
                      <div className={Styles.errorMessage}>
                        {formik.errors.usrExtraFacilities.bath}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={Styles.CHECK}>
              <h3 className={Styles.checkboxTitle}>Property Features</h3>
              <div className={Styles.checkboxGroupGrid}>
                <div className={Styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="commercialZone"
                    {...formik.getFieldProps('commercialZone')}
                    checked={formik.values.commercialZone}
                  />
                  <label htmlFor="commercialZone">Located in Commercial Zone</label>
                </div>
                {formik.touched.commercialZone && formik.errors.commercialZone ? (
                  <div className={Styles.errorMessage}>{formik.errors.commercialZone}</div>
                ) : null}

                <div className={Styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="gatedCommunity"
                    {...formik.getFieldProps('gatedCommunity')}
                    checked={formik.values.gatedCommunity}
                  />
                  <label htmlFor="gatedCommunity">
                    Gated Community
                    <span 
                      className={Styles.infoIcon} 
                      title="A residential community with controlled entrances and surrounded by walls or fences"
                    >
                      ⓘ
                    </span>
                  </label>
                </div>
                {formik.touched.gatedCommunity && formik.errors.gatedCommunity ? (
                  <div className={Styles.errorMessage}>{formik.errors.gatedCommunity}</div>
                ) : null}
              </div>
            </div>

            {formik.values.userListingType === 'Apartment' || formik.values.userListingType === 'House' && (
              <div className={Styles.formGroup}>
                <label htmlFor="floorNumber">Floor Number</label>
                <input
                  type="number"
                  id="floorNumber"
                  {...formik.getFieldProps('floorNumber')}
                  placeholder="Enter the floor number"
                />
                {formik.touched.floorNumber && formik.errors.floorNumber ? (
                  <div className={Styles.errorMessage}>{formik.errors.floorNumber}</div>
                ) : null}
              </div>
            )}

            <div className={Styles.formGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePredictPrice}
                disabled={isPredicting || !areRequiredFieldsFilled()}
                style={{ marginBottom: '1rem' }}
              >
                {isPredicting ? <CircularProgress size={24} /> : 'Predict Price'}
              </Button>
              
              {predictedPrice && (
                <div className={Styles.predictedPrice}>
                  <p>Suggested Price: ₹{predictedPrice.toLocaleString()}</p>
                </div>
              )}

              <label htmlFor="usrPrice">Price</label>
              <input
                type="number"
                id="usrPrice"
                min="0"
                {...formik.getFieldProps('usrPrice')}
                placeholder="Enter the price of the property"
              />
              {formik.touched.usrPrice && formik.errors.usrPrice ? (
                <div className={Styles.errorMessage}>{formik.errors.usrPrice}</div>
              ) : null}
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="userListingImage">Images</label>
              <input
                type="file"
                id="userListingImage"
                name="userListingImage"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            
            <button
              type="submit"
              className={Styles.submitBtn}
              id='submit'
  disabled={!(formik.isValid && formik.dirty)}
            >Add Property</button>
            <p className={Styles.textSmallall}>By adding a property, you agree to our terms and conditions.</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddProperty;