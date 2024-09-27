import React from 'react'
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
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    var userAuthData = useSelector(data => data.AuthUserDetailsSlice)
    console.log("user auth data ---> ",userAuthData);
    
    var navigation = useNavigate();
    return (
        <div className={`screen ${Styles.dashboardScreen}`}>
            <Header />
            <SecondHeader />

            {/* optional auth nav */}
            {userAuthData.usrEmail===null && (<div className={Styles.optionalAuthCard}>
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
                    onClick={()=>{navigation("/viewAllProperties")}}
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
                    onClick={()=>{navigation("/signin")}}
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
            {/*only in agentpage */}
            {userAuthData.usrType=== 'agent' && (<div className={Styles.optionalAuthCard}>
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
                    onClick={()=>{navigation("/AddProperty")}}
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



            {/* featured Properties */}
            <div className={Styles.featuredProperty} style={{ backgroundColor: Config.color.secondaryColor200 }}>
                <h4 style={{
                    color: Config.color.primaryColor900,
                    fontWeight: "bolder"
                }}>Featured Properties</h4>
                <div className={Styles.featuredPropertyContainer}>

                    {/* card  */}
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
                                <button onClick={()=>{navigation("/PropertyPage")}}
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
                                <button onClick={()=>{navigation("/PropertyPage")}}
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

            {/* Recent Properties */}
            <div className={Styles.recentProp}>
                <h4 style={{
                    color: Config.color.primaryColor900,
                    fontWeight: "bolder"
                }}>Recent Properties</h4>

                <div className={Styles.recentPropContainer}>
                    <PropertiesCardVertical />
                    <PropertiesCardVertical />
                    <PropertiesCardVertical />
                    <PropertiesCardVertical />
                </div>
            </div>


            {/* view all button  */}
            <button 
            onClick={()=>{navigation("/viewAllProperties")}}
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
            <Footer/>
        </div>
    )
}

export default Dashboard