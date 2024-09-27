import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/AddProperty.module.css"
import { useLocation } from 'react-router-dom';
import { Config } from '../../config/Config';


function AddProperty (){
  return (
    <div className={`screen ${Styles.addPropertyScreen}`} style={{backgroundColor: Config.color.secondaryColor200}}>
      <Header/>
      <div className={Styles.card1}>      
         <div className={Styles.formContainer}>
          <form>
            <h2 className={Styles.formTitle}>Add Property</h2>
            <div className={Styles.formGroup}>
              <label htmlFor="type">Property Type</label>
              <div className={Styles.formGroup}>
              <select id="type" name="type" required>
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
              <input type="text" id="name" name="name" placeholder="eg. Beautiful Apartment In Mumbai" required />
            </div>
            <div className={Styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="4" placeholder="Add an optional description of your property"></textarea>
            </div>
            <div className={Styles.formGroup}>
              <label htmlFor="square_feet">Square Feet</label>
              <input type="number" id="square_feet" name="square_feet" required />
            </div>
            <div className={Styles.formGroup}>
              <div  className={Styles.locationGroup }>
              <label>Location</label>
              <input type="text" id="street" name="location.street" placeholder="Street" />
              <input type="text" id="city" name="location.city" placeholder="City" required />
              <input type="text" id="state" name="location.state" placeholder="State" required />
              <input type="text" id="zipcode" name="location.zipcode" placeholder="Zipcode" />
              </div>
            </div>

            <div className={Styles.amenitiesSection}>
              <label htmlFor="amenities">Amenities</label>
              <div className={Styles.amenitiesGrid}>
                <div>
                  <input type="checkbox" id="amenity_wifi" name="amenities" value="Wifi" />
                  <label htmlFor="amenity_wifi">Wifi</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_kitchen" name="amenities" value="Full Kitchen" />
                  <label htmlFor="amenity_kitchen">Full Kitchen</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_washer_dryer" name="amenities" value="Washer & Dryer" />
                  <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_free_parking" name="amenities" value="Free Parking" />
                  <label htmlFor="amenity_free_parking">Free Parking</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_pool" name="amenities" value="Swimming Pool" />
                  <label htmlFor="amenity_pool">Swimming Pool</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_hot_tub" name="amenities" value="Hot Tub" />
                  <label htmlFor="amenity_hot_tub">Hot Tub</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_24_7_security" name="amenities" value="24/7 Security" />
                  <label htmlFor="amenity_24_7_security">24/7 Security</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_wheelchair_accessible" name="amenities" value="Wheelchair Accessible" />
                  <label htmlFor="amenity_wheelchair_accessible">Wheelchair Accessible</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_elevator_access" name="amenities" value="Elevator Access" />
                  <label htmlFor="amenity_elevator_access">Elevator Access</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_dishwasher" name="amenities" value="Dishwasher" />
                  <label htmlFor="amenity_dishwasher">Dishwasher</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_gym_fitness_center" name="amenities" value="Gym/Fitness Center" />
                  <label htmlFor="amenity_gym_fitness_center">Gym/Fitness Center</label>
                </div>
                <div>
                  <input type="checkbox" id="amenity_air_conditioning" name="amenities" value="Air Conditioning" />
                  <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
                </div>
              </div>
            </div>
            <div className={Styles.formGroup}>
              <div  className={Styles.locationGroup }>
                <label>Number of (Leave blank if not applicable)</label>
                <div className={Styles.flexRow}>
                  <div className={Styles.formGroup}>
                    <label htmlFor="beds">Beds</label>
                     <input type="number" id="beds" name="beds" />
                  </div>
                  <div className={Styles.formGroup}>
                     <label htmlFor="baths">Baths</label>
                     <input type="number" id="baths" name="baths" />
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.formFooter}>
              <label htmlFor="image">Images</label>
              <input type="file" id="image" name="image" />
            </div>
            <button type="submit" className={Styles.submitBtn}>Add Property</button>
            <p className={Styles.textSmallall}>By adding a property, you agree to our terms and conditions.</p>
          </form>
          </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AddProperty;