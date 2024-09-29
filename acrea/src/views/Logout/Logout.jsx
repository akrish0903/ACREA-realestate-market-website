import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { useDispatch } from 'react-redux';


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
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
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ textAlign: 'center', marginTop: '20vh' }}>
                <h1 style={{ color: Config.color.primaryColor900 }}>You have been logged out successfully!</h1>
            </div>
            <div style={{ textAlign: 'center' }}>
                <p>Redirecting to the dashboard...</p>
            </div>
        </div>
    );
};

export default Logout;
