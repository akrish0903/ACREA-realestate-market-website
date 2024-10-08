import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/ViewAllProperties.module.css';
import SecondHeader from '../../components/SecondHeader';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';
import useApi from '../../utils/useApi';
import { toast } from 'react-toastify'; // Optional: for user-friendly error display

function ViewAllProperties() {
    var userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    console.log("user auth data ---> ", userAuthData);

    const [agentProperties, setAgentProperties] = useState([]);
    const [buyerProperties, setBuyerProperties] = useState([]);
    const [adminProperties, setAdminProperties] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchAgentProperties() {
        try {
            const agentPropertiesFetched = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-agent-properties",
                method: "POST",
            });

            if (agentPropertiesFetched?.user_property_arr) {
                setAgentProperties(agentPropertiesFetched.user_property_arr);
            } else {
                throw new Error("Failed to fetch properties");
            }
        } catch (err) {
            console.error("Error fetching agent properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");  // Optional: Display toast error
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchBuyerProperties() {
        try {
            const buyerPropertiesFetched = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-buyer-properties",
                method: "POST",
            });
    
            if (buyerPropertiesFetched?.user_property_arr) {
                setBuyerProperties(buyerPropertiesFetched.user_property_arr); // Correct state update for buyer properties
            } else {
                throw new Error("Failed to fetch properties");
            }
        } catch (err) {
            console.error("Error fetching buyer properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchAdminProperties() {
        try {
            const adminPropertiesFetched = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-admin-properties",
                method: "POST",
            });
    
            if (adminPropertiesFetched?.user_property_arr) {
                setAdminProperties(adminPropertiesFetched.user_property_arr); // Correct state update for buyer properties
            } else {
                throw new Error("Failed to fetch properties");
            }
        } catch (err) {
            console.error("Error fetching admin properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        if (userAuthData?.usrType === "agent") {
            fetchAgentProperties();
        } else {
            setIsLoading(false); // Avoid infinite loading for non-agent users
        }
        if (userAuthData?.usrType === 'buyer'){
            fetchBuyerProperties();
        }
        else {
            setIsLoading(false);
        }
        if (userAuthData?.usrType === 'admin'){
            fetchAdminProperties();
        }
        else {
            setIsLoading(false);
        }
    }, [userAuthData]);

    if (isLoading) {
        return <div className={Styles.loader}>Loading...</div>;
    }

    if (error) {
        return <div className={Styles.error}>Error: {error}</div>;
    }

    return (
        <div className={`screen ${Styles.viewAllScreen}`}>
            <Header />
            <SecondHeader />
            {userAuthData.usrType === 'agent' && (<div className={Styles.viewAllScreenContainer}>
                {agentProperties.length > 0 ? (
                    agentProperties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                )}
            </div>
            )}

            {userAuthData.usrType === 'buyer' && (<div className={Styles.viewAllScreenContainer}>
                {buyerProperties.length > 0 ? (
                    buyerProperties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                )}
                </div>
            )}

            {userAuthData.usrType === 'admin' && (<div className={Styles.viewAllScreenContainer}>
                {adminProperties.length > 0 ? (
                    adminProperties.map((item, index) => (
                        <PropertiesCardVertical key={index} propertiesData={item} />
                    ))
                ) : (
                    <div>No properties found.</div>
                )}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ViewAllProperties;
