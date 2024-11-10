import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/Schedule.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Config } from '../../config/Config';

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedSchedule, setEditedSchedule] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);
    const userAuthData = useSelector((data) => data.AuthUserDetailsSlice);

    // Fetch schedules list
    async function fetchAgentSchedulesList() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/agent-scheduleslist",
                method: "GET",
            });
    
            if (response && response.schedule_list) {
                setSchedules(response.schedule_list);
            } else if (response.message) {
                console.warn(response.message);
                setSchedules([]); // To trigger "No schedules found" display
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    }

    async function fetchBuyerSchedulesList() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/buyer-scheduleslist",
                method: "GET",
            });
    
            if (response && response.schedule_list) {
                setSchedules(response.schedule_list);
            } else if (response.message) {
                console.warn(response.message);
                setSchedules([]); // To trigger "No schedules found" display
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    }
    

    // Update schedule
    async function updateAgentSchedule(scheduleId) {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/update-agent-schedule/${scheduleId}`,
                method: "PUT",
                data: editedSchedule,
            });

            if (response && response.message) {
                console.log("Schedule updated successfully");
                fetchAgentSchedulesList();
                setEditMode(null);
            }
        } catch (error) {
            console.error("Error updating schedule:", error);
        }
    }

    async function updateBuyerSchedule(scheduleId) {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/update-buyer-schedule/${scheduleId}`,
                method: "PUT",
                data: editedSchedule,
            });

            if (response && response.message) {
                console.log("Schedule updated successfully");
                fetchBuyerSchedulesList();
                setEditMode(null);
            }
        } catch (error) {
            console.error("Error updating schedule:", error);
        }
    }

    // Handle delete dialog open
    const handleDeleteClick = (schedule) => {
        setScheduleToDelete(schedule);
        setOpenDeleteDialog(true);
    };

    // Confirm delete schedule
    async function confirmDeleteSchedule() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/delete-schedule/${scheduleToDelete._id}`,
                method: "DELETE",
            });

            if (response && response.message) {
                console.log("Schedule deleted successfully");
                fetchAgentSchedulesList();
            }
        } catch (error) {
            console.error("Error deleting schedule:", error);
        } finally {
            setOpenDeleteDialog(false);
        }
    }

    useEffect(() => {
        fetchAgentSchedulesList();
        fetchBuyerSchedulesList
    }, [userAuthData]);

    const handleEdit = (schedule) => {
        setEditMode(schedule._id);
        setEditedSchedule(schedule);
    };

    const handleInputChange = (e, field) => {
        setEditedSchedule({ ...editedSchedule, [field]: e.target.value });
    };

    return (
        <div className={`screen ${Styles.scheduleScreen}`}>
            <Header />
            <div className={Styles.scheduleContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>Schedule List</h1>
                <table className={Styles.scheduleTable} style={{ fontSize: Config.fontSize.regular }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Buyer Name</th>
                            <th>Contact</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.length > 0 ? (
                            schedules.map((schedule) => (
                                <tr key={schedule._id}>
                                    <td>{editMode === schedule._id ? (
                                        <input
                                            type="text"
                                            value={editedSchedule.date}
                                            onChange={(e) => handleInputChange(e, "date")}
                                        />
                                    ) : (
                                        schedule.date
                                    )}</td>
                                    <td>{editMode === schedule._id ? (
                                        <input
                                            type="text"
                                            value={editedSchedule.time}
                                            onChange={(e) => handleInputChange(e, "time")}
                                        />
                                    ) : (
                                        schedule.time
                                    )}</td>
                                    <td>{schedule.buyerName}</td>
                                    <td>{schedule.contact}</td>
                                    <td>{editMode === schedule._id ? (
                                        <input
                                            type="text"
                                            value={editedSchedule.notes}
                                            onChange={(e) => handleInputChange(e, "notes")}
                                        />
                                    ) : (
                                        schedule.notes
                                    )}</td>
                                    <td>
                                    {userAuthData.usrType === 'agent' && (
                                        <>
                                        {editMode === schedule._id ? (
                                            <>
                                                <button
                                                    onClick={() => updateAgentSchedule(schedule._id)}
                                                    className={Styles.editBtn}
                                                    style={{ color: Config.color.background, backgroundColor: Config.color.success }}
                                                >
                                                    Save
                                                </button>
                                                {/* <button
                                                    onClick={() => setEditMode(null)}
                                                    className={Styles.deleteBtn}
                                                    style={{ color: Config.color.background, backgroundColor: Config.color.primaryColor800 }}
                                                >
                                                    Cancel
                                                </button> */}
                                            </>
                                        ) : (
                                            <>
                                                <EditIcon
                                                    style={{ cursor: 'pointer', color: 'blue' }}
                                                    onClick={() => handleEdit(schedule)}
                                                />
                                                {/* <DeleteIcon
                                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                                    onClick={() => handleDeleteClick(schedule)}
                                                /> */}
                                            </>
                                        )}
                                    </>)}
                                    {userAuthData.usrType === 'buyer' && (
                                        <>
                                        {editMode === schedule._id ? (
                                            <>
                                                <button
                                                    onClick={() => updateBuyerSchedule(schedule._id)}
                                                    className={Styles.editBtn}
                                                    style={{ color: Config.color.background, backgroundColor: Config.color.success }}
                                                >
                                                    Save
                                                </button>
                                                {/* <button
                                                    onClick={() => setEditMode(null)}
                                                    className={Styles.deleteBtn}
                                                    style={{ color: Config.color.background, backgroundColor: Config.color.primaryColor800 }}
                                                >
                                                    Cancel
                                                </button> */}
                                            </>
                                        ) : (
                                            <>
                                                <EditIcon
                                                    style={{ cursor: 'pointer', color: 'blue' }}
                                                    onClick={() => handleEdit(schedule)}
                                                />
                                            </>
                                        )}
                                    </>)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No schedules found</td>
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
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the schedule with buyer <b>{scheduleToDelete?.buyerName}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteSchedule} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleList;
