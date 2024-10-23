import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/EditProperty.module.css";
import { Config } from '../../config/Config';
import useApi from '../../utils/useApi';
import propertyValidationSchema from '../../utils/propertyValidationSchema';

function EditProperty() {
  const authUserDetails = useSelector(data => data.AuthUserDetailsSlice);
  const location = useLocation();
  const navigate = useNavigate();
  const propertyData = location.state;

  const formik = useFormik({
    initialValues: {
      propertyId: propertyData._id,
      userListingType: propertyData.userListingType,
      usrListingName: propertyData.usrListingName,
      usrListingDescription: propertyData.usrListingDescription,
      usrListingSquareFeet: propertyData.usrListingSquareFeet,
      location: {
        street: propertyData.location.street,
        city: propertyData.location.city,
        state: propertyData.location.state,
        pinCode: propertyData.location.pinCode
      },
      usrAmenities: [...propertyData.usrAmenities],
      usrExtraFacilities: {
        beds: propertyData.usrExtraFacilities.beds,
        bath: propertyData.usrExtraFacilities.bath
      },
      usrPrice: propertyData.usrPrice,
      userListingImage: propertyData.userListingImage
    },
    validationSchema: propertyValidationSchema,
    onSubmit: editPropertyHandler
  });

  async function editPropertyHandler(values) {
    const apiCallPromise = new Promise(async (resolve, reject) => {
      const apiResponse = await useApi({
        url: "/edit-property",
        authRequired: true,
        method: "POST",
        authToken: authUserDetails.usrAccessToken,
        data: values,
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

            {/* Listing Name */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingName">Listing Name</label>
              <input
                type="text"
                id="usrListingName"
                {...formik.getFieldProps('usrListingName')}
                placeholder="e.g. Beautiful Apartment In Mumbai"
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
                {...formik.getFieldProps('usrListingDescription')}
                rows="4"
                placeholder="Write a description of your property"
              ></textarea>
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
                {...formik.getFieldProps('usrListingSquareFeet')}
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
                
                <input
                  type="text"
                  id="state"
                  {...formik.getFieldProps('location.state')}
                  placeholder="State"
                />
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
                      formik.setFieldValue('usrAmenities', [
                        'Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 
                        'Swimming Pool', 'Hot Tub', '24/7 Security', 'Wheelchair Accessible', 
                        'Elevator Access', 'Dishwasher', 'Gym/Fitness Center', 'Air Conditioning'
                      ]);
                    } else {
                      formik.setFieldValue('usrAmenities', []);
                    }
                  }}
                  checked={formik.values.usrAmenities.length === 12}
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
                      checked={formik.values.usrAmenities.includes(amenity)}
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
                      {...formik.getFieldProps('usrExtraFacilities.beds')}
                    />
                    {formik.touched.usrExtraFacilities?.beds && formik.errors.usrExtraFacilities?.beds ? (
                      <div className={Styles.errorMessage}>{formik.errors.usrExtraFacilities.beds}</div>
                    ) : null}
                  </div>
                  <div className={Styles.formGroup}>
                    <label htmlFor="bath">Baths</label>
                    <input
                      type="number"
                      id="bath"
                      {...formik.getFieldProps('usrExtraFacilities.bath')}
                    />
                    {formik.touched.usrExtraFacilities?.bath && formik.errors.usrExtraFacilities?.bath ? (
                      <div className={Styles.errorMessage}>{formik.errors.usrExtraFacilities.bath}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrPrice">Price</label>
              <input
                type="number"
                id="usrPrice"
                {...formik.getFieldProps('usrPrice')}
                placeholder="Price"
              />
              {formik.touched.usrPrice && formik.errors.usrPrice ? (
                <div className={Styles.errorMessage}>{formik.errors.usrPrice}</div>
              ) : null}
            </div>

            {/* Images */}
            <div className={Styles.formGroup}>
              <label htmlFor="userListingImage">Images</label>
              <input
                type="text"
                id="userListingImage"
                {...formik.getFieldProps('userListingImage')}
              />
              {formik.touched.userListingImage && formik.errors.userListingImage ? (
                <div className={Styles.errorMessage}>{formik.errors.userListingImage}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div className={Styles.formGroup}>
              <button
                className={Styles.submitBtn}
                type="submit"
                id='submit'
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
