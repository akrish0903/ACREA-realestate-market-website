import React from 'react';

const PropertyMap = ({ location }) => {
  // Default center for Kerala coordinates
  const defaultCenter = {
    lat: 9.528628051714268,
    lng: 76.82329874633047
  };

  // Use provided coordinates or fall back to default
  const center = {
    lat: parseFloat(location?.latitude) || defaultCenter.lat,
    lng: parseFloat(location?.longitude) || defaultCenter.lng
  };

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng-0.01}%2C${center.lat-0.01}%2C${center.lng+0.01}%2C${center.lat+0.01}&layer=mapnik&marker=${center.lat}%2C${center.lng}`;

  return (
    <iframe
      width="100%"
      height="400"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src={mapUrl}
      style={{
        borderRadius: "8px",
        marginTop: "20px"
      }}
    ></iframe>
  );
};

export default PropertyMap;