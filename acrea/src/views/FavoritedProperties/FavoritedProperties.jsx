import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';
import useApi from '../../utils/useApi'; 
import Styles from './css/FavoritedProperties.module.css';

function FavoritedProperties() {
    const userAuthData = useSelector(state => state.AuthUserDetailsSlice);
    const [favoritedProperties, setFavoritedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function fetchFavorites() {
        try {
            setLoading(true);
            const favoritedPropertiesFetched = await useApi({
                url: '/show-buyer-favorite',
                method: 'GET',
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
            });
            console.log(userAuthData.user)
            console.log("Fetched favorite properties: ", favoritedPropertiesFetched); // Debugging line
    
            if (favoritedPropertiesFetched && favoritedPropertiesFetched.user_favid_arr) {
                // Update this key to match the backend response structure
                setFavoritedProperties(favoritedPropertiesFetched.user_favid_arr);
            } else {
                console.error('Error fetching favorited properties:', favoritedPropertiesFetched);
            }
        } catch (error) {
            console.error('Error fetching favorited properties:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userAuthData.usrType !== "buyer") {
            console.log('User is not a buyer');
            return; // Early exit if the user is not a buyer
        }
        fetchFavorites();
    }, [userAuthData]);

    return (
        <div className={`screen ${Styles.favoritedPropertiesScreen}`}>
            <Header />
            <SecondHeader />
            <div className={Styles.favoritedPropertiesScreenContainer}>
                {loading ? (
                    <p>Loading favorites...</p>
                ) : favoritedProperties.length > 0 ? (
                    favoritedProperties.map(property => (
                        <PropertiesCardVertical key={property._id} property={property} />
                    ))
                ) : (
                    <p>No favorited properties yet.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default FavoritedProperties;
