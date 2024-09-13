import React, { useState } from 'react'
import Styles from "./css/Header.module.css"
import { Config } from '../config/Config'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown_Bootstrap from './Dropdown_Bootstrap';

function Header() {
    const navigation = useNavigate();
    var userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownDataArr = [
        {
            title: "Edit Account",
            navigate: "",
            customDom: null
        },
        {
            title: "My Proper",
            navigate: "",
            customDom: null
        },
        {
            title: "",
            navigate: "",
            customDom: null
        },
        {
            title: "",
            navigate: "",
            customDom: null
        },
    ]


    return (
        <div
            className={Styles.headerScreen}
            style={{
                backgroundColor: Config.color.primaryColor800
            }}
        >
            <div className={Styles.headerScreenLeft}>
                <img
                    src={Config.imagesPaths.logo2}
                    className={Styles.screenRightContainerImg}
                    style={{
                        objectFit: 'contain',
                        width: "100%",
                        height: "100%"
                    }}
                />
            </div>
            <div className={Styles.headerScreenRight}>
                <div className={Styles.headerScreenRightFirst}>
                    <NavLink
                        to={"/"}
                        style={{
                            textDecoration: 'none',
                            height: "2rem"
                        }}
                        className={({ isActive }) => { console.log(isActive) }}
                    >
                        <h6 style={{ color: Config.color.background, borderBottom: `4px ${Config.color.primaryColor1000} solid` }}>HOME</h6>
                    </NavLink>
                    <h6 style={{ color: Config.color.background }}>SELL</h6>
                    <h6 style={{ color: Config.color.background }}>AGENTS</h6>
                    <h6 style={{ color: Config.color.background }}>ABOUT US</h6>
                </div>

                <div
                    className={Styles.headerScreenRightSecond}
                    style={{ height: "88%" }}
                    onClick={() => {
                        userAuthData.usrEmail === null ?
                            navigation("/signin") :
                            null;
                        userAuthData.usrEmail === null ?
                            null :
                            setIsDropdownOpen(true);
                    }}>
                    {userAuthData.usrEmail === null ? (
                        <>
                            <AccountCircleIcon
                                style={{
                                    objectFit: "contain",
                                    color: Config.color.background,
                                    width: "3rem",
                                    height: "3rem"
                                }}
                            />
                            <p style={{ color: Config.color.background }}>Sign In/Register</p>
                        </>) : (
                        <>
                            <div style={{
                                borderRadius: "50%",
                                overflow: "hidden",
                            }}>
                                <img src={Config.imagesPaths.user_null} style={{
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
                                >{userAuthData.usrEmail}</p>
                                <Dropdown_Bootstrap isDropdownOpen={isDropdownOpen} />
                            </div>

                        </>

                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header