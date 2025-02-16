import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/ViewAllProperties.module.css';
import SecondHeader from '../../components/SecondHeader';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';
import useApi from '../../utils/useApi';
import { toast } from 'react-toastify';
import { Config } from '../../config/Config';

function ViewAllProperties() {
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    console.log("user auth data ---> ", userAuthData);
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
   
    // Fetch agent's properties and fillter if needed
    async function fetchAgentPropertiesByTypeAndSearch(type, searchText) {
        try {
            console.log("Requesting agent properties with type:", type, "and searchText:", searchText);
            
            const fetchedProperties = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-by-type-agent-properties",
                method: "POST",
                data: { type, searchText }
            });
    
            console.log("Fetched agent properties:", fetchedProperties);
    
            if (fetchedProperties?.user_property_arr) {
                setProperties(fetchedProperties.user_property_arr);
            } else {
                throw new Error("Failed to fetch agent properties");
            }
        } catch (err) {
            console.error("Error fetching agent properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
   
    // Fetch properties to show buyer and filter if needed
    async function fetchBuyerPropertiesByTypeAndSearch(type, searchText) {
        try {
            console.log("Requesting buyer properties with type:", type, "and searchText:", searchText);
            
            if (!userAuthData?.usrAccessToken) {
                throw new Error("Authentication token not found");
            }

            const fetchedProperties = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-by-type-buyer-properties",
                method: "POST",
                data: { 
                    type: type || 'All',
                    searchText: searchText || ''
                }
            });

            console.log("API Response:", fetchedProperties);

            if (fetchedProperties?.error) {
                throw new Error(fetchedProperties.error.message);
            }

            if (!fetchedProperties?.user_property_arr) {
                throw new Error("No property data received from server");
            }

            setProperties(fetchedProperties.user_property_arr);
            setError(null); // Clear any previous errors

        } catch (err) {
            console.error("Error fetching buyer properties:", err);
            setError(err.message);
            toast.error(err.message || "Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
   
    // Fetch properties to show admin and fillter if needed
    async function fetchAdminPropertiesByTypeAndSearch(type, searchText) {
        try {
            console.log("Requesting admin properties with type:", type, "and searchText:", searchText);
            
            const fetchedProperties = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-by-type-admin-properties",
                method: "POST",
                data: { type, searchText }
            });
    
            console.log("Fetched admin properties:", fetchedProperties);
    
            if (fetchedProperties?.user_property_arr) {
                setProperties(fetchedProperties.user_property_arr);
            } else {
                throw new Error("Failed to fetch admin properties");
            }
        } catch (err) {
            console.error("Error fetching admin properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

     // Fetch properties to show user not logged in and fillter if needed
    async function fetchAllUserPropertiesByTypeAndSearch(type, searchText) {
        try {
            console.log("Requesting properties with type:", type, "and searchText:", searchText);
            
            const fetchedProperties = await useApi({
                url: "/show-by-type-all-user-properties",
                method: "POST",
                data: { type, searchText }
            });
    
            console.log("Fetched properties:", fetchedProperties);
    
            if (fetchedProperties?.user_property_arr) {
                setProperties(fetchedProperties.user_property_arr);
            } else {
                throw new Error("Failed to fetch properties");
            }
        } catch (err) {
            console.error("Error fetching properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // Extract the search query from the URL parameters and fetch properties accordingly
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const propertyType = searchParams.get('propertyType') || 'All';
        const searchText = searchParams.get('searchText') || ''; // Get the location search text

        // Fetch properties based on user type
        if (userAuthData?.usrType === "agent" || userAuthData?.usrType === 'owner') {
            fetchAgentPropertiesByTypeAndSearch(propertyType, searchText);
        }
        else if (userAuthData?.usrType === "buyer") {
            fetchBuyerPropertiesByTypeAndSearch(propertyType, searchText);
        }
        else if (userAuthData?.usrType === "admin") {
            fetchAdminPropertiesByTypeAndSearch(propertyType, searchText);
        }
        else {
            fetchAllUserPropertiesByTypeAndSearch(propertyType, searchText);
        }
    }, [location.search, userAuthData]);

    if (isLoading) {
        return <div style={{marginLeft:'10rem'}}> <img src={Config.imagesPaths.loading} style={{width:'80rem', height:'60rem',backgroundColor:'black'}}/></div>//<div className={Styles.loader}>Loading...</div>;%
    }

    if (error) {
        return <div className={Styles.error}>Error: {error}</div>;
    }

    return (
        <div className={`screen ${Styles.viewAllScreen}`}>
            <Header />
            <SecondHeader />
            <div className={Styles.viewAllScreenContainer}>
                {(userAuthData.usrType === 'agent' || userAuthData.usrType==='owner') && ( properties.length > 0 ? (
                    properties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                ))}
                
                {userAuthData.usrType === 'buyer' && ( properties.length > 0 ? (
                    properties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                ))}

                {userAuthData.usrType === 'admin' && ( properties.length > 0 ? (
                    properties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                ))}

                {userAuthData.usrType === null && ( properties.length > 0 ? (
                    properties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                ))}
                {/* {properties.length > 0 ? (
                    properties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                )} */}
            </div>
            <Footer />
        </div>
    );
}

export default ViewAllProperties;
