import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { useDispatch } from 'react-redux';
import Styles from './css/Logout.module.css';



const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear the auto logout timer
        const timerId = localStorage.getItem('logoutTimer');
        if (timerId) {
            clearTimeout(Number(timerId));
            localStorage.removeItem('logoutTimer');
        }
        
        // Simulate logout by clearing user data (if any)
        dispatch(AuthUserDetailsSliceAction.setUsrEmail(null));
        dispatch(AuthUserDetailsSliceAction.setUsrFullName(null));
        dispatch(AuthUserDetailsSliceAction.setUsrMobileNumber(null));
        dispatch(AuthUserDetailsSliceAction.setUsrType(null));
        dispatch(AuthUserDetailsSliceAction.setAccessToken(null));
        dispatch(AuthUserDetailsSliceAction.setRefreshToken(null));
        dispatch(AuthUserDetailsSliceAction.setUsrProfileUrl(null));
        dispatch(AuthUserDetailsSliceAction.setUserBio(null));
        localStorage.clear();
        // Show the message for 2 seconds, then redirect to dashboard
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div  className={`screen ${Styles.logoutScreen}`}>
            <div className={Styles.logoutContainer}>
                <h1 style={{ color: Config.color.primaryColor900, fontSize: '3rem', fontWeight: 'bold' }}>You have been logged out successfully!</h1>
                <p style={{fontSize: '1.5rem', fontWeight: 'bold' }}>Redirecting to the dashboard...</p>
                <p>Redirecting to the dashboard...</p>
            </div>
        </div>
    );
};

export default Logout;
