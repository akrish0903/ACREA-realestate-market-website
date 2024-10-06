import React, { useState } from 'react';
import Styles from './css/PropertiesCardVertical.module.css';
import { Config } from '../config/Config';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router-dom';

function PropertiesCardVertical({ propertiesData }) {
    var navigation = useNavigate();
    console.log('------ren---', propertiesData)
    var [imgError, setImgError] = useState(false)

    // Fallback image if the userListingImage fails
    const fallbackImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcO94FOVu_D2UF7B2tfkx77mvataBayP-Ralw4I5HGLkIZGFS1cCJjrPCA56UKSlzmQ0&usqp=CAU';

    return (
        <div className={Styles.recentPropCard}>
            {/* Image Section */}
            <div style={{ flexDirection: 'column', width: '100%' }} className={Styles.featuredPropertyContainerCardLeft}>
                <img
                    src={propertiesData.userListingImage && !imgError ? propertiesData.userListingImage : fallbackImage}
                    onError={() => setImgError(true)}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'fill',
                        borderBottom: 'black solid 0.5px',
                    }}
                    alt={propertiesData.usrListingName}
                />
                <p style={{
                    backgroundColor: Config.color.background,
                    position: 'absolute',
                    fontSize: Config.fontSize.xsmall,
                    fontWeight: 'bolder',
                    color: Config.color.primaryColor900,
                    borderRadius: '5px',
                    margin: '.8rem',
                    paddingLeft: '.5rem',
                    paddingRight: '.5rem',
                    alignSelf: 'flex-end',
                }}>
                    ₹{propertiesData.usrPrice.toLocaleString()}
                </p>
            </div>

            {/* Details Section */}
            <div
                className={Styles.featuredPropertyContainerCardRight}
                style={{ backgroundColor: Config.color.background, width: '100%', gap: '1rem' }}
            >
                {/* Property Name and Type */}
                <div className={Styles.featuredPropertyContainerCardRightTop}>
                    <p style={{
                        fontSize: Config.fontSize.regular,
                        fontWeight: 'bolder',
                        color: Config.color.textColor,
                    }}>{propertiesData.usrListingName}</p>
                    <p style={{
                        fontSize: Config.fontSize.small,
                        color: Config.color.textColor100,
                    }}>{propertiesData.userListingType}</p>

                    {/* Amenities (Beds, Baths, Square Feet) */}
                    <div style={{ gap: '1rem', marginTop: '.8rem' }}>
                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                            <HotelIcon style={{
                                width: '1.5rem',
                                height: '1.5rem',
                                color: Config.color.textColor100,
                            }} />
                            <p style={{
                                color: Config.color.textColor100,
                                fontSize: Config.fontSize.small,
                            }}>{propertiesData.usrExtraFacilities.beds} Beds</p>
                        </div>
                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                            <BathtubIcon style={{
                                width: '1.5rem',
                                height: '1.5rem',
                                color: Config.color.textColor100,
                            }} />
                            <p style={{
                                color: Config.color.textColor100,
                                fontSize: Config.fontSize.small,
                            }}>{propertiesData.usrExtraFacilities.bath} Baths</p>
                        </div>
                        <div className={Styles.featuredPropertyContainerCardRightTopSub}>
                            <SquareFootIcon style={{
                                width: '1.5rem',
                                height: '1.5rem',
                                color: Config.color.textColor100,
                            }} />
                            <p style={{
                                color: Config.color.textColor100,
                                fontSize: Config.fontSize.small,
                            }}>{propertiesData.usrListingSquareFeet} sqft</p>
                        </div>
                    </div>
                </div>

                {/* Location and Details Button */}
                <div className={Styles.featuredPropertyContainerCardRightBottom}>
                    <div style={{ alignItems: 'center' }}>
                        <PlaceIcon style={{
                            width: '1.5rem',
                            height: '1.5rem',
                            color: Config.color.primaryColor600,
                        }} />
                        <p style={{
                            color: Config.color.primaryColor600,
                            fontSize: Config.fontSize.small,
                        }}>
                            {propertiesData.location.city}, {propertiesData.location.state}
                        </p>
                    </div>
                    <button onClick={() => { navigation('/PropertyPage', { state: propertiesData }) }}
                        style={{
                            color: Config.color.background,
                            backgroundColor: Config.color.primaryColor900,
                            width: 'fit-content',
                            padding: '.2rem .8rem',
                            fontSize: Config.fontSize.small,
                            borderRadius: '5px',
                        }}>
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PropertiesCardVertical;
