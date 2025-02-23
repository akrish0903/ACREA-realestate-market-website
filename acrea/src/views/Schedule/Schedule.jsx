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

  // Add error state
  const [errors, setErrors] = useState({
    buyerName: '',
    contact: '',
    date: '',
    time: '',
  });

  // Add validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!buyerName.trim()) {
      newErrors.buyerName = 'Name is required';
      isValid = false;
    } else if (buyerName.trim().length < 3) {
      newErrors.buyerName = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Contact validation
    if (!contact) {
      newErrors.contact = 'Contact number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(contact)) {
      newErrors.contact = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    // Date validation
    if (!date) {
      newErrors.date = 'Date is required';
      isValid = false;
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
        isValid = false;
      }
    }

    // Time validation
    if (!time) {
      newErrors.time = 'Time is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSchedule = async () => {
    if (!validateForm()) {
      return;
    }

    const scheduleData = { propertyData, agentData, date, time, buyerName, contact, notes };

    try {
        // First, get the Razorpay key from backend without creating schedule
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/get-razorpay-key`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${userAuthData.usrAccessToken}`
            }
        });

        const result = await response.json();

        console.log("Response from backend:", result);
        const { razorpayKeyId } = result;

        if (razorpayKeyId) {
            if (window.Razorpay) {
                const options = {
                    key: razorpayKeyId,
                    amount: 50000,
                    currency: "INR",
                    name: "Property Visit",
                    description: "Schedule Payment",
                    handler: async function (paymentResponse) {
                        try {
                            // Only create schedule after successful payment
                            const scheduleResponse = await fetch(`${import.meta.env.VITE_BASE_API_URL}/schedule`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${userAuthData.usrAccessToken}`
                                },
                                body: JSON.stringify({
                                    ...scheduleData,
                                    paymentId: paymentResponse.razorpay_payment_id
                                })
                            });

                            const scheduleResult = await scheduleResponse.json();
                            
                            if (scheduleResult.success) {
                                navigate('/');
                            } else {
                                alert('Failed to schedule visit. Please contact support.');
                            }
                        } catch (error) {
                            console.error('Error creating schedule:', error);
                            alert('There was an error scheduling the visit.');
                        }
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
            alert('Payment initialization failed. Please try again.');
        }      
    } catch (error) {
        console.error('Failed to initialize payment:', error);
        alert('There was an error initializing the payment.');
    }
};

  return (
    <div className={`screen ${Styles.scheduleScreen}`}>
      <Header />
      <div className={Styles.scheduleContainer} id="scheduleContainer">
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
            {errors.buyerName && <span className={Styles.errorText}>{errors.buyerName}</span>}
          </label>
          <label>
            Contact Number:
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            {errors.contact && <span className={Styles.errorText}>{errors.contact}</span>}
          </label>
          <label>
            Date:
            <input
              type="date"
              id="visitDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {errors.date && <span className={Styles.errorText}>{errors.date}</span>}
          </label>
          <label>
            Time:
            <input
              type="time"
              id="visitTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            {errors.time && <span className={Styles.errorText}>{errors.time}</span>}
          </label>
          <label>
            Additional Notes:
            <textarea
              id="visitNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>
          <button
            type="button"
            id="proceedToPayBtn"
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