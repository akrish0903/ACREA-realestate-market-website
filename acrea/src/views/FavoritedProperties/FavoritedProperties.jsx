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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchFavoriteProperties() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-buyer-favorite",
                method: "GET",
            });

            console.log("API Response:", response);

            if (response && Array.isArray(response.user_fav_property_arr)) {
                setFavoritedProperties(response.user_fav_property_arr);
            } else {
                setError("Invalid response structure from API");
            }
        } catch (error) {
            console.error("Error fetching favorite properties:", error);
            setError("Failed to fetch favorite properties");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userAuthData.usrType === "buyer") {
            fetchFavoriteProperties();
        }
    }, [userAuthData]);

    return (
        <div className={`screen ${Styles.favoritedPropertiesScreen}`}>
            <Header />
            <SecondHeader />
            <div className={Styles.favoritedPropertiesScreenContainer}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : userAuthData.usrType === 'buyer' ? (
                    favoritedProperties.length > 0 ? (
                        favoritedProperties.map((item, index) => (
                            <PropertiesCardVertical key={index} propertiesData={item} />
                        ))
                    ) : (
                        <div>No favorited properties yet.</div>
                    )
                ) : (
                    <div>Only buyers can view favorited properties.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default FavoritedProperties;
