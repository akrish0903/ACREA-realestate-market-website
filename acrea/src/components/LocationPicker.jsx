import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Styles from './css/LocationPicker.module.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

function LocationMarker({ position, onPositionChange }) {
    const map = useMapEvents({
        click(e) {
            onPositionChange(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position ? <Marker position={position} /> : null;
}

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
    const [position, setPosition] = useState(initialPosition || { 
        lat: 9.528628051714268, 
        lng: 76.82329874633047 
    });

    const handlePositionChange = useCallback((newPosition) => {
        setPosition(newPosition);
        if (onLocationSelect) {
            onLocationSelect(newPosition);
        }
    }, [onLocationSelect]);

    return (
        <div className={Styles.mapContainer}>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker 
                    position={position} 
                    onPositionChange={handlePositionChange} 
                />
            </MapContainer>
            <p className={Styles.instructions}>Click on the map to set the property location</p>
        </div>
    );
};

export default LocationPicker; 