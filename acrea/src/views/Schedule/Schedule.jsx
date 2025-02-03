import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Styles from './css/Schedule.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';
import useApi from '../../utils/useApi';

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userAuthData = useSelector(data => data.AuthUserDetailsSlice);

  const { propertyData, agentData } = location.state || {};

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [buyerName, setBuyerName] = useState(userAuthData?.usrFullName || '');
  const [contact, setContact] = useState(userAuthData?.usrMobileNumber || '');
  const [notes, setNotes] = useState('');


  const handleSchedule = async () => {
    const scheduleData = { propertyData, agentData, date, time, buyerName, contact, notes };

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/schedule`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userAuthData.usrAccessToken}`
            },
            body: JSON.stringify(scheduleData)
        });

        const result = await response.json();

        console.log("Response from backend:", result);
        const { razorpayKeyId } = result;

        if (razorpayKeyId) {
            // Check if Razorpay is loaded
            if (window.Razorpay) {
                const options = {
                    key: razorpayKeyId,
                    amount: 50000,
                    currency: "INR",
                    name: "Property Visit",
                    description: "Schedule Payment",
                    handler: function (response) {
                        console.log(response);
                        navigate('/');
                    },
                    prefill: {
                        name: buyerName,
                        contact: contact,
                    },
                    theme: {
                        color: "#F37254"
                    }
                };
                const paymentWindow = new window.Razorpay(options);
                paymentWindow.open();
            } else {
                console.error("Razorpay SDK not loaded.");
                alert('Razorpay SDK not loaded. Please try again later.');
            }
        } else {
            alert('Payment link not found. Please try again.');
        }      
    } catch (error) {
        console.error('Failed to schedule visit:', error);
        alert('There was an error scheduling the visit.');
    }
};



  return (
    <div className={`screen ${Styles.scheduleScreen}`}>
      <Header />
      <div className={Styles.scheduleContainer}>
        <h2>Schedule a Property Visit</h2>
        <form className={Styles.formContainer}>
          <label>
            Name:
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Number:
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
          <label>
            Additional Notes:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>
          <button
            type="button"
            className={Styles.scheduleButton}
            onClick={handleSchedule}
          >
            Proceed to Pay ₹500
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;