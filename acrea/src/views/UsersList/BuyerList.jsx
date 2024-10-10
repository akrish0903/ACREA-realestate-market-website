import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/UsersList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Config } from '../../config/Config';

function BuyerList() {
    const [buyers, setBuyers] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedBuyer, setEditedBuyer] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to manage dialog
    const [buyerToDelete, setBuyerToDelete] = useState(null); // Store buyer to delete
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

    // Handle delete dialog open
    const handleDeleteClick = (buyer) => {
        setBuyerToDelete(buyer); // Store the buyer to delete
        setOpenDeleteDialog(true); // Open the dialog
    };

    // Confirm delete buyer
    async function confirmDeleteBuyer() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/admin-deletebuyer/${buyerToDelete._id}`,
                method: "DELETE",
            });

            if (response && response.message) {
                console.log("Buyer deleted successfully");
                fetchBuyersList(); // Refresh list after deletion
            }
        } catch (error) {
            console.error("Error deleting buyer:", error);
        } finally {
            setOpenDeleteDialog(false); // Close the dialog
        }
    }

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
                                                    style={{ color: Config.color.background, backgroundColor:Config.color.success}}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditMode(null)}
                                                    className={Styles.deleteBtn}
                                                    style={{ color: Config.color.background, backgroundColor:Config.color.primaryColor800}}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <EditIcon
                                                    style={{ cursor: 'pointer', color: 'blue' }}
                                                    onClick={() => handleEdit(buyer)}
                                                />
                                                <DeleteIcon
                                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                                    onClick={() => handleDeleteClick(buyer)} // Handle delete dialog
                                                />
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
         

            {/* Dialog for delete confirmation */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the buyer <b>{buyerToDelete?.usrFullName}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteBuyer} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default BuyerList;
