import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/Dashboard.module.css";
import SecondHeader from '../../components/SecondHeader';
import { Config } from '../../config/Config';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PlaceIcon from '@mui/icons-material/Place';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';
import FeaturedPropertyContainer from '../../components/FeaturedPropertyContainer';
import { useNavigate } from 'react-router-dom';
import useApi from '../../utils/useApi';
function Dashboard() {
    var userAuthData = useSelector(data => data.AuthUserDetailsSlice)
    console.log("user auth data ---> ", userAuthData);

    var navigation = useNavigate();


    const [buyerRecentProperties, setBuyerRecentProperties] = useState([]);
    async function fetchBuyerRecentProperties() {
        var buyerRecentPropertiesFetched = await useApi({
            authRequired: true,
            authToken: userAuthData.usrAccessToken,
            url: "/show-buyer-recent-properties",
            method: "POST",
            data: {
                limit: 4
            },
        })
        setBuyerRecentProperties(buyerRecentPropertiesFetched.user_property_arr)
    }

    const [agentRecentProperties, setAgentRecentProperties] = useState([]);
    async function fetchAgentRecentProperties() {
        var agentRecentPropertiesFetched = await useApi({
            authRequired: true,
            authToken: userAuthData.usrAccessToken,
            url: "/show-agent-recent-properties",
            method: "POST",
            data: {
                limit: 4
            },
        })
        setAgentRecentProperties(agentRecentPropertiesFetched.user_property_arr)
    }

    const [adminRecentProperties, setAdminRecentProperties] = useState([]);
    async function fetchAdminRecentProperties() {
        var adminRecentPropertiesFetched = await useApi({
            authRequired: true,
            authToken: userAuthData.usrAccessToken,
            url: "/show-admin-properties",
            method: "POST",
            data: {
                limit: 4
            },
        })
        setAdminRecentProperties(adminRecentPropertiesFetched.user_property_arr)
    }

    const [adminRecentProperties2, setAdminRecentProperties2] = useState([]);
    async function fetchAdminRecentProperties2() {
        var adminRecentPropertiesFetched2 = await useApi({
            authRequired: true,
            authToken: userAuthData.usrAccessToken,
            url: "/show-admin-properties",
            method: "POST",
            data: {
                limit: 2
            },
        })
        setAdminRecentProperties2(adminRecentPropertiesFetched2.user_property_arr)
    }

    const [buyerFeaturesProperties, setBuyerFeaturesProperties] = useState([]);
    async function fetchBuyerFeaturesProperties() {
        var buyerFeaturesPropertiesFetched = await useApi({
            authRequired: true,
            authToken: userAuthData.usrAccessToken,
            url: "/show-buyer-features-properties",
            method: "POST",
            data: {
                limit: 2
            },
        })
        setBuyerFeaturesProperties(buyerFeaturesPropertiesFetched.user_property_arr)
    }



    useEffect(() => {
        if (userAuthData.usrType === "buyer") {
            fetchBuyerRecentProperties()
            fetchBuyerFeaturesProperties()
        }
        if (userAuthData.usrType==="agent"){
            fetchAgentRecentProperties()
            // fetchAgentRecentProperties2()
        }
        if(userAuthData.usrType==="admin"){
            fetchAdminRecentProperties()

        }

    }, [userAuthData])

    return (
        <div className={`screen ${Styles.dashboardScreen}`}>
            <Header />
            <SecondHeader />

            {/* optional auth nav */}
            {userAuthData.usrEmail === null && (<div className={Styles.optionalAuthCard}>
                <div
                    style={{ backgroundColor: Config.color.secondaryColor100 }}
                    className={Styles.optionalAuthCardLeft}
                >
                    <p style={{
                        fontWeight: "bolder",
                        fontSize: Config.fontSize.medium,
                        color: Config.color.textColor
                    }}>For Buyers</p>
                    <p style={{
                        fontSize: Config.fontSize.small,
                        color: Config.color.textColor
                    }}>Find your dream  property. Bookmark properties and contact owners.</p>
                    <button
                        onClick={() => { navigation("/viewAllProperties") }}
                        style={{
                            backgroundColor: Config.color.textColor,
                            color: Config.color.background,
                            border: "none",
                            padding: ".2rem",
                            paddingLeft: ".8rem",
                            paddingRight: ".8rem",
                            borderRadius: "5px",
                            fontSize: Config.fontSize.regular
                        }}
                    >Browse Properties</button>
                </div>
                <div
                    style={{ backgroundColor: Config.color.secondaryColor300 }}
                    className={Styles.optionalAuthCardRight}
                >
                    <p style={{
                        fontWeight: "bolder",
                        fontSize: Config.fontSize.medium,
                        color: Config.color.textColor
                    }}>For Property Agents</p>
                    <p style={{
                        fontSize: Config.fontSize.small,
                        color: Config.color.textColor
                    }}>List your properties and reach potential buyers.</p>
                    <button
                        onClick={() => { navigation("/signin") }}
                        style={{
                            backgroundColor: Config.color.primaryColor900,
                            color: Config.color.background,
                            border: "none",
                            padding: ".2rem",
                            paddingLeft: ".8rem",
                            paddingRight: ".8rem",
                            borderRadius: "5px",
                            fontSize: Config.fontSize.regular,
                            alignSelf: "flex-end",
                        }}
                    >Add Property</button>
                </div>
            </div>)}

            {/*Shown Only in Agent's page */}
            {userAuthData.usrType === 'agent' && (<div className={Styles.optionalAuthCard}>
                <div
                    style={{ backgroundColor: Config.color.secondaryColor300 }}
                    className={Styles.optionalAuthCardRight}
                >
                    <p style={{
                        fontWeight: "bolder",
                        fontSize: Config.fontSize.medium,
                        color: Config.color.textColor
                    }}>For Property Agents</p>
                    <p style={{
                        fontSize: Config.fontSize.small,
                        color: Config.color.textColor
                    }}>List your properties and reach potential buyers.</p>
                    <button
                        onClick={() => { navigation("/AddProperty") }}
                        style={{
                            backgroundColor: Config.color.primaryColor900,
                            color: Config.color.background,
                            border: "none",
                            padding: ".2rem",
                            paddingLeft: ".8rem",
                            paddingRight: ".8rem",
                            borderRadius: "5px",
                            fontSize: Config.fontSize.regular,
                            alignSelf: "flex-end",
                        }}
                    >Add Property</button>
                </div>
            </div>)}


            {/*Shown only when not logged in or logged in as Buyer*/}
            {(userAuthData.usrType === 'buyer' || userAuthData.usrType === null) && (<div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Featured Properties */}
                <div className={Styles.featuredProperty} style={{ backgroundColor: Config.color.secondaryColor200 }}>
                    <h4 style={{
                        color: Config.color.primaryColor900,
                        fontWeight: "bolder"
                    }}>Featured Properties</h4>
                    <div className={Styles.featuredPropertyContainer}>

                        {/* card  */}
                        {buyerFeaturesProperties?.map((item, index) => {
                            return <FeaturedPropertyContainer propertiesData={item} />
                        })}
                    </div>
                </div>

                {/* Recent Properties */}
                <div className={Styles.recentProp}>
                    <h4 style={{
                        color: Config.color.primaryColor900,
                        fontWeight: "bolder"
                    }}>Recent Properties</h4>

                    <div className={Styles.recentPropContainer}>
                       
                        {buyerRecentProperties?.map((item, index) => {
                            return <PropertiesCardVertical propertiesData={item} />
                        })}
                    </div>
                </div>


                {/* view all button  */}
                <button
                    onClick={() => { navigation("/viewAllProperties") }}
                    style={{
                        background: Config.color.textColor,
                        color: Config.color.background,
                        fontSize: Config.fontSize.regular,
                        width: "fit-content",
                        alignSelf: "center",
                        paddingLeft: "8rem",
                        paddingRight: "8rem",
                        borderRadius: "10px",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        textAlign: "center",
                        margin: "1rem"
                    }}>View All Properties</button>
            </div>
            )}

            {/* Shown only when logged in as Agent */}
            {userAuthData.usrType === 'agent' && (<div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Recently Added Properties */}
                <div className={Styles.featuredProperty} style={{ backgroundColor: Config.color.secondaryColor200 }}>
                    <h4 style={{
                        color: Config.color.primaryColor900,
                        fontWeight: "bolder"
                    }}>Recently Added Properties</h4>
                    <div className={Styles.featuredPropertyContainer}>

                        {/* card  */}
                        {/* {agentRecentProperties2?.map((item, index) => {
                            return <FeaturedPropertyContainer propertiesData={item} />
                        })} */}
                        <div className={Styles.featuredPropertyContainerCard}>
                            <div className={Styles.featuredPropertyContainerCardLeft}>
                                <img
                                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "fill"
                                    }}
                                />
                                <p style={{
                                    backgroundColor: Config.color.background,
                                    position: "absolute",
                                    fontSize: Config.fontSize.xsmall,
                                    fontWeight: "bolder",
                                    color: Config.color.primaryColor900,
                                    borderRadius: "5px",
                                    margin: ".8rem",
                                    paddingLeft: ".5rem",
                                    paddingRight: ".5rem"
                                }}>₹2,500</p>
                            </div>
                            <div
                                className={Styles.featuredPropertyContainerCardRight}
                                style={{ backgroundColor: Config.color.background }}
                            >
                                <div className={Styles.featuredPropertyContainerCardRightTop}>
                                    <p style={{
                                        fontSize: Config.fontSize.regular,
                                        fontWeight: "bolder",
                                        color: Config.color.textColor
                                    }}>Seaside Retreat</p>
                                    <p style={{
                                        fontSize: Config.fontSize.small,
                                        color: Config.color.textColor100
                                    }}>House</p>
                                    <div style={{ gap: "1rem", marginTop: ".8rem" }}>
                                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                                            <HotelIcon style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                objectFit: "contain",
                                                color: Config.color.textColor100
                                            }} />
                                            <p style={{
                                                color: Config.color.textColor100,
                                                fontSize: Config.fontSize.small
                                            }}>4 Beds</p>
                                        </div>
                                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                                            <BathtubIcon style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                objectFit: "contain",
                                                color: Config.color.textColor100
                                            }} />
                                            <p style={{
                                                color: Config.color.textColor100,
                                                fontSize: Config.fontSize.small
                                            }}> 3 Baths</p>
                                        </div>
                                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                                            <SquareFootIcon style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                objectFit: "contain",
                                                color: Config.color.textColor100
                                            }} />
                                            <p style={{
                                                color: Config.color.textColor100,
                                                fontSize: Config.fontSize.small
                                            }}>2,800 sqft</p>
                                        </div>
                                    </div>
                                </div>


                                <div className={Styles.featuredPropertyContainerCardRightBottom}>
                                    <div style={{ alignItems: "center" }}>
                                        <PlaceIcon style={{
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            objectFit: "contain",
                                            color: Config.color.primaryColor600
                                        }} />
                                        <p style={{
                                            color: Config.color.primaryColor600,
                                            fontSize: Config.fontSize.small
                                        }}>Boston MA</p>
                                    </div>
                                    <button onClick={() => { navigation("/PropertyPage") }}
                                        style={{
                                            color: Config.color.background,
                                            backgroundColor: Config.color.primaryColor900,
                                            width: "fit-content",
                                            padding: ".2rem",
                                            paddingLeft: ".8rem",
                                            paddingRight: ".8rem",
                                            fontSize: Config.fontSize.small,
                                            borderRadius: "5px"
                                        }}>Details</button>
                                </div>
                            </div>
                        </div>

                        <div className={Styles.featuredPropertyContainerCard}>
                            <div className={Styles.featuredPropertyContainerCardLeft}>
                                <img
                                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "fill"
                                    }}
                                />
                                <p style={{
                                    backgroundColor: Config.color.background,
                                    position: "absolute",
                                    fontSize: Config.fontSize.xsmall,
                                    fontWeight: "bolder",
                                    color: Config.color.primaryColor900,
                                    borderRadius: "5px",
                                    margin: ".8rem",
                                    paddingLeft: ".5rem",
                                    paddingRight: ".5rem"
                                }}>₹2,500</p>
                            </div>
                            <div
                                className={Styles.featuredPropertyContainerCardRight}
                                style={{ backgroundColor: Config.color.background }}
                            >
                                <div className={Styles.featuredPropertyContainerCardRightTop}>
                                    <p style={{
                                        fontSize: Config.fontSize.regular,
                                        fontWeight: "bolder",
                                        color: Config.color.textColor
                                    }}>Seaside Retreat</p>
                                    <p style={{
                                        fontSize: Config.fontSize.small,
                                        color: Config.color.textColor100
                                    }}>House</p>
                                    <div style={{ gap: "1rem", marginTop: ".8rem" }}>
                                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                                            <HotelIcon style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                objectFit: "contain",
                                                color: Config.color.textColor100
                                            }} />
                                            <p style={{
                                                color: Config.color.textColor100,
                                                fontSize: Config.fontSize.small
                                            }}>4 Beds</p>
                                        </div>
                                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                                            <BathtubIcon style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                objectFit: "contain",
                                                color: Config.color.textColor100
                                            }} />
                                            <p style={{
                                                color: Config.color.textColor100,
                                                fontSize: Config.fontSize.small
                                            }}> 3 Baths</p>
                                        </div>
                                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                                            <SquareFootIcon style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                objectFit: "contain",
                                                color: Config.color.textColor100
                                            }} />
                                            <p style={{
                                                color: Config.color.textColor100,
                                                fontSize: Config.fontSize.small
                                            }}>2,800 sqft</p>
                                        </div>
                                    </div>
                                </div>


                                <div className={Styles.featuredPropertyContainerCardRightBottom}>
                                    <div style={{ alignItems: "center" }}>
                                        <PlaceIcon style={{
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            objectFit: "contain",
                                            color: Config.color.primaryColor600
                                        }} />
                                        <p style={{
                                            color: Config.color.primaryColor600,
                                            fontSize: Config.fontSize.small
                                        }}>Boston MA</p>
                                    </div>
                                    <button onClick={() => { navigation("/PropertyPage") }}
                                        style={{
                                            color: Config.color.background,
                                            backgroundColor: Config.color.primaryColor900,
                                            width: "fit-content",
                                            padding: ".2rem",
                                            paddingLeft: ".8rem",
                                            paddingRight: ".8rem",
                                            fontSize: Config.fontSize.small,
                                            borderRadius: "5px"
                                        }}>Details</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Logged In Agent's Properties */}
                <div className={Styles.recentProp}>
                    <h4 style={{
                        color: Config.color.primaryColor900,
                        fontWeight: "bolder"
                    }}>Your Properties</h4>

                    <div className={Styles.recentPropContainer}>
                    {agentRecentProperties?.map((item, index) => {
                            return <PropertiesCardVertical propertiesData={item} />
                        })}
                    </div>
                </div>



                {/* view all button  */}
                <button
                    onClick={() => { navigation("/viewAllProperties") }}
                    style={{
                        background: Config.color.textColor,
                        color: Config.color.background,
                        fontSize: Config.fontSize.regular,
                        width: "fit-content",
                        alignSelf: "center",
                        paddingLeft: "8rem",
                        paddingRight: "8rem",
                        borderRadius: "10px",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        textAlign: "center",
                        margin: "1rem"
                    }}>View All Your Properties</button>
            </div>
            )}


            {/* ONly for ADMIN */}
            {userAuthData.usrType === 'admin' && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={Styles.optionalAuthCard}>
                        <div
                            style={{ backgroundColor: Config.color.secondaryColor100 }}
                            className={Styles.optionalAuthCardLeft}
                        >
                            <p style={{
                                fontWeight: "bolder",
                                fontSize: Config.fontSize.medium,
                                color: Config.color.textColor
                            }}>View Buyers</p>
                            <p style={{
                                fontSize: Config.fontSize.small,
                                color: Config.color.textColor
                            }}>Manage buyer profiles and track property interests.</p>
                            <button
                                onClick={() => { navigation("/BuyerList") }}
                                style={{
                                    backgroundColor: Config.color.textColor,
                                    color: Config.color.background,
                                    border: "none",
                                    padding: ".2rem",
                                    paddingLeft: ".8rem",
                                    paddingRight: ".8rem",
                                    borderRadius: "5px",
                                    fontSize: Config.fontSize.regular
                                }}
                            >Browse Buyers</button>
                        </div>
                        <div
                            style={{ backgroundColor: Config.color.secondaryColor300 }}
                            className={Styles.optionalAuthCardRight}
                        >
                            <p style={{
                                fontWeight: "bolder",
                                fontSize: Config.fontSize.medium,
                                color: Config.color.textColor
                            }}>View Property Agents List</p>
                            <p style={{
                                fontSize: Config.fontSize.small,
                                color: Config.color.textColor
                            }}>Manage property agent accounts and their property listings.</p>
                            <button
                                onClick={() => { navigation("/signin") }}
                                style={{
                                    backgroundColor: Config.color.primaryColor900,
                                    color: Config.color.background,
                                    border: "none",
                                    padding: ".2rem",
                                    paddingLeft: ".8rem",
                                    paddingRight: ".8rem",
                                    borderRadius: "5px",
                                    fontSize: Config.fontSize.regular,
                                    alignSelf: "flex-end",
                                }}
                            >View Property Agent List</button>
                        </div>
                    </div>
                    <div className={Styles.optionalAuthCard}>
                        <div
                            style={{ backgroundColor: Config.color.secondaryColor300 }}
                            className={Styles.optionalAuthCardRight}
                        >
                            <p style={{
                                fontWeight: "bolder",
                                fontSize: Config.fontSize.medium,
                                color: Config.color.textColor
                            }}>View Properties</p>
                            <p style={{
                                fontSize: Config.fontSize.small,
                                color: Config.color.textColor
                            }}>Oversee all property listings and manage approvals.</p>
                            <button
                                onClick={() => { navigation("/signin") }}
                                style={{
                                    backgroundColor: Config.color.primaryColor900,
                                    color: Config.color.background,
                                    border: "none",
                                    padding: ".2rem",
                                    paddingLeft: ".8rem",
                                    paddingRight: ".8rem",
                                    borderRadius: "5px",
                                    fontSize: Config.fontSize.regular,
                                    alignSelf: "flex-end",
                                }}
                            >View Properties List</button>
                        </div>
                    </div>

                    {/* Recently Joined Buyers */}
                    <div className={Styles.featuredProperty} style={{ backgroundColor: Config.color.secondaryColor200 }}>
                        <h4 style={{
                            color: Config.color.primaryColor900,
                            fontWeight: "bolder"
                        }}>Recently Joined Buyers</h4>
                        <div className={Styles.featuredPropertyContainer}>
                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Anandhu Krishnan</p>
                                        <p>AnandhuKrishnan@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Anandhu Krishnan</p>
                                        <p>AnandhuKrishnan@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Anandhu Krishnan</p>
                                        <p>AnandhuKrishnan@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Anandhu Krishnan</p>
                                        <p>AnandhuKrishnan@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recently Joined Agents */}
                    <div className={Styles.featuredProperty} style={{ backgroundColor: Config.color.background }}>
                        <h4 style={{
                            color: Config.color.primaryColor900,
                            fontWeight: "bolder"
                        }}>Recently Joined Agents</h4>
                        <div className={Styles.featuredPropertyContainer}>
                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Aakash</p>
                                        <p>Aakash@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>

                                    <div className={Styles.featuredPropertyContainerCardRightBottom}>
                                        <button onClick={() => { navigation("/PropertyPage") }}
                                            style={{
                                                color: Config.color.background,
                                                backgroundColor: Config.color.primaryColor900,
                                                width: "fit-content",
                                                padding: ".2rem",
                                                paddingLeft: ".8rem",
                                                paddingRight: ".8rem",
                                                fontSize: Config.fontSize.small,
                                                borderRadius: "5px"
                                            }}>Details</button>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Aakash</p>
                                        <p>Aakashn@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>

                                    <div className={Styles.featuredPropertyContainerCardRightBottom}>
                                        <button onClick={() => { navigation("/PropertyPage") }}
                                            style={{
                                                color: Config.color.background,
                                                backgroundColor: Config.color.primaryColor900,
                                                width: "fit-content",
                                                padding: ".2rem",
                                                paddingLeft: ".8rem",
                                                paddingRight: ".8rem",
                                                fontSize: Config.fontSize.small,
                                                borderRadius: "5px"
                                            }}>Details</button>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Aakash</p>
                                        <p>Aakash@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>

                                    <div className={Styles.featuredPropertyContainerCardRightBottom}>
                                        <button onClick={() => { navigation("/PropertyPage") }}
                                            style={{
                                                color: Config.color.background,
                                                backgroundColor: Config.color.primaryColor900,
                                                width: "fit-content",
                                                padding: ".2rem",
                                                paddingLeft: ".8rem",
                                                paddingRight: ".8rem",
                                                fontSize: Config.fontSize.small,
                                                borderRadius: "5px"
                                            }}>Details</button>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.recentPropCard}>
                                <div
                                    className={Styles.featuredPropertyContainerCardRight}
                                    style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
                                >
                                    <div className={Styles.featuredPropertyContainerCardRightTop}>
                                        <p style={{
                                            fontSize: Config.fontSize.regular,
                                            fontWeight: "bolder",
                                            color: Config.color.textColor
                                        }}>Aakash</p>
                                        <p>Aakash@gmail.com</p>
                                        <p>9876543210</p>
                                    </div>

                                    <div className={Styles.featuredPropertyContainerCardRightBottom}>
                                        <button onClick={() => { navigation("/PropertyPage") }}
                                            style={{
                                                color: Config.color.background,
                                                backgroundColor: Config.color.primaryColor900,
                                                width: "fit-content",
                                                padding: ".2rem",
                                                paddingLeft: ".8rem",
                                                paddingRight: ".8rem",
                                                fontSize: Config.fontSize.small,
                                                borderRadius: "5px"
                                            }}>Details</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recently Added Properties */}
                    <div className={Styles.recentProp} style={{ backgroundColor: Config.color.secondaryColor200, marginBottom: '1rem' }}>
                        <h4 style={{
                            color: Config.color.primaryColor900,
                            fontWeight: "bolder"
                        }}>Recently Added Properties</h4>

                        <div className={Styles.recentPropContainer}>
                        {adminRecentProperties?.map((item, index) => {
                            return <PropertiesCardVertical propertiesData={item} />
                        })}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default Dashboard