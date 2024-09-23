import React from 'react'
import { Config } from '../config/Config'
import Styles from "./css/SecondHeader.module.css"
import { useLocation } from 'react-router-dom';
function SecondHeader() {
    const location = useLocation();
    return (
        <div
            className={Styles.topNav}
            style={{
                backgroundColor: Config.color.primaryColor900
            }}
        >

            {location.pathname === "/" && (
                <h1
                    style={{ color: Config.color.background }}
                >
                    Find The Perfect Property
                </h1>)}
            {location.pathname === "/" && (
                <p
                    style={{
                        color: Config.color.background,
                        fontSize: Config.fontSize.small,
                        marginTop: ".8rem",
                        marginBottom: ".8rem"
                    }}>Discover the perfect property that suits your needs.</p>
            )}
            <form className={Styles.topNavFilter} onSubmit={(e) => e.preventDefault()}>
                <input style={{ backgroundColor: Config.color.background }} type='text' placeholder='Enter Location (City, State, Zip, etc)' />
                <select style={{ backgroundColor: Config.color.background }}>
                    <option value="volvo">All</option>
                    <option value="volvo">Land</option>
                    <option value="saab">Apartment</option>
                    <option value="fiat">House</option>
                    <option value="audi">Others</option>
                </select>
                <button
                    type='submit'
                    style={{ backgroundColor: Config.color.primaryColor600, fontSize: Config.fontSize.small, color: Config.color.background }}
                >Search</button>
            </form>

        </div>
    )
}

export default SecondHeader