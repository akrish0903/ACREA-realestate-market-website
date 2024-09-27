import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/FavoritedProperties.module.css"
import { useLocation } from 'react-router-dom';

import SecondHeader from '../../components/SecondHeader';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';
import { Config } from '../../config/Config';

import DeleteIcon from '@mui/icons-material/Delete';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PlaceIcon from '@mui/icons-material/Place';

function FavoritedProperties() {
    const [hovered, setHovered] = useState(false);
    return (
        <div className={`screen ${Styles.favoritedPropertiesScreen}`}>
            <Header />
            <SecondHeader/>
            <div className={Styles.favoritedPropertiesScreenContainer}>
            <div className={Styles.recentPropCard}>
            {/* top */}
            <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill"
                    }}
                />
                <DeleteIcon
                    style={{
                    backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                    position: "absolute",
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                    color: hovered ? Config.color.background : Config.color.primaryColor900,
                    margin: ".8rem",
                    borderRadius: "5px",
                    transition: "color 0.3s ease", 
                    }}
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
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
                    paddingRight: ".5rem",
                    alignSelf: "flex-end"
                }}>₹2,500 a</p>
            </div>

            {/* bottom */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                    <button style={{
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
            {/* top */}
            <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill"
                    }}
                />
                <DeleteIcon
                    style={{
                    backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                    position: "absolute",
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                    color: hovered ? Config.color.background : Config.color.primaryColor900,
                    margin: ".8rem",
                    borderRadius: "5px",
                    transition: "color 0.3s ease", 
                    }}
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
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
                    paddingRight: ".5rem",
                    alignSelf: "flex-end"
                }}>₹2,500</p>
            </div>

            {/* bottom */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                    <button style={{
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
            {/* top */}
            <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill"
                    }}
                />
                <DeleteIcon
                    style={{
                    backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                    position: "absolute",
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                    color: hovered ? Config.color.background : Config.color.primaryColor900,
                    margin: ".8rem",
                    borderRadius: "5px",
                    transition: "color 0.3s ease", 
                    }}
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
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
                    paddingRight: ".5rem",
                    alignSelf: "flex-end"
                }}>₹2,500</p>
            </div>

            {/* bottom */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                    <button style={{
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
            {/* top */}
            <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill"
                    }}
                />
                <DeleteIcon
                    style={{
                    backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                    position: "absolute",
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                    color: hovered ? Config.color.background : Config.color.primaryColor900,
                    margin: ".8rem",
                    borderRadius: "5px",
                    transition: "color 0.3s ease", 
                    }}
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
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
                    paddingRight: ".5rem",
                    alignSelf: "flex-end"
                }}>₹2,500</p>
            </div>

            {/* bottom */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                    <button style={{
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
            {/* top */}
            <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill"
                    }}
                />
                <DeleteIcon
                    style={{
                    backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                    position: "absolute",
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                    color: hovered ? Config.color.background : Config.color.primaryColor900,
                    margin: ".8rem",
                    borderRadius: "5px",
                    transition: "color 0.3s ease", 
                    }}
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
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
                    paddingRight: ".5rem",
                    alignSelf: "flex-end"
                }}>₹2,500</p>
            </div>

            {/* bottom */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                    <button style={{
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
            {/* top */}
            <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill"
                    }}
                />
                <DeleteIcon
                    style={{
                    backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                    position: "absolute",
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                    color: hovered ? Config.color.background : Config.color.primaryColor900,
                    margin: ".8rem",
                    borderRadius: "5px",
                    transition: "color 0.3s ease", 
                    }}
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
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
                    paddingRight: ".5rem",
                    alignSelf: "flex-end"
                }}>₹2,500</p>
            </div>

            {/* bottom */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                    <button style={{
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
                    {/* top */}
                    <div style={{ flexDirection: "column", width: "100%" }} className={Styles.featuredPropertyContainerCardLeft}>
                        <img
                            src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600'
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "fill"
                            }}
                        />
                        <DeleteIcon
                            style={{
                            backgroundColor: hovered ? Config.color.primaryColor900 : Config.color.background,
                            position: "absolute",
                            width: "1.5rem",
                            height: "1.5rem",
                            objectFit: "contain",
                            color: hovered ? Config.color.background : Config.color.primaryColor900,
                            margin: ".8rem",
                            borderRadius: "5px",
                            transition: "color 0.3s ease", 
                            }}
                            onMouseEnter={() => setHovered(true)} 
                            onMouseLeave={() => setHovered(false)}
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
                            paddingRight: ".5rem",
                            alignSelf: "flex-end"
                        }}>₹2,500</p>
                    </div>

                    {/* bottom */}
                    <div
                        className={Styles.featuredPropertyContainerCardRight}
                        style={{ backgroundColor: Config.color.background, width: "100%", gap: "1rem" }}
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
                            <button style={{
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
            <Footer/>
        </div>
    )
}

export default FavoritedProperties