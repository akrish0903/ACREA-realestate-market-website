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

function AddProperty() {
  const authUserDetails = useSelector(data => data.AuthUserDetailsSlice);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);

  const formik = useFormik({
    initialValues: {
      userListingType: "Land",
      usrListingName: "",
      usrListingDescription: "",
      usrListingSquareFeet: 0,
      location: {
        street: "",
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
      userListingImage: [] // This should be an array to hold multiple images
    },
    validationSchema: propertyValidationSchema,
    onSubmit: addPropertyHandler
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
                />
                {formik.touched.location?.street && formik.errors.location?.street ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.street}</div>
                ) : null}
              
                <input
                  type="text"
                  id="city"
                  {...formik.getFieldProps('location.city')}
                  placeholder="City"
                />
                {formik.touched.location?.city && formik.errors.location?.city ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.city}</div>
                ) : null}
              
                <select
                  className={Styles.stateOption}
                  id="state"
                  {...formik.getFieldProps('location.state')}
                >
                  <option value="" disabled>Select State</option>
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
                <input
                  type="number"
                  id="pinCode"
                  {...formik.getFieldProps('location.pinCode')}
                  placeholder="Pin Code"
                />
                {formik.touched.location?.pinCode && formik.errors.location?.pinCode ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.pinCode}</div>
                ) : null}

                </div>
                <div className={Styles.locationGroup}> 
                <label>Map</label>
                <input
                  type="text"
                  id="latitude"
                  {...formik.getFieldProps('location.latitude')}
                  placeholder="Latitude"
                />
                {formik.touched.location?.latitude && formik.errors.location?.latitude ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.latitude}</div>
                ) : null}
                <input
                  type="text"
                  id="longitude"
                  {...formik.getFieldProps('location.longitude')}
                  placeholder="Longitude"
                />
                {formik.touched.location?.longitude && formik.errors.location?.longitude ? (
                  <div className={Styles.errorMessage}>{formik.errors.location.longitude}</div>
                ) : null}
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
                  <div className={`${Styles.formGroup}  ${formik.touched.usrExtraFacilities?.beds && formik.errors.usrExtraFacilities?.beds ? Styles.hasError : ''}`}>
                    <label htmlFor="beds">Beds</label>
                    <input
                      type="number"
                      id="beds"
                      {...formik.getFieldProps('usrExtraFacilities.beds')}
                    />
                  {formik.touched.usrExtraFacilities?.beds && formik.errors.usrExtraFacilities?.beds ? (
                    <div className={Styles.errorMessage}>{formik.errors.usrExtraFacilities.beds}</div>
                  ) : null}
                  </div>
                  <div className={`${Styles.formGroup}  ${formik.touched.usrExtraFacilities?.bath && formik.errors.usrExtraFacilities?.bath ? Styles.hasError : ''}`}>
                    <label htmlFor="baths">Baths</label>
                    <input
                      type="number"
                      id="baths"
                      {...formik.getFieldProps('usrExtraFacilities.bath')}
                    />
              {formik.touched.usrExtraFacilities?.bath && formik.errors.usrExtraFacilities?.bath ? (
                <div className={Styles.errorMessage}>{formik.errors.usrExtraFacilities.bath}</div>
              ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${Styles.formGroup}  ${formik.touched.usrPrice && formik.errors.usrPrice ? Styles.hasError : ''}`}>
              <label htmlFor="usrPrice">Price</label>
              <input
                type="number"
                id="usrPrice"
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