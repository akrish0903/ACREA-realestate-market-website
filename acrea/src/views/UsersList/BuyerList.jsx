import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/UsersList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { Config } from '../../config/Config';

function BuyerList() {
    const [buyers, setBuyers] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedBuyer, setEditedBuyer] = useState({});
    const userAuthData = useSelector((data) => data.AuthUserDetailsSlice);

    // Fetch buyers list
    async function fetchBuyersList() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/buyerslist",
                method: "GET",
            });

            if (response && response.user_buyerlist_arr) {
                setBuyers(response.user_buyerlist_arr);
            } else {
                console.error("Failed to fetch buyers:", response.message);
            }
        } catch (error) {
            console.error("Error fetching buyers:", error);
        }
    }

    // Update buyer's profile
    async function updateBuyer(buyerId) {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/admin-updatebuyer/${buyerId}`,
                method: "PUT",
                data: editedBuyer,
            });

            if (response && response.message) {
                console.log("Buyer profile updated successfully");
                fetchBuyersList();
                setEditMode(null);
            }
        } catch (error) {
            console.error("Error updating buyer:", error);
        }
    }

 

    const toggleUserStatus = async (buyerId, currentStatus) => {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/toggle-user-status/${buyerId}`,
                method: "PUT",
            });

            if (response && response.message) {
                console.log(response.message);
                fetchBuyersList(); // Refresh the list after toggling status
            }
        } catch (error) {
            console.error("Error toggling user status:", error);
        }
    };

    useEffect(() => {
        if (userAuthData.usrType === "admin") {
            fetchBuyersList();
        }
    }, [userAuthData]);

    const handleEdit = (buyer) => {
        setEditMode(buyer._id);
        setEditedBuyer(buyer);
    };

    const handleInputChange = (e, field) => {
        setEditedBuyer({ ...editedBuyer, [field]: e.target.value });
    };

    return (
        <div className={`screen ${Styles.userlistScreen}`}>
            <Header />
            <div className={Styles.userListContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>Buyers List</h1>
                <table className={Styles.userListTable} style={{fontSize:Config.fontSize.regular}}>
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
                                    <td>
                                        {editMode === buyer._id ? (
                                            <input
                                                type="text"
                                                value={editedBuyer.usrFullName}
                                                onChange={(e) => handleInputChange(e, "usrFullName")}
                                            />
                                        ) : (
                                            buyer.usrFullName
                                        )}
                                    </td>
                                    <td>{buyer.usrEmail}</td> {/* Non-editable Email */}
                                    <td>
                                        {editMode === buyer._id ? (
                                            <input
                                                type="text"
                                                value={editedBuyer.usrMobileNumber}
                                                onChange={(e) => handleInputChange(e, "usrMobileNumber")}
                                            />
                                        ) : (
                                            buyer.usrMobileNumber
                                        )}
                                    </td>
                                    <td>
                                        {editMode === buyer._id ? (
                                            <input
                                                type="text"
                                                value={editedBuyer.userBio}
                                                onChange={(e) => handleInputChange(e, "userBio")}
                                            />
                                        ) : (
                                            buyer.userBio
                                        )}
                                    </td>
                                    <td>
                                        {editMode === buyer._id ? (
                                            <>
                                                <button
                                                    onClick={() => updateBuyer(buyer._id)}
                                                    className={Styles.editBtn}
                                                    style={{ color: Config.color.background,
                                                        backgroundColor:Config.color.success,
                                                        marginLeft: '10px',
                                                        padding: '0.5rem',
                                                        borderRadius: '5px'}}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditMode(null)}
                                                    className={Styles.deleteBtn}
                                                    style={{ color: Config.color.background,
                                                        backgroundColor:Config.color.primaryColor800,
                                                        marginLeft: '10px',
                                                        padding: '0.5rem',
                                                        borderRadius: '5px'}}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                               <button style={{ cursor: 'pointer',
                                                    color: Config.color.background,
                                                    backgroundColor:Config.color.primary,
                                                    marginLeft: '10px ',
                                                    padding: '0.5rem',
                                                    borderRadius: '5px' }}
                                                    onClick={() => handleEdit(buyer)}>
                                                    <EditIcon/>Edit
                                                </button>
                                                
                                                <button
                                                    onClick={() => toggleUserStatus(buyer._id, buyer.usrStatus)}
                                                    style={{
                                                        color: Config.color.background,
                                                        backgroundColor: buyer.usrStatus ? Config.color.success : Config.color.warning,
                                                        marginLeft: '10px',
                                                        padding: '0.5rem',
                                                        borderRadius: '5px'
                                                    }}
                                                >
                                                    {buyer.usrStatus ? 'Disable' : 'Enable'}
                                                </button>
                                            </>
                                        )}
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
