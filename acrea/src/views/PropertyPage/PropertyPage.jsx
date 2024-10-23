import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import Styles from './css/PropertyPage.module.css';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Config } from '../../config/Config';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import useApi from '../../utils/useApi';

function PropertyPage() {
    const location = useLocation();
    const propertyData = location.state; // Get the passed data
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice); // Select auth data from Redux store
    const navigation = useNavigate();
    const agentId = propertyData.agentId;

    const [favoritesCount, setFavoritesCount] = useState(propertyData.usrPropertyFavorites || 0);

    const [agentData, setAgentData] = useState();
    async function fetchAgentData() {
        try {
            const agentDatasFetched = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-agent-data",
                method: "POST",
                data: { agentId }
            });
            console.log("Fetched Agent Data: ", agentDatasFetched);
            setAgentData(agentDatasFetched.user_agentdata_arr);
        } catch (error) {
            console.error("Failed to fetch agent data", error);
        }
    }

    const toggleFavorite = async () => {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/toggle-favorite',
                method: 'POST',
                data: { propertyId: propertyData._id }
            });
            
            if (response && response.favoritesCount !== undefined) {
                setFavoritesCount(response.favoritesCount);
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };
    

    useEffect(() => {
        if (userAuthData.usrType === 'admin') {
            fetchAgentData();
        }
    }, [agentId, userAuthData]);

    // Check if userAuthData is defined to avoid potential errors
    if (!userAuthData) {
        return <div>Loading...</div>; // You can show a loading spinner or placeholder here
    }

    return (
        <div className={`screen ${Styles.propertyScreen}`}>
            <Header />
            <SecondHeader />
      {/* Property Header Image */}
      {/* <div className={Styles.Styles.propertyHeader}>
        <div className={Styles.propertyImageContainer}>
          <img src="/assets/a1.jpg" alt="" className={Styles.propertyImage} />
        </div>
      </div> */}

            {/* Go Back */}
            <div className={Styles.goBackSection}>
                <div className={Styles.goBackContainer}>
                    <a onClick={() => { navigation(-1)}} style={{ color: Config.color.primaryColor800, cursor: 'pointer' }}>
                        <ArrowBackIcon /> Back to Properties
                    </a>
                </div>
            </div>
            {/* Property Info */}
            <div className={Styles.propertyInfo}>
                <div className={Styles.propertyInfoContainer}>
                    <main>
                        <div className={Styles.propertyDetails}>
                            <div className={Styles.propertyType}>{propertyData.userListingType}</div>
                            <p className={Styles.propertyType}
                             style={{
                                backgroundColor: Config.color.primaryColor900,
                                position: 'absolute',
                                fontSize: Config.fontSize.regular,
                                fontWeight: 'bolder',
                                color: Config.color.background,
                                borderRadius: '5px',
                                margin: '.8rem',
                                paddingLeft: '.5rem',
                                paddingRight: '.5rem',
                                alignSelf: 'flex-end',
                            }}>₹{propertyData.usrPrice}</p>
                            <h1>{propertyData.usrListingName}</h1>
                            <div className={Styles.propertyAddress} style={{ color: Config.color.primaryColor800 }}>
                                <PlaceIcon />
                                <p>{propertyData.location.street}, {propertyData.location.city}, {propertyData.location.state} {propertyData.location.pinCode}</p>
                            </div>
                        </div>

                        <div className={Styles.descriptionSection}>
                            <h3>Description & Details</h3>
                            <div className={Styles.propertyDetailsGrid} style={{ color: Config.color.primaryColor900 }}>
                                <p><HotelIcon /> {propertyData.usrExtraFacilities.beds} Beds</p>
                                <p><BathtubIcon /> {propertyData.usrExtraFacilities.bath} Baths</p>
                                <p><SquareFootIcon /> {propertyData.usrListingSquareFeet} sqft</p>
                            </div>
                            <p>{propertyData.usrListingDescription}</p>
                        </div>

                        <div className={Styles.amenitiesSection}>
                            <h3>Amenities</h3>
                            <ul className={Styles.amenitiesList}>
                                {propertyData.usrAmenities.map((amenity, index) => (
                                    <li key={index}><CheckIcon /> {amenity}</li>
                                ))}
                            </ul>
                        </div>
                    </main>

                    {/* Sidebar */}
                    {/* Only render if the user is a buyer */}
                    {userAuthData.usrType === 'buyer' && (
                        <aside className={Styles.sidebar}>
                            <button
                                className={Styles.favoriteButton}
                                onClick={toggleFavorite}
                                style={{ color: Config.color.background }}
                            >
                                <BookmarkIcon /> Favorite Property ({favoritesCount})
                            </button>


                            <div className={Styles.contactFormSection}>
                                <h3>Contact Property Agent</h3>
                                <form>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id="name" placeholder="Enter your name" value={userAuthData.usrFullName} disabled required />
                                    </div>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" placeholder="Enter your email" value={userAuthData.usrEmail} disabled required />
                                    </div>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="phone">Phone:</label>
                                        <input type="text" id="phone" placeholder="Enter your phone number" value={userAuthData.usrMobileNumber} disabled />
                                    </div>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="message">Message:</label>
                                        <textarea id="message" placeholder="Enter your message" required></textarea>
                                    </div>
                                    <center>
                                        <button type="submit" className={Styles.sendMessageButton}>
                                            <SendIcon /> Send Message
                                        </button>
                                    </center>
                                </form>
                            </div>
                        </aside>
                    )}

                    {/* Only render if the user is an agent or admin */}
                    {(userAuthData.usrType === 'agent' || userAuthData.usrType === 'admin') && (
                        <aside className={Styles.sidebar}>
                            <button
                                className={Styles.editBtn}
                                style={{ color: Config.color.background }}
                                onClick={() => { navigation('/EditProperty', { state: propertyData }) }}
                                id='edit'
                            >
                                <EditIcon /> EDIT
                            </button>
                            {(userAuthData.usrType === 'admin' && agentData && agentData.usrFullName) && (
                                <div className={Styles.agentContainer}>
                                    <div className={Styles.agentinfo}>
                                        <center>
                                        <h3 style={{textDecoration:"underline"}}>Agent Details</h3>
                                        <img
                                            src={agentData.usrProfileUrl ? agentData.usrProfileUrl : Config.imagesPaths.user_null}
                                            className={Styles.ProfileContainerImage}
                                            alt="Agent Profile"
                                        />
                                        </center>
                                        <p style={{marginTop:'1rem', fontWeight: 'bold'}}>Agent ID:<i> {agentData._id}</i></p>
                                        <p style={{marginTop:'.5rem', fontWeight: 'bold'}}>Agent Name:<i> {agentData.usrFullName}</i></p>
                                        <p style={{marginTop:'.5rem', fontWeight: 'bold'}}>Agent Email: <i>{agentData.usrEmail}</i></p>
                                        <p style={{marginTop:'.5rem', fontWeight: 'bold'}}>Agent Mobile Num.: <i>{agentData.usrMobileNumber}</i></p>
                                    </div>
                                </div>
                            )}
                        </aside>
                    )}
                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyPage;