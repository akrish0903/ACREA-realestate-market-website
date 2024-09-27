import React from'react'
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import Styles from './css/PropertyPage.module.css';
import './css/PropertyPage.module.css'
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Config } from '../../config/Config';
import { useNavigate } from 'react-router-dom';
// import SquareFoot from '@mui/icons-material/SquareFoot';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';

function PropertyPage() {
  var navigation = useNavigate();

  return (
    <div className={`screen ${Styles.propertyScreen}`}>
      <Header/>
      <SecondHeader/>
      {/* Property Header Image */}
      {/* <div className={Styles.Styles.propertyHeader}>
        <div className={Styles.propertyImageContainer}>
          <img src="/assets/a1.jpg" alt="" className={Styles.propertyImage} />
        </div>
      </div> */}

      {/* Go Back */}
      <div className={Styles.goBackSection}>
        <div className={Styles.goBackContainer}> 
          {/* <a href="./properties.html" className={Styles.goBackLink}> */}
          <a onClick={()=>{navigation("/viewAllProperties")}} style={{color:Config.color.primaryColor800, cursor:'pointer'}}>
          <ArrowBackIcon/> Back to Properties
          </a>
        </div>
      </div>

      {/* Property Info */}
      <div className={Styles.propertyInfo}>
        <div className={Styles.propertyInfoContainer}>
          <main>
            <div className={Styles.propertyDetails}>
            {/* <div className={Styles.optionalAuthCardLeft} style={{backgroundColor:Config.color.background}}> */}
              <div className={Styles.propertyType}>Apartment</div>
              <h1>Boston Commons Retreat</h1>
              <div className={Styles.propertyAddress} style={{color:Config.color.primaryColor800}}>
                <PlaceIcon/>
                <p>120 Tremont Street, Boston, MA 02111</p>
              </div>
            </div>

            <div className={Styles.descriptionSection}>
            {/* <div className={Styles.optionalAuthCardLeft} style={{backgroundColor:Config.color.background}}> */}
              <h3>Description & Details</h3>
              <div className={Styles.propertyDetailsGrid}>
                <p>
                  <HotelIcon/> 3 Beds
                </p>
                <p>
                  <BathtubIcon/> 2 Baths
                </p>
                <p>
                  <SquareFootIcon/> 1,500 sqft
                </p>
              </div>
              <p>This is a beautiful apartment located near the commons.</p>
              <p>
                It is a 2-bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.
              </p>
            </div>

            <div className={Styles.amenitiesSection}>
            {/* <div className={Styles.optionalAuthCardLeft} style={{backgroundColor:Config.color.background}}> */}
              <h3>Amenities</h3>
              <ul className={Styles.amenitiesList}>
                <li><CheckIcon/> Wifi</li>
                <li><CheckIcon/> Full kitchen</li>
                <li><CheckIcon/> Washer & Dryer</li>
                <li><CheckIcon/> Free Parking</li>
                <li><CheckIcon/> Hot Tub</li>
                <li><CheckIcon/> 24/7 Security</li>
                <li><CheckIcon/> Wheelchair Accessible</li>
                <li><CheckIcon/> Elevator Access</li>
                <li><CheckIcon/> Dishwasher</li>
                <li><CheckIcon/> Gym/Fitness Center</li>
                <li><CheckIcon/> Air Conditioning</li>
                <li><CheckIcon/> Balcony/Patio</li>
                <li><CheckIcon/> Smart TV</li>
                <li><CheckIcon/> Coffee Maker</li>
              </ul>
            </div>
          </main>

          {/* Sidebar */}
          <aside className={Styles.sidebar} style={{justifyContent:'left',justifyItems:'end'}}>
            {/* <button className={Styles.favoriteButton}> */}
            <button className={Styles.btn} style={{ color:Config.color.background}} >
              <BookmarkIcon/> Favorite Property
            </button>

            <div className={Styles.contactFormSection}>
            {/* <div className={Styles.optionalAuthCardRight} style={{backgroundColor:Config.color.background}}> */}
              <h3>Contact Property Manager</h3>
              <form>
                <div className={Styles.inputGroup}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className={Styles.inputGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className={Styles.inputGroup}>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className={Styles.inputGroup}>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <center>
                <button type="submit" className={Styles.sendMessageButton}>
                  <SendIcon/> Send Message
                </button>
                </center>
              </form>
            </div>
          </aside>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PropertyPage;


