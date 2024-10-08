import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/EditProperty.module.css"
import { useLocation } from 'react-router-dom';
import { Config } from '../../config/Config';
import { toast } from 'react-toastify';
import useApi from '../../utils/useApi';
import { useSelector } from 'react-redux';


function EditProperty() {
  var authUserDetails = useSelector(data => data.AuthUserDetailsSlice);
  const location = useLocation(); // Assuming property ID is passed via location.state
  const propertyId = location.state?.propertyId;

  return (
    <div className={`screen ${Styles.editPropertyScreen}`} style={{ backgroundColor: Config.color.secondaryColor200 }}>
      <Header />
      <div className={Styles.card1}>
        <div className={Styles.formContainer}>
          <form>
            <h2 className={Styles.formTitle}>Edit Property</h2>

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
                <input type="text"
                  id="state" name="location.state"
                  placeholder="State"
                  required
                  value={usrProperty.location.state}
                  onChange={(e) => { setUsrProperty({ ...usrProperty, location: { ...usrProperty.location, state: e.target.value } }) }}
                />
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
              <div className={Styles.amenitiesGrid}>
                <div>
                  <input type="checkbox"
                    id="amenity_wifi" name="amenities" value="Wifi"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_wifi">Wifi</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_kitchen" name="amenities" value="Full Kitchen"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_kitchen">Full Kitchen</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_washer_dryer" name="amenities" value="Washer & Dryer"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_free_parking" name="amenities" value="Free Parking"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_free_parking">Free Parking</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_pool" name="amenities" value="Swimming Pool"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_pool">Swimming Pool</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_hot_tub" name="amenities" value="Hot Tub"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_hot_tub">Hot Tub</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_24_7_security" name="amenities" value="24/7 Security"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_24_7_security">24/7 Security</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_wheelchair_accessible" name="amenities" value="Wheelchair Accessible"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_wheelchair_accessible">Wheelchair Accessible</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_elevator_access" name="amenities" value="Elevator Access"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_elevator_access">Elevator Access</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_dishwasher" name="amenities" value="Dishwasher"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_dishwasher">Dishwasher</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_gym_fitness_center" name="amenities" value="Gym/Fitness Center"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
                  />
                  <label htmlFor="amenity_gym_fitness_center">Gym/Fitness Center</label>
                </div>
                <div>
                  <input type="checkbox"
                    id="amenity_air_conditioning" name="amenities" value="Air Conditioning"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: [...usrProperty.usrAmenities, e.target.value]
                        })
                      } else {
                        setUsrProperty({
                          ...usrProperty,
                          usrAmenities: usrProperty.usrAmenities.filter(amenity => amenity !== e.target.value)
                        });
                      }
                    }}
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
              onClick={(e) => { editPropertyHandler(e) }}
            >Update Property</button>
            <p className={Styles.textSmallall}>By updating a property, you agree to our terms and conditions.</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProperty;
