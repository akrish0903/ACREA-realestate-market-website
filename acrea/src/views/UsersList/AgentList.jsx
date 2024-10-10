import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/UsersList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Config } from '../../config/Config';

function AgentList() {
    const [agents, setAgents] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedAgent, setEditedAgent] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState(null);
    const userAuthData = useSelector((data) => data.AuthUserDetailsSlice);
    console.log("user auth data ---> ", userAuthData);

    // Fetch agents list
    async function fetchAgentsList() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/agentslist",
                method: "GET",
            });

            if (response && response.user_agentlist_arr) {
                setAgents(response.user_agentlist_arr);
            } else {
                console.error("Failed to fetch agents:", response.message);
            }
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    }

    // Update agent's profile
    async function updateAgent(agentId) {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/admin-updateagent/${agentId}`,
                method: "PUT",
                data: editedAgent,
            });

            if (response && response.message) {
                console.log("Agent profile updated successfully");
                fetchAgentsList();
                setEditMode(null);
            }
        } catch (error) {
            console.error("Error updating agent:", error);
        }
    }

    // Handle delete dialog open
    const handleDeleteClick = (agent) => {
        setAgentToDelete(agent);
        setOpenDeleteDialog(true);
    };

    // Confirm delete agent
    async function confirmDeleteAgent() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/admin-deleteagent/${agentToDelete._id}`,
                method: "DELETE",
            });

            if (response && response.message) {
                console.log("Agent deleted successfully");
                fetchAgentsList();
            }
        } catch (error) {
            console.error("Error deleting agent:", error);
        } finally {
            setOpenDeleteDialog(false);
        }
    }

    useEffect(() => {
        if (userAuthData.usrType === "admin") {
            fetchAgentsList();
        }
    }, [userAuthData]);

    const handleEdit = (agent) => {
        setEditMode(agent._id);
        setEditedAgent(agent);
    };

    const handleInputChange = (e, field) => {
        setEditedAgent({ ...editedAgent, [field]: e.target.value });
    };

    return (
        <div className={`screen ${Styles.userlistScreen}`}>
            <Header />
            <div className={Styles.userListContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>Agents List</h1>
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
                        {agents.length > 0 ? (
                            agents.map((agent) => (
                                <tr key={agent._id}>
                                    <td>
                                        {editMode === agent._id ? (
                                            <input
                                                type="text"
                                                value={editedAgent.usrFullName}
                                                onChange={(e) => handleInputChange(e, "usrFullName")}
                                            />
                                        ) : (
                                            agent.usrFullName
                                        )}
                                    </td>
                                    <td>{agent.usrEmail}</td>
                                    <td>
                                        {editMode === agent._id ? (
                                            <input
                                                type="text"
                                                value={editedAgent.usrMobileNumber}
                                                onChange={(e) => handleInputChange(e, "usrMobileNumber")}
                                            />
                                        ) : (
                                            agent.usrMobileNumber
                                        )}
                                    </td>
                                    <td>
                                        {editMode === agent._id ? (
                                            <input
                                                type="text"
                                                value={editedAgent.userBio}
                                                onChange={(e) => handleInputChange(e, "userBio")}
                                            />
                                        ) : (
                                            agent.userBio
                                        )}
                                    </td>
                                    <td>
                                        {editMode === agent._id ? (
                                            <>
                                                <button
                                                    onClick={() => updateAgent(agent._id)}
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
                                                    onClick={() => handleEdit(agent)}
                                                />
                                                <DeleteIcon
                                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                                    onClick={() => handleDeleteClick(agent)}
                                                />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No agents found</td>
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
                        Are you sure you want to delete the agent <b>{agentToDelete?.usrFullName}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteAgent} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AgentList;
