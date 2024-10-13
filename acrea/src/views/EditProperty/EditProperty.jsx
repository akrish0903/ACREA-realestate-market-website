import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/EditProperty.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

function EditProperty() {
  const authUserDetails = useSelector(data => data.AuthUserDetailsSlice);
  const location = useLocation();
  const navigate = useNavigate();
  const propertyId = location.state?.propertyId;
  const propertyData=location.state;
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
      pinCode: propertyData.location.pinCode
    },
    usrAmenities: [...propertyData.usrAmenities],
    usrExtraFacilities: {
      beds: propertyData.usrExtraFacilities.beds,
      bath: propertyData.usrExtraFacilities.bath
    },
    usrPrice: propertyData.usrPrice,
    userListingImage: propertyData.userListingImage
  });

  useEffect(() => {
    if (propertyId) {
      const fetchPropertyDetails = async () => {
        try {
          const response = await axios.get(`${Config.apiBaseUrl}/properties/${propertyId}`, {
            headers: { 'Authorization': `Bearer ${authUserDetails.authToken}` }
          });
          setUsrProperty(response.data);
        } catch (error) {
          console.error("Error fetching property details:", error);
          toast.error("Failed to load property details");
        }
      };
      fetchPropertyDetails();
    }
  }, [propertyId, authUserDetails.authToken]);

  const editPropertyHandler = async (e) => {
    e.preventDefault();
    
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
      const response = await axios.put(`${Config.apiBaseUrl}/edit-property/${propertyId}`, usrProperty, {
        headers: { 'Authorization': `Bearer ${authUserDetails.authToken}` }
      });
      if (response.data.message) {
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error("Error updating property:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update property. Please try again.");
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
            </div>

            {/* Amenities */}
            <div className={Styles.amenitiesSection}>
              <label>Amenities</label>
              <div className={Styles.amenitiesGrid}>
                {['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 'Swimming Pool', 'Hot Tub', '24/7 Security', 'Wheelchair Accessible', 'Elevator Access', 'Dishwasher', 'Gym/Fitness Center', 'Air Conditioning'].map((amenity) => (
                  <div key={amenity}>
                    <input
                      type="checkbox"
                      id={`amenity_${amenity}`}
                      name="amenities"
                      value={amenity}
                      checked={usrProperty.usrAmenities.includes(amenity)}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor={`amenity_${amenity}`}>{amenity}</label>
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

            {/* Submit Button */}
            <div className={Styles.formGroup}>
              <button className={Styles.submitBtn} type="submit">Update Property</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProperty;