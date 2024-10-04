import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/BuyerList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function BuyerList() {
    const [buyers, setBuyers] = useState([]);

    // Fetch buyers from the backend
    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                // Using useApi for the API call
                const apiResponse = await useApi({
                    url: '/api/buyers', // Adjust the URL if needed
                    method: 'GET',
                });

                if (apiResponse && apiResponse.error) {
                    console.error('Error fetching buyers:', apiResponse.error.message);
                } else {
                    setBuyers(apiResponse); // Set buyers state with the response data
                }
            } catch (error) {
                console.error('Error fetching buyers:', error);
            }
        };

        fetchBuyers();
    }, []);

    return (
        <div className={`screen ${Styles.buyerScreen}`}>
            <Header />
            <div className={Styles.buyerListContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>Buyers List</h1>
                <table className={Styles.buyerTable}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Bio</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.length > 0 ? (
                            buyers.map((buyer) => (
                                <tr key={buyer._id}>
                                    <td>{buyer.usrFullName}</td>
                                    <td>{buyer.usrEmail}</td>
                                    <td>{buyer.usrMobileNumber}</td>
                                    <td>{buyer.userBio}</td>
                                    <td>
                                        <DeleteIcon style={{ cursor: 'pointer', color: 'red', margin: '10px' }} />
                                        <EditIcon style={{ cursor: 'pointer', color: 'blue' }} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No buyers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default BuyerList;
