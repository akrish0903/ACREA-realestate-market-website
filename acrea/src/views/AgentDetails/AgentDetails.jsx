import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import Styles from './css/AgentDetails.module.css';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import useApi from '../../utils/useApi';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';
import { toast } from 'react-toastify';

function AgentDetails() {
    const location = useLocation();
    const agent = location.state;
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    const navigation = useNavigate();
    const agentId = agent?.agentId;

    const [agentProperties, setAgentProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);    

    async function fetchAgentProperties() {
        try {
            const agentPropertiesFetched = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/show-agent-properties-to-others",
                method: "POST",
                data: { agent }
            });
    
            console.log("Fetched Agent Properties: ", agentPropertiesFetched);
    
            if (agentPropertiesFetched?.user_property_arr) {
                setAgentProperties(agentPropertiesFetched.user_property_arr);
            } else {
                throw new Error("Failed to fetch properties");
            }
        } catch (err) {
            console.error("Error fetching agent properties: ", err);
            setError(err.message);
            toast.error("Failed to load properties. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    

    useEffect(() => {
        if (userAuthData.usrType === 'admin' || userAuthData.usrType === 'buyer') {
            fetchAgentProperties();
        }
    }, [agentId, userAuthData]);

    if (!userAuthData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`screen ${Styles.agentScreen}`}>
            <Header />
            <SecondHeader />

            {/* Agent Info */}
            {agent ? (
                <div className={Styles.agentInfo}  style={{ backgroundColor: Config.color.secondaryColor200 }}>
                    <div className={Styles.agentInfoContainer}>
                        <div className={Styles.agentContainer}>
                            <div className={Styles.agentinfo}>
                                <center>
                                    <h3 style={{textDecoration:"underline"}}>Agent Details</h3>
                                    <img
                                        src={agent.usrProfileUrl ? agent.usrProfileUrl : Config.imagesPaths.user_null}
                                        className={Styles.ProfileContainerImage}
                                        alt="Agent Profile"
                                    />
                                </center>
                                <p style={{marginTop:'1rem', fontWeight: 'bold'}}>Agent ID: <i>{agent._id}</i></p>
                                <p style={{marginTop:'.5rem', fontWeight: 'bold'}}>Agent Name: <i>{agent.usrFullName}</i></p>
                                <p style={{marginTop:'.5rem', fontWeight: 'bold'}}>Agent Email: <i>{agent.usrEmail}</i></p>
                                <p style={{marginTop:'.5rem', fontWeight: 'bold'}}>Agent Mobile Num.: <i>{agent.usrMobileNumber}</i></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading Agent Data...</div>
            )}

           
                <div className={Styles.viewAllScreenContainer}>
                    {isLoading ? (
                        <div>Loading Properties...</div>
                    ) : agentProperties.length > 0 ? (
                        agentProperties.map((item, index) => (
                            <PropertiesCardVertical key={index} propertiesData={item} />
                        ))
                    ) : (
                        <div>No properties found.</div>
                    )}
                </div>
            <Footer />
        </div>
    );
}

export default AgentDetails;
