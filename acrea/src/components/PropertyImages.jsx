import React, { useState } from 'react';
import Styles from './css/PropertyImages.module.css'; // Create a CSS file for styling if needed

const PropertyImages = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={Styles.imageGalleryScreen}>
            {images && images.length > 0 ? (
                <div className={Styles.imageContainer}>
                    {/* Render the left arrow only if there are more than 1 image */}
                    {images.length > 1 && (
                        <button className={Styles.arrowButton} onClick={prevImage}>&lt;</button>
                    )}
                    <img 
                        src={images[currentIndex]} 
                        alt={`Property Image ${currentIndex + 1}`} 
                        className={Styles.propertyImage} 
                    />
                    {/* Render the right arrow only if there are more than 1 image */}
                    {images.length > 1 && (
                        <button className={Styles.arrowButton} onClick={nextImage}>&gt;</button>
                    )}
                </div>
            ) : (
                <p>No images available</p>
            )}
        </div>
    );
};

export default PropertyImages;