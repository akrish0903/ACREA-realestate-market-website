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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import useApi from '../../utils/useApi';
import PropertyMap from '../../components/PropertyMap';
import PropertyQuestions from '../../components/PropertyQuestions'
import PropertyImages from '../../components/PropertyImages';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';

function PropertyPage() {
    const location = useLocation();
    const propertyData = location.state; // Get the passed data
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice); // Select auth data from Redux store
    const navigation = useNavigate();
    const agentId = propertyData.agentId;
    const propertyId= propertyData._id;

    const [favoritesCount, setFavoritesCount] = useState(propertyData.usrPropertyFavorites || 0);

    const [agentData, setAgentData] = useState();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0); // Initialize to 0;
    const [initialMessage, setInitialMessage] = useState('');

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

    const fetchReviews = async () => {
        if (!propertyId) {
            console.error("Error: propertyId is undefined!");
            return;
        }
        console.log("Sending propertyId:", propertyId);
        try {
            const response = await useApi({
                authRequired: false,
                url: '/api/get-reviews',
                method: 'POST',  // Changed to POST
                data: { propertyId },
            });
    
            console.log("Fetched reviews:", response);
            if (response.success) {
                setReviews(response.reviews);
                setAverageRating(response.averageRating || 0);
            } else {
                console.error('Failed to fetch reviews:', response.message);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

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
    
    const submitReview = async () => {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/api/add-review',
                method: 'POST',
                data: { propertyId: propertyData._id, rating, review: review || "" }
            });
            console.log("Review submitted:", response);
            setReview('');
            fetchReviews();
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };


    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (userAuthData.usrType !== 'buyer') {
            toast.error('Only buyers can initiate chats');
            return;
        }
        
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/api/chats/initiate',
                method: 'POST',
                data: {
                    receiverId: propertyData.agentId,
                    propertyId: propertyData._id,
                    message: initialMessage
                }
            });
            
            if (response.success) {
                navigation('/chats', { 
                    state: { 
                        chatId: response.chatId,
                        propertyData,
                        agentData 
                    }
                });
            }
        } catch (error) {
            console.error('Failed to initiate chat:', error);
            toast.error('Failed to start chat');
        }
    };

    useEffect(() => {
        // if (userAuthData.usrType === 'admin' || userAuthData.usrType === 'buyer') {
            if (userAuthData.usrType === 'admin') {
            fetchAgentData();
            }
            fetchReviews();

        // }
    }, [agentId, userAuthData, propertyData._id]);

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
                    <a className={Styles.goBackLink} onClick={() => { navigation(-1)}} style={{ cursor: 'pointer' }}>
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
                                    <li key={index}><CheckIcon  style={{color: Config.color.primaryColor900}}/> {amenity}</li>
                                ))}
                            </ul>
                        </div>

                        {/*Image Section */}
                        <div className={Styles.imageSection}>
                            <h3>Images</h3>
                            <PropertyImages images={propertyData.userListingImage} />
                        </div>

                        {/*Map Section */}
                        <div className={Styles.mapSection}>
                            <h3>Location</h3>
                            <PropertyMap location={propertyData.location} />
                        </div>

                        {/*Question Section */}
                        <div className={Styles.questionSection}>
                            <PropertyQuestions propertyData={propertyData} />
                        </div>
                        

                        {/* Rating and Review Section */}
                        <div className={Styles.reviewSection}>
                            <h4>Average Rating: {typeof averageRating === 'number' ? averageRating.toFixed(1) : 'N/A'} / 5</h4>

                            <h4>Reviews:</h4>
                            <ul>
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((rev) => (
                                        <li key={rev._id}>
                                            <strong>{rev.buyerId.usrFullName}</strong> ({rev.rating} stars): {rev.review}
                                        </li>
                                    ))
                                ) : (
                                    <li>No reviews available.</li>
                                )}
                            </ul>
                        </div>

                        <div className={Styles.reviewSection}>
                            <h3>Rate this Property</h3>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        onClick={() => setRating(star)}
                                        style={{ color: star <= rating ? 'gold' : 'gray', cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                            <div>
                            <textarea
                                placeholder="Write your review here..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                style={{margin:".5rem"}}
                            />
                            <button 
                                onClick={submitReview}
                                style={{backgroundColor:Config.color.primary,
                                    color:Config.color.background,
                                    borderRadius:"1rem",
                                    maxHeight:"5.5rem"
                                    }}
                                >Submit Review
                            </button>
                            </div>
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
                                <BookmarkIcon /> Favorite Property {/*({favoritesCount})*/}
                            </button>

                            <button
                                className={Styles.scheduleButton}
                                style={{ color: Config.color.background }}
                                onClick={() => {
                                    console.log({propertyData,agentData})
                                    navigation('/Schedule', { state: { propertyData, agentData } });
                                }}
                                id='schedule'
                            >
                                <CalendarMonthIcon/> Schedule
                            </button>


                            <div className={Styles.contactFormSection}>
                                <h3>Contact Property Agent</h3>
                                <form onSubmit={handleMessageSubmit}>
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
                                        <textarea 
                                            id="message" 
                                            placeholder="Enter your message" 
                                            value={initialMessage}
                                            onChange={(e) => setInitialMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <center>
                                        <button type="submit" className={Styles.sendMessageButton}>
                                            <SendIcon /> Start Chat
                                        </button>
                                    </center>
                                </form>
                            </div>
                        </aside>
                    )}

                    {/* Only render if the user is an agent, owner or admin */}
                    {(userAuthData.usrType === 'agent' || userAuthData.usrType === 'admin' || userAuthData.usrType==='owner') && (
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