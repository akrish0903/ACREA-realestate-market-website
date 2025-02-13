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
    const [minimumBid, setMinimumBid] = useState('');
    const [biddingEndTime, setBiddingEndTime] = useState('');
    const [currentHighestBid, setCurrentHighestBid] = useState(0);
    const [bidAmount, setBidAmount] = useState('');
    const [bidding, setBidding] = useState(null);

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

    const handleStartBidding = async (e) => {
        e.preventDefault();
        
        // Validate inputs
        if (!minimumBid || !biddingEndTime) {
            toast.error('Please fill in all fields');
            return;
        }

        // Validate minimum bid is positive
        if (minimumBid <= 0) {
            toast.error('Minimum bid must be greater than 0');
            return;
        }

        // Validate end time is in the future
        const endTime = new Date(biddingEndTime);
        if (endTime <= new Date()) {
            toast.error('Bidding end time must be in the future');
            return;
        }

        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/api/start-bidding',
                method: 'POST',
                data: {
                    propertyId: propertyData._id,
                    minimumBid: Number(minimumBid),
                    biddingEndTime: endTime.toISOString()
                }
            });
            
            if (response.success) {
                toast.success('Bidding started successfully');
                setBidding(response.bidding);
                setMinimumBid('');
                setBiddingEndTime('');
                // Refresh bidding data
                fetchBiddingData();
            } else {
                toast.error(response.message || 'Failed to start bidding');
            }
        } catch (error) {
            console.error('Error starting bidding:', error);
            toast.error('Failed to start bidding');
        }
    };

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/api/place-bid',
                method: 'POST',
                data: {
                    propertyId: propertyData._id,
                    bidAmount: Number(bidAmount)
                }
            });
            
            if (response.success) {
                toast.success('Bid placed successfully');
                setBidAmount('');
                // Refresh bidding data
                fetchBiddingData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place bid');
        }
    };

    const fetchBiddingData = async () => {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/api/property-bids/${propertyData._id}`,
                method: 'GET'
            });
            
            if (response.success) {
                setBidding(response.bidding); // Will be null if no bidding exists
                if (response.bidding && response.bidding.bids && response.bidding.bids.length > 0) {
                    const highestBid = Math.max(...response.bidding.bids.map(b => b.bidAmount));
                    setCurrentHighestBid(highestBid);
                } else {
                    setCurrentHighestBid(response.bidding?.minimumBid || 0);
                }
            }
        } catch (error) {
            console.error('Failed to fetch bidding data:', error);
            toast.error('Failed to fetch bidding information');
        }
    };

    useEffect(() => {
        // if (userAuthData.usrType === 'admin' || userAuthData.usrType === 'buyer') {
            if (userAuthData.usrType === 'admin') {
            fetchAgentData();
            }
            fetchReviews();
            fetchBiddingData();
        // }
    }, [agentId, userAuthData, propertyData._id]);

    useEffect(() => {
        fetchBiddingData();
    }, [propertyData._id]);

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
                                    <div className={Styles.inputGroup1}>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id="name" placeholder="Enter your name" value={userAuthData.usrFullName} disabled required />
                                    </div>
                                    <div className={Styles.inputGroup1}>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" placeholder="Enter your email" value={userAuthData.usrEmail} disabled required />
                                    </div>
                                    <div className={Styles.inputGroup1}>
                                        <label htmlFor="phone">Phone:</label>
                                        <input type="text" id="phone" placeholder="Enter your phone number" value={userAuthData.usrMobileNumber} disabled />
                                    </div>
                                    <div className={Styles.inputGroup1}>
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

                            {userAuthData.usrType === 'buyer' && (
                                <div className={Styles.biddingSection}>
                                    <h3>Property Bidding</h3>
                                    {bidding ? (
                                        bidding.status === 'active' ? (
                                            <>
                                                <p>Current Highest Bid: ₹{currentHighestBid}</p>
                                                <p>Minimum Bid: ₹{bidding.minimumBid}</p>
                                                <p>Ends at: {new Date(bidding.biddingEndTime).toLocaleString()}</p>
                                                
                                                <form onSubmit={handlePlaceBid}>
                                                    <div className={Styles.inputGroup}>
                                                        <label htmlFor="bidAmount">Your Bid Amount:</label>
                                                        <input
                                                            type="number"
                                                            id="bidAmount"
                                                            value={bidAmount}
                                                            onChange={(e) => setBidAmount(e.target.value)}
                                                            min={Math.max(bidding.minimumBid, currentHighestBid + 1)}
                                                            required
                                                        />
                                                    </div>
                                                    <button type="submit" className={Styles.placeBidButton}>
                                                        Place Bid
                                                    </button>
                                                </form>
                                                
                                                <div className={Styles.biddingHistory}>
                                                    <h4>Bid History</h4>
                                                    {bidding.bids && bidding.bids.length > 0 ? (
                                                        <ul>
                                                            {bidding.bids
                                                                .sort((a, b) => b.bidAmount - a.bidAmount) // Sort by bid amount in descending order
                                                                .map((bid, index) => (
                                                                    <li key={bid._id || index} className={Styles.bidHistoryItem}>
                                                                        <span className={Styles.bidAmount}>₹{bid.bidAmount.toLocaleString()}</span>
                                                                        <span className={Styles.bidderName}>
                                                                            by {bid.buyerId?.usrFullName || 'Unknown'}
                                                                        </span>
                                                                        <span className={Styles.bidTime}>
                                                                            {new Date(bid.bidTime).toLocaleString()}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No bids yet</p>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <p className={Styles.biddingClosed}>This bidding cycle has ended.</p>
                                        )
                                    ) : (
                                        <p className={Styles.noBidding}>
                                            The agent/owner has not set a bidding schedule for this property yet.
                                        </p>
                                    )}
                                </div>
                            )}
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
                                <EditIcon /> EDIT Property
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
                            <div className={Styles.biddingSection}>
                                <h3>Property Bidding</h3>
                                {!bidding ? (
                                    <>
                                        <h4>Start New Bidding Cycle</h4>
                                        <form onSubmit={handleStartBidding}>
                                            <div className={Styles.inputGroup}>
                                                <label htmlFor="minimumBid">Minimum Bid Amount (₹):</label>
                                                <input
                                                    type="number"
                                                    id="minimumBid"
                                                    value={minimumBid}
                                                    onChange={(e) => setMinimumBid(e.target.value)}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                            <div className={Styles.inputGroup}>
                                                <label htmlFor="biddingEndTime">Bidding End Time:</label>
                                                <input
                                                    type="datetime-local"
                                                    id="biddingEndTime"
                                                    value={biddingEndTime}
                                                    onChange={(e) => setBiddingEndTime(e.target.value)}
                                                    min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className={Styles.startBiddingButton}>
                                                Start Bidding
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <div className={Styles.biddingStatus}>
                                            <p>Status: <span className={Styles.activeStatus}>{bidding.status}</span></p>
                                            <p>Current Highest Bid: ₹{currentHighestBid.toLocaleString()}</p>
                                            <p>Minimum Bid: ₹{bidding.minimumBid.toLocaleString()}</p>
                                            <p>Ends at: {new Date(bidding.biddingEndTime).toLocaleString()}</p>
                                        </div>
                                        
                                        <div className={Styles.biddingHistory}>
                                            <h4>Bid History</h4>
                                            {bidding.bids && bidding.bids.length > 0 ? (
                                                <ul>
                                                    {bidding.bids
                                                        .sort((a, b) => b.bidAmount - a.bidAmount)
                                                        .map((bid, index) => (
                                                            <li key={bid._id || index} className={Styles.bidHistoryItem}>
                                                                <span className={Styles.bidAmount}>
                                                                    ₹{bid.bidAmount.toLocaleString()}
                                                                </span>
                                                                <span className={Styles.bidderName}>
                                                                    by {bid.buyerId?.usrFullName || 'Unknown'}
                                                                </span>
                                                                <span className={Styles.bidTime}>
                                                                    {new Date(bid.bidTime).toLocaleString()}
                                                                </span>
                                                            </li>
                                                        ))}
                                                </ul>
                                            ) : (
                                                <p>No bids yet</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                
                                {bidding && bidding.status === 'completed' && bidding.winner && (
                                    <div className={Styles.winnerSection}>
                                        <h4>Winning Bid</h4>
                                        <div className={Styles.winnerInfo}>
                                            <p>Winner: {bidding.winner.buyerId?.usrFullName || 'Unknown'}</p>
                                            <p>Winning Amount: ₹{bidding.winner.bidAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    )}
                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyPage;