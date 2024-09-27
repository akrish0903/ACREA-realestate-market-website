import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Config } from '../../config/Config';


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate logout by clearing user data (if any)
        localStorage.removeItem('userAuthData'); // or any other method to remove user session

        // Show the message for 2 seconds, then redirect to dashboard
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{display:'flex',flexDirection:'column', textAlign:'center'}}>
        <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h1 style={{color: Config.color.primaryColor900}}>You have been logged out successfully!</h1>
        </div>
        <div style={{ textAlign: 'center' }}>
            <p>Redirecting to the dashboard...</p>
        </div>
        </div>
    );
};

export default Logout;
