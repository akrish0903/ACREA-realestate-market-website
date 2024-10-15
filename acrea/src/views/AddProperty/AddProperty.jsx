import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/AddProperty.module.css"
import { useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import { toast } from 'react-toastify';
import useApi from '../../utils/useApi';
import { useSelector } from 'react-redux';
// import { propertyValidationSchema } from '../../utils/propertyValidationSchema';


function AddProperty() {
  var authUserDetails = useSelector(data => data.AuthUserDetailsSlice)
  const navigate = useNavigate();

  var [usrProperty, setUsrProperty] = useState({
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
  })

  async function addPropertyHandler(e) {
    e.preventDefault();
    
    const apiCallPromise = new Promise(async (resolve, reject) => {
      const apiResponse = await useApi({
        url: "/add-properties",
        authRequired: true,
        method: "POST",
        authToken: authUserDetails.usrAccessToken,
        data: {
          userListingType: usrProperty.userListingType,
          usrListingName: usrProperty.usrListingName,
          usrListingDescription: usrProperty.usrListingDescription,
          usrListingSquareFeet: usrProperty.usrListingSquareFeet,
          usrPrice: usrProperty.usrPrice,
          location: {
            street: usrProperty.location.street,
            city: usrProperty.location.city,
            state: usrProperty.location.state,
            pinCode: usrProperty.location.pinCode
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
      pending: "Adding new property...!",
      success: {
        render({ data }) {
          // Reset the form values here after successful response
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
          navigate(-1);
          return data.message || "Property added successfully!";
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
  
  function handleAmenityChange(e) {
    const { value, checked } = e.target;
    
    if (checked) {
      setUsrProperty({
        ...usrProperty,
        usrAmenities: [...usrProperty.usrAmenities, value],
      });
    } else {
      setUsrProperty({
        ...usrProperty,
        usrAmenities: usrProperty.usrAmenities.filter((amenity) => amenity !== value),
      });
    }
  }
  


  return (
    <div className={`screen ${Styles.addPropertyScreen}`} style={{ backgroundColor: Config.color.secondaryColor200 }}>
      <Header />
      <div className={Styles.card1}>
        <div className={Styles.formContainer}>
          <form>
            <h2 className={Styles.formTitle}>Add Property</h2>

            <div className={Styles.formGroup}>
              <label htmlFor="type">Property Type</label>
              <div className={Styles.formGroup}>
                <select
                  id="type" name="type"
                  value={usrProperty.userListingType}
                  onChange={(e) => setUsrProperty({ ...usrProperty, userListingType: e.target.value })}
                  required>
                  <option value="Land">Land</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Room">Room</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="name">Listing Name</label>
              <input type="text"
                id="name" name="name"
                placeholder="eg. Beautiful Apartment In Mumbai"
                value={usrProperty.usrListingName}
                onChange={(e) => setUsrProperty({ ...usrProperty, usrListingName: e.target.value })}
                required />
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description" name="description"
                rows="4"
                placeholder="Add an optional description of your property"
                value={usrProperty.usrListingDescription}
                onChange={(e) => setUsrProperty({ ...usrProperty, usrListingDescription: e.target.value })}
              ></textarea>
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="square_feet">Square Feet</label>
              <input type="number"
                id="square_feet" name="square_feet"
                value={usrProperty.usrListingSquareFeet}
                onChange={(e) => setUsrProperty({ ...usrProperty, usrListingSquareFeet: e.target.value })}
                required />
            </div>

            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}>
                <label>Location</label>
                <input type="text"
                  id="street" name="location.street"
                  placeholder="Street"
                  value={usrProperty.location.street}
                  onChange={(e) => { setUsrProperty({ ...usrProperty, location: { ...usrProperty.location, street: e.target.value } }) }}
                />
                <input type="text"
                  id="city" name="location.city"
                  placeholder="City"
                  required
                  value={usrProperty.location.city}
                  onChange={(e) => { setUsrProperty({ ...usrProperty, location: { ...usrProperty.location, city: e.target.value } }) }}
                />
                <select className={Styles.stateOption}
                  id="state" name="location.state"
                  value={usrProperty.location.state}
                  onChange={(e) => { setUsrProperty({ ...usrProperty, location: { ...usrProperty.location, state: e.target.value } }) }}
                  required
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

                <input type="number"
                  id="zipcode" name="location.zipcode"
                  placeholder="Zipcode"
                  value={usrProperty.location.pinCode}
                  onChange={(e) => { setUsrProperty({ ...usrProperty, location: { ...usrProperty.location, pinCode: e.target.value } }) }}
                />
              </div>
            </div>

            <div className={Styles.amenitiesSection}>
  <label htmlFor="amenities">Amenities</label>
  <div>
    <input
      type="checkbox"
      id="select_all_amenities"
      onChange={(e) => {
        if (e.target.checked) {
          setUsrProperty({
            ...usrProperty,
            usrAmenities: [
              "Wifi", "Full Kitchen", "Washer & Dryer", "Free Parking", 
              "Swimming Pool", "Hot Tub", "24/7 Security", "Wheelchair Accessible", 
              "Elevator Access", "Dishwasher", "Gym/Fitness Center", "Air Conditioning"
            ]
          });
        } else {
          setUsrProperty({ ...usrProperty, usrAmenities: [] });
        }
      }}
      checked={usrProperty.usrAmenities.length === 12}
    />
    <label htmlFor="select_all_amenities">Select All</label>
  </div>
  <div className={Styles.amenitiesGrid}>
    <div>
      <input
        type="checkbox"
        id="amenity_wifi"
        name="amenities"
        value="Wifi"
        checked={usrProperty.usrAmenities.includes("Wifi")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_wifi">Wifi</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_kitchen"
        name="amenities"
        value="Full Kitchen"
        checked={usrProperty.usrAmenities.includes("Full Kitchen")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_kitchen">Full Kitchen</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_washer_dryer"
        name="amenities"
        value="Washer & Dryer"
        checked={usrProperty.usrAmenities.includes("Washer & Dryer")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_free_parking"
        name="amenities"
        value="Free Parking"
        checked={usrProperty.usrAmenities.includes("Free Parking")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_free_parking">Free Parking</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_pool"
        name="amenities"
        value="Swimming Pool"
        checked={usrProperty.usrAmenities.includes("Swimming Pool")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_pool">Swimming Pool</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_hot_tub"
        name="amenities"
        value="Hot Tub"
        checked={usrProperty.usrAmenities.includes("Hot Tub")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_hot_tub">Hot Tub</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_24_7_security"
        name="amenities"
        value="24/7 Security"
        checked={usrProperty.usrAmenities.includes("24/7 Security")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_24_7_security">24/7 Security</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_wheelchair_accessible"
        name="amenities"
        value="Wheelchair Accessible"
        checked={usrProperty.usrAmenities.includes("Wheelchair Accessible")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_wheelchair_accessible">Wheelchair Accessible</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_elevator_access"
        name="amenities"
        value="Elevator Access"
        checked={usrProperty.usrAmenities.includes("Elevator Access")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_elevator_access">Elevator Access</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_dishwasher"
        name="amenities"
        value="Dishwasher"
        checked={usrProperty.usrAmenities.includes("Dishwasher")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_dishwasher">Dishwasher</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_gym_fitness_center"
        name="amenities"
        value="Gym/Fitness Center"
        checked={usrProperty.usrAmenities.includes("Gym/Fitness Center")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_gym_fitness_center">Gym/Fitness Center</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="amenity_air_conditioning"
        name="amenities"
        value="Air Conditioning"
        checked={usrProperty.usrAmenities.includes("Air Conditioning")}
        onChange={(e) => handleAmenityChange(e)}
      />
      <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
    </div>
  </div>
</div>


            <div className={Styles.formGroup}>
              <div className={Styles.locationGroup}>
                <label>Number of (Leave blank if not applicable)</label>
                <div className={Styles.flexRow}>
                  <div className={Styles.formGroup}>
                    <label htmlFor="beds">Beds</label>
                    <input type="number" id="beds" name="beds"
                      value={usrProperty.usrExtraFacilities.beds}
                      onChange={(e) => { setUsrProperty({ ...usrProperty, usrExtraFacilities: { ...usrProperty.usrExtraFacilities, beds: e.target.value } }) }}
                    />
                  </div>
                  <div className={Styles.formGroup}>
                    <label htmlFor="baths">Baths</label>
                    <input type="number" id="baths" name="baths"
                      value={usrProperty.usrExtraFacilities.bath}
                      onChange={(e) => { setUsrProperty({ ...usrProperty, usrExtraFacilities: { ...usrProperty.usrExtraFacilities, bath: e.target.value } }) }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input  type="number" 
                id="price" name="price" 
                placeholder="Enter the price of the property" 
                value={usrProperty.usrPrice || ''} 
                onChange={(e) => setUsrProperty({ ...usrProperty, usrPrice: e.target.value })} 
                required 
              />
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="image">Images</label>
              <br/>
              <input type="text" id="image" name="image"
                value={usrProperty.userListingImage}
                onChange={(e) => setUsrProperty({ ...usrProperty, userListingImage: e.target.value })} />
            </div>
            
            <button
              type="submit"
              className={Styles.submitBtn}
              onClick={(e) => { addPropertyHandler(e) }}
            >Add Property</button>
            <p className={Styles.textSmallall}>By adding a property, you agree to our terms and conditions.</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProperty;