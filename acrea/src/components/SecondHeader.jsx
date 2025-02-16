import React, { useState } from 'react';
import { Config } from '../config/Config';
import Styles from "./css/SecondHeader.module.css";
import { useLocation, useNavigate } from 'react-router-dom'; 

function SecondHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const [locationInput, setLocationInput] = useState("");
    const [propertyType, setPropertyType] = useState("All");

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate with both propertyType and location parameters
        navigate(`/viewAllProperties?propertyType=${propertyType}&searchText=${locationInput}`);
    };

    return (
        <div
            className={Styles.topNav}
            style={{
                backgroundColor: Config.color.primaryColor900
            }}
        >
            {location.pathname === "/" && (
                <>
                    <h1 style={{ color: Config.color.background }}>Find The Perfect Property</h1>
                    <p style={{
                        color: Config.color.background,
                        fontSize: Config.fontSize.small,
                        marginTop: ".8rem",
                        marginBottom: ".8rem"
                    }}>
                        Discover the perfect property that suits your needs.
                    </p>
                </>
            )}
            <form className={Styles.topNavFilter} onSubmit={handleSearch}>
                <input
                    style={{ backgroundColor: Config.color.background }}
                    type="text"
                    placeholder="Enter Location (City, State, Zip, etc)"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                />
                <select
                    style={{ backgroundColor: Config.color.background }}
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Land">Land</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Room">Room</option>
                    <option value="Other">Others</option>
                </select>
                <button
                    type="submit"
                    style={{ backgroundColor: Config.color.primaryColor600, fontSize: Config.fontSize.small, color: Config.color.background }}
                >Search</button>
            </form>
        </div>
    );
}

export default SecondHeader;
