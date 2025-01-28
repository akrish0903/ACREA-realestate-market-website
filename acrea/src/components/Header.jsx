import React, { useState } from 'react';
import Styles from "./css/Header.module.css";
import { Config } from '../config/Config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown_Bootstrap from './Dropdown_Bootstrap';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
    const navigation = useNavigate();
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownDataArr = [
        {
            title: "Edit Account",
            navigate: "/editProfile"
            // customDom: null
        },
        // Only add "My Properties" if the user is an agent or owner
        ...(userAuthData.usrType === 'agent' || userAuthData.usrType === "owner" ? [{ title: "My Properties", navigate: "/ViewAllProperties" }] : []),
        ...(userAuthData.usrType === 'buyer' ? [{ title: "Favorites", navigate: "/FavoritedProperties" }] : []),
        // ...((userAuthData.usrType === 'agent' || userAuthData.usrType === "owner" )? [{ title: "Scheduled visit", navigate: "/ScheduleList" }] : []),
        { 
            title: "Scheduled visit", 
            navigate: "/ScheduleList" 
        },
        { 
            title: "Help Center",
            navigate: "/help-center"
            // customDom: null
         },
        {
            title: "Logout",
            navigate: "/logout"
            // customDom: null
        },
    ];

    const activeLinkStyle = {
        borderBottom: `4px solid ${Config.color.primaryColor1000}`,
        borderBottomColor:  `${Config.color.primaryColor1000}`,
        color: Config.color.background,
        textDecoration: 'none'
    };

    return (
        <div
            className={Styles.headerScreen}
            style={{
                backgroundColor: Config.color.primaryColor900
            }}
        >
            <div className={Styles.headerScreenLeft}>
                <NavLink to={"/"}
                    style={{
                        textDecoration: 'none',
                        height: "3.5rem"
                    }}>
                    <img
                        src={Config.imagesPaths.logo3}
                        className={Styles.screenRightContainerImg}
                        style={{
                            objectFit: 'contain',
                            width: "100%",
                            height: "100%",
                            marginLeft:'2.5rem',
                        }}
                    />
                </NavLink>
            </div>
            <div className={Styles.headerScreenRight}>
                <div className={Styles.headerScreenRightFirst}>
                <h6><NavLink
                        to={"/"}
                        style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                    >
                        {/* <HomeIcon style={{margin:'auto'}}/> */}
                        HOME
                    </NavLink>
                </h6>
                {( userAuthData.usrType==='buyer' ) &&
                    <h6>
                        <NavLink
                            to="/ViewAllProperties"
                            style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                        >
                            BUY
                        </NavLink>
                    </h6>
                }

                {( userAuthData.usrType==='buyer' ) &&
                    <h6 style={{ color: Config.color.background }}>
                        <NavLink
                            to="/AgentList"
                            style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                        >
                            AGENTS
                        </NavLink>
                    </h6>
                }
                {(userAuthData.usrType==='agent' || userAuthData.usrType==='owner') &&
                    <h6 style={{width:'8rem'}}>
                        <NavLink
                            to="/ViewAllProperties"
                            style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                        >
                            Your Properties
                        </NavLink>
                    </h6>
                }
                {(userAuthData.usrType==='admin' ) &&
                    <h6 style={{width:'6rem'}}>
                        <NavLink
                            to="/BuyerList"
                            style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                        >
                            View Buyers
                        </NavLink>
                    </h6>
                }
                {(userAuthData.usrType==='admin' ) &&
                    <h6 style={{width:'6rem'}}>
                        <NavLink
                            to="/AgentList"
                            style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                        >
                            View Agents
                        </NavLink>
                    </h6>
                }
                {(userAuthData.usrType==='admin' ) &&
                    <h6 style={{width:'9rem'}}>
                        <NavLink
                            to="/ViewAllProperties"
                            style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                        >
                            View Properties
                        </NavLink>
                    </h6>
                }
                <h6><NavLink
                        to={"/About"}
                        style={({ isActive }) => (isActive ? activeLinkStyle : { color: Config.color.background, textDecoration: 'none'})}
                    >
                        ABOUT US
                    </NavLink>
                </h6>
                </div>

                <div
                    className={Styles.headerScreenRightSecond}
                    style={{ height: "88%" }}
                    onClick={() => {
                        if (userAuthData.usrEmail === null) {
                            navigation("/signin");
                        } else {
                            setIsDropdownOpen(true);
                        }
                    }}
                >
                    {userAuthData.usrEmail === null ? (
                        <div>
                            <AccountCircleIcon
                                style={{
                                    objectFit: "contain",
                                    color: Config.color.background,
                                    width: "3rem",
                                    height: "3rem"
                                }}
                            />
                            <p style={{ color: Config.color.background }}>Sign In/Register</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{ borderRadius: "50%", overflow: "hidden" }}>
                                <img src={userAuthData.usrProfileUrl ?userAuthData.usrProfileUrl==="null"?Config.imagesPaths.user_null: userAuthData.usrProfileUrl : Config.imagesPaths.user_null} style={{
                                    objectFit: "contain",
                                    width: "3rem",
                                    height: "3rem",
                                    scale: "1.12"
                                }} />
                            </div>
                            <div className={Styles.headerScreenRightSecondContainer}>
                                <p
                                    className={Styles.headerScreenRightSecondContainerTop}
                                    style={{
                                        color: Config.color.background,
                                        fontSize: Config.fontSize.small,
                                        fontFamily: "sans-serif"
                                    }}
                                >Hello,</p>
                                <p
                                    className={Styles.headerScreenRightSecondContainerBottom}
                                    style={{
                                        color: Config.color.background,
                                        fontSize: Config.fontSize.xsmall,
                                        fontFamily: "cursive"
                                    }}
                                >{userAuthData.usrFullName}</p>
                                <Dropdown_Bootstrap
                                    marginTop='13.5rem'
                                    isDropdownOpen={isDropdownOpen}
                                    dropdownDataArr={dropdownDataArr}
                                    closeFunc={() => {
                                        setIsDropdownOpen(false);
                                    }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
