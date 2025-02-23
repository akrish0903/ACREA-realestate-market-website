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

  const editPropertyHandler = async (e) => {
    e.preventDefault();

    if (!Config.apiBaseUrl) {
      console.error("API base URL is not defined");
      toast.error("Application configuration error. Please contact support.");
      return;
    } else if (!propertyId) {
      console.error("Property ID is not defined");
      toast.error("Property ID is missing. Please try again or contact support.");
      return;
    } else {
      try {
        // toast notification
        const apiCallPromise = new Promise(async (resolve, reject) => {
          const apiResponse = await useApi({
            authRequired: true,
            authToken: authUserDetails.usrAccessToken,
            url: "/edit-property",
            method: "POST",
            data: {
              userId: usrProperty.propertyId,
              userListingType: usrProperty.userListingType,
              usrListingName: usrProperty.usrListingName,
              usrListingDescription: usrProperty.usrListingDescription,
              usrListingSquareFeet: usrProperty.usrListingSquareFeet,
              usrPrice: usrProperty.usrPrice,
              location: {
                street: usrProperty.location.street,
                city: usrProperty.location.city,
                state: usrProperty.location.state,
                pinCode: usrProperty.location.pinCode,
                latitude: usrProperty.location.latitude,
                longitude: usrProperty.location.longitude
              },
              usrAmenities: usrProperty.usrAmenities,
              usrExtraFacilities: {
                beds: usrProperty.usrExtraFacilities.beds,
                bath: usrProperty.usrExtraFacilities.bath
              },
              userListingImage: usrProperty.userListingImage
            },
          });
          if (apiResponse && apiResponse.error) {
            reject(apiResponse.error.message);
          } else {
            resolve(apiResponse);
          }
        });

        // Reset the form upon successful property addition
        await toast.promise(apiCallPromise, {
          pending: "Editing property...!",
          success: {
            render({ data }) {
              // Reset the form values here after successful response
              setTimeout(() => {
                navigate(-2);
                setUsrProperty({
                  userListingType: "Land",
                  usrListingName: "",
                  usrListingDescription: "",
                  usrListingSquareFeet: 0,
                  location: {
                    street: "",
                    city: "",
                    state: "",
                    pinCode: 0
                  },
                  usrAmenities: [],
                  usrExtraFacilities: {
                    beds: 0,
                    bath: 0
                  },
                  usrPrice: 0,
                  userListingImage: ""
                });
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
        console.log("Sign in err ---> ", error);
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

  return (
    <div className={`screen ${Styles.editPropertyScreen}`} style={{ backgroundColor: Config.color.secondaryColor200 }}>
      <Header />
      <div className={Styles.card1}>
        <div className={Styles.formContainer}>
          <form onSubmit={editPropertyHandler}>
            <h2 className={Styles.formTitle}>Edit Property</h2>

            {/* Property Type */}
            <div className={Styles.formGroup}>
              <label htmlFor="userListingType">Property Type</label>
              <select
                id="userListingType"
                name="userListingType"
                value={usrProperty.userListingType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Land">Land</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Room">Room</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Listing Name */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingName">Listing Name</label>
              <input
                type="text"
                id="usrListingName"
                name="usrListingName"
                placeholder="e.g. Beautiful Apartment In Mumbai"
                value={usrProperty.usrListingName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingDescription">Description</label>
              <textarea
                id="usrListingDescription"
                name="usrListingDescription"
                rows="4"
                placeholder="Write a description of your property"
                value={usrProperty.usrListingDescription}
                onChange={handleInputChange}
              />
            </div>

            {/* Square Feet */}
            <div className={Styles.formGroup}>
              <label htmlFor="usrListingSquareFeet">Square Feet</label>
              <input
                type="number"
                id="usrListingSquareFeet"
                name="usrListingSquareFeet"
                placeholder="Enter size in square feet"
                value={usrProperty.usrListingSquareFeet}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Location */}
            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}>
                <label>Location</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={usrProperty.location.street}
                  onChange={handleLocationChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={usrProperty.location.city}
                  onChange={handleLocationChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={usrProperty.location.state}
                  onChange={handleLocationChange}
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={usrProperty.location.pinCode}
                  onChange={handleLocationChange}
                />
              </div>
              
              {/* Add Map Location Fields */}
              <div className={Styles.locationGroup}>
                <label>Map</label>
                <input
                  type="text"
                  name="latitude"
                  id="latitude"
                  placeholder="Latitude"
                  value={usrProperty.location.latitude}
                  onChange={handleLocationChange}
                />
                <input
                  type="text"
                  name="longitude"
                  id="longitude"
                  placeholder="Longitude"
                  value={usrProperty.location.longitude}
                  onChange={handleLocationChange}
                />
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
                      value={usrProperty.usrExtraFacilities.beds}
                      onChange={handleExtraFacilitiesChange}
                    />
                  </div>
                  <div className={Styles.formGroup}>
                    <label htmlFor="bath">Baths</label>
                    <input
                      type="number"
                      id="bath"
                      name="bath"
                      value={usrProperty.usrExtraFacilities.bath}
                      onChange={handleExtraFacilitiesChange}
                    />
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
                name="usrPrice"
                placeholder="Price"
                value={usrProperty.usrPrice}
                onChange={handleInputChange}
                required
              />
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
              <button id="submit" className={Styles.submitBtn} type="submit">Update Property</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProperty;