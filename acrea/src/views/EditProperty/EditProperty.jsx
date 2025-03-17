import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/EditProperty.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useApi from '../../utils/useApi';
import { useFormik } from 'formik';
import propertyValidationSchema from '../../utils/propertyValidationSchema';
import { Button, CircularProgress } from '@mui/material';
import LocationPicker from '../../components/LocationPicker';

function EditProperty() {
  const authUserDetails = useSelector(data => data.AuthUserDetailsSlice);

  const location = useLocation();
  const navigate = useNavigate();
  const propertyId = location.state?._id;
  const propertyData = location.state;
  const [usrProperty, setUsrProperty] = useState({
    propertyId: propertyData._id,
    userListingType: propertyData.userListingType,
    usrListingName: propertyData.usrListingName,
    usrListingDescription: propertyData.usrListingDescription,
    usrListingSquareFeet: propertyData.usrListingSquareFeet,
    location: {
      street: propertyData.location.street,
      city: propertyData.location.city,
      state: propertyData.location.state,
      pinCode: propertyData.location.pinCode,
      latitude: propertyData.location.latitude,
      longitude: propertyData.location.longitude
    },
    usrAmenities: [...propertyData.usrAmenities],
    usrExtraFacilities: {
      beds: propertyData.usrExtraFacilities.beds,
      bath: propertyData.usrExtraFacilities.bath
    },
    usrPrice: propertyData.usrPrice,
    userListingImage: propertyData.userListingImage
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);

  // Move editPropertyHandler before formik initialization
  const editPropertyHandler = async (values) => {
    if (!Config.apiBaseUrl) {
      console.error("API base URL is not defined");
      toast.error("Application configuration error. Please contact support.");
      return;
    }
    
    if (!propertyId) {
      console.error("Property ID is not defined");
      toast.error("Property ID is missing. Please try again or contact support.");
      return;
    }

    try {
      const apiCallPromise = new Promise(async (resolve, reject) => {
        const apiResponse = await useApi({
          authRequired: true,
          authToken: authUserDetails.usrAccessToken,
          url: "/edit-property",
          method: "POST",
          data: {
            userId: values.propertyId,
            userListingType: values.userListingType,
            usrListingName: values.usrListingName,
            usrListingDescription: values.usrListingDescription,
            usrListingSquareFeet: values.usrListingSquareFeet,
            usrPrice: values.usrPrice,
            location: values.location,
            usrAmenities: values.usrAmenities,
            usrExtraFacilities: values.usrExtraFacilities,
            userListingImage: imageUrls.length > 0 ? imageUrls : values.userListingImage,
            ageOfProperty: values.ageOfProperty,
            commercialZone: values.commercialZone,
            gatedCommunity: values.gatedCommunity,
            floorNumber: values.floorNumber
          },
        });
        
        if (apiResponse && apiResponse.error) {
          reject(apiResponse.error.message);
        } else {
          resolve(apiResponse);
        }
      });

      await toast.promise(apiCallPromise, {
        pending: "Editing property...",
        success: {
          render({ data }) {
            setTimeout(() => {
              navigate(-2);
            }, 1000);
            return data.message || "Property edited successfully!";
          },
        },
        error: {
          render({ data }) {
            return data;
          },
        },
      }, {
        position: 'bottom-right',
      });

    } catch (error) {
      console.error("Edit property error:", error);
      toast.error(error.message || "Failed to edit property");
    }
  };

  const formik = useFormik({
    initialValues: {
      propertyId: propertyData._id,
      userListingType: propertyData.userListingType,
      usrListingName: propertyData.usrListingName,
      usrListingDescription: propertyData.usrListingDescription,
      usrListingSquareFeet: propertyData.usrListingSquareFeet,
      location: {
        street: propertyData.location.street,
        district: propertyData.location.district || '',
        city: propertyData.location.city,
        state: propertyData.location.state,
        pinCode: propertyData.location.pinCode,
        latitude: propertyData.location.latitude,
        longitude: propertyData.location.longitude
      },
      usrAmenities: [...propertyData.usrAmenities],
      usrExtraFacilities: {
        beds: propertyData.usrExtraFacilities.beds,
        bath: propertyData.usrExtraFacilities.bath
      },
      usrPrice: propertyData.usrPrice,
      userListingImage: propertyData.userListingImage,
      ageOfProperty: propertyData.ageOfProperty || 0,
      commercialZone: propertyData.commercialZone || false,
      gatedCommunity: propertyData.gatedCommunity || false,
      floorNumber: propertyData.floorNumber || 0
    },
    validationSchema: propertyValidationSchema,
    onSubmit: editPropertyHandler,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Add validation function
  async function validateField(name, value) {
    try {
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

  const handlePinCodeChange = async (e) => {
    const pincode = e.target.value;
    formik.setFieldValue('location.pinCode', pincode);

    if (pincode.length === 6) {
      setIsLoadingPincode(true);
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
      } finally {
        setIsLoadingPincode(false);
      }
    }
  };

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setUsrProperty((prevState) => {
      const updatedAmenities = checked
        ? [...prevState.usrAmenities, value]
        : prevState.usrAmenities.filter(amenity => amenity !== value);
      return { ...prevState, usrAmenities: updatedAmenities };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsrProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setUsrProperty(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value
      }
    }));
  };

  const handleExtraFacilitiesChange = (e) => {
    const { name, value } = e.target;
    setUsrProperty(prevState => ({
      ...prevState,
      usrExtraFacilities: {
        ...prevState.usrExtraFacilities,
        [name]: value
      }
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
        formData.append("userListingImage", file);
    });

    try {
        const response = await fetch(`${Config.apiBaseUrl}/upload-photos`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authUserDetails.usrAccessToken}`,
            },
            body: formData,
        });

        const data = await response.json();
        if (data.imageUrls) {
            setImageUrls(data.imageUrls);
            setUsrProperty(prevState => ({ ...prevState, userListingImage: data.imageUrls }));
            toast.success("Images uploaded successfully!");
        } else {
            toast.error("Failed to upload images");
        }
    } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Error uploading images");
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

  return (
    <div className={`screen ${Styles.editPropertyScreen}`} style={{ backgroundColor: Config.color.secondaryColor200 }}>
      <Header />
      <div className={Styles.card1}>
        <div className={Styles.formContainer}>
          <form onSubmit={formik.handleSubmit}>
            <h2 className={Styles.formTitle}>Edit Property</h2>

            {/* Property Type */}
            <div className={Styles.formGroup}>
              <label htmlFor="userListingType">Property Type</label>
              <select
                id="userListingType"
                name="userListingType"
                value={formik.values.userListingType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="">Select Type</option>
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

            {/* Listing Name */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingName">Listing Name</label>
              <input
                type="text"
                id="usrListingName"
                name="usrListingName"
                placeholder="e.g. Beautiful Apartment In Mumbai"
                value={formik.values.usrListingName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.usrListingName && formik.errors.usrListingName ? (
                <div className={Styles.errorMessage}>{formik.errors.usrListingName}</div>
              ) : null}
            </div>

            {/* Description */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingDescription">Description</label>
              <textarea
                id="usrListingDescription"
                name="usrListingDescription"
                rows="4"
                placeholder="Write a description of your property"
                value={formik.values.usrListingDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.usrListingDescription && formik.errors.usrListingDescription ? (
                <div className={Styles.errorMessage}>{formik.errors.usrListingDescription}</div>
              ) : null}
            </div>

            {/* Square Feet */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingSquareFeet">Square Feet</label>
              <input
                type="number"
                id="usrListingSquareFeet"
                name="usrListingSquareFeet"
                placeholder="Enter size in square feet"
                value={formik.values.usrListingSquareFeet}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.usrListingSquareFeet && formik.errors.usrListingSquareFeet ? (
                <div className={Styles.errorMessage}>{formik.errors.usrListingSquareFeet}</div>
              ) : null}
            </div>

            {/* Location */}
            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}>
                <label>Location</label>
                <input
                  type="text"
                  name="location.street"
                  placeholder="Street"
                  value={formik.values.location.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.location?.street && formik.errors.location?.street ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.street}</div>
                ) : null}

                <input
                  type="number"
                  name="location.pinCode"
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
                  name="location.district"
                  placeholder="District"
                  className={formik.touched.location?.district && formik.errors.location?.district ? Styles.hasError : ''}
                  value={formik.values.location.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly
                />
                {formik.touched.location?.district && formik.errors.location?.district ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.district}</div>
                ) : null}

                <input
                  type="text"
                  name="location.city"
                  placeholder="City/Town/Village"
                  value={formik.values.location.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.location?.city && formik.errors.location?.city ? Styles.hasError : ''}
                />
                {formik.touched.location?.city && formik.errors.location?.city ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.city}</div>
                ) : null}

                <select
                  name="location.state"
                  value={formik.values.location.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              
              {/* Map Location Fields */}
              <div className={Styles.locationGroup}>
                <label>Map Location</label>
                <LocationPicker 
                  onLocationSelect={(position) => {
                    if (position && position.lat && position.lng) {
                      formik.setFieldValue('location.latitude', position.lat);
                      formik.setFieldValue('location.longitude', position.lng);
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

              <div className={Styles.ageOfPropertyGroup}>
              <div className={`${Styles.formGroup} ${formik.touched.ageOfProperty && formik.errors.ageOfProperty ? Styles.hasError : ''}`}>
                <label htmlFor="ageOfProperty">Age of Property (in years)</label>
                <input
                  type="number"
                  id="ageOfProperty"
                  {...formik.getFieldProps('ageOfProperty')}
                  min="0"
                />
                {formik.touched.ageOfProperty && formik.errors.ageOfProperty ? (
                  <div className={Styles.errorMessage}>{formik.errors.ageOfProperty}</div>
                ) : null}
              </div>
            </div>

            </div>

            {/* Amenities */}
            <div className={Styles.amenitiesSection}>
              <label>Amenities</label>
              <div className={Styles.selectAllContainer}>
                <input
                  type="checkbox"
                  id="selectAllAmenities"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setUsrProperty((prevState) => ({
                        ...prevState,
                        usrAmenities: [
                          'Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 
                          'Swimming Pool', 'Hot Tub', '24/7 Security', 'Wheelchair Accessible', 
                          'Elevator Access', 'Dishwasher', 'Gym/Fitness Center', 'Air Conditioning'
                        ]
                      }));
                    } else {
                      setUsrProperty((prevState) => ({
                        ...prevState,
                        usrAmenities: []
                      }));
                    }
                  }}
                  checked={usrProperty.usrAmenities.length === 12}
                />
                <label htmlFor="selectAllAmenities" className={Styles.selectAllLabel}>Select All</label>
              </div>

              {/* Individual Amenities Checkboxes */}
              <div className={Styles.amenitiesGrid}>
                {['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 'Swimming Pool', 'Hot Tub', '24/7 Security', 'Wheelchair Accessible', 'Elevator Access', 'Dishwasher', 'Gym/Fitness Center', 'Air Conditioning'].map((amenity) => (
                  <div className={Styles.amenityItem} key={amenity}>
                    <input
                      type="checkbox"
                      id={`amenity_${amenity}`}
                      name="amenities"
                      value={amenity}
                      checked={usrProperty.usrAmenities.includes(amenity)}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor={`amenity_${amenity}`} className={Styles.amenityLabel}>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>


            {/* Extra Facilities */}
            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}>
                <label>Number of (Leave blank if not applicable)</label>
                <div className={Styles.flexRow}>
                  <div className={Styles.formGroup}>
                    <label htmlFor="beds">Beds</label>
                    <input
                      type="number"
                      id="beds"
                      name="beds"
                      value={formik.values.usrExtraFacilities.beds}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.usrExtraFacilities && formik.errors.usrExtraFacilities && formik.errors.usrExtraFacilities.beds ? (
                      <div className={Styles.errorMessage}>{formik.errors.usrExtraFacilities.beds}</div>
                    ) : null}
                  </div>
                  <div className={Styles.formGroup}>
                    <label htmlFor="bath">Baths</label>
                    <input
                      type="number"
                      id="bath"
                      name="bath"
                      value={formik.values.usrExtraFacilities.bath}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.usrExtraFacilities && formik.errors.usrExtraFacilities && formik.errors.usrExtraFacilities.bath ? (
                      <div className={Styles.errorMessage}>{formik.errors.usrExtraFacilities.bath}</div>
                    ) : null}
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

                <div className={Styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="gatedCommunity"
                    {...formik.getFieldProps('gatedCommunity')}
                    checked={formik.values.gatedCommunity}
                  />
                  <label htmlFor="gatedCommunity">
                    Gated Community
                    <span className={Styles.infoIcon} title="A residential community with controlled entrances and surrounded by walls or fences">
                      ⓘ
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Prediction Button */}
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
            </div>

            {/* Price */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrPrice">Price</label>
              <input
                type="number"
                id="usrPrice"
                name="usrPrice"
                placeholder="Price"
                value={formik.values.usrPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
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

            {/* Submit Button */}
            <div className={Styles.formGroup}>
              <button
                type="submit"
                className={Styles.submitBtn}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Update Property
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProperty;