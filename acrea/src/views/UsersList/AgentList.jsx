import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/UsersList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import { Config } from '../../config/Config';
import { useNavigate } from 'react-router-dom';

function AgentList() {
    const [agents, setAgents] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedAgent, setEditedAgent] = useState({});
    const userAuthData = useSelector((data) => data.AuthUserDetailsSlice);
    var navigation = useNavigate();
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

    

    useEffect(() => {
        if (userAuthData.usrType === "admin"|| userAuthData.usrType === 'buyer') {
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
    
    const toggleUserStatus = async (agentId, currentStatus) => {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/toggle-user-status/${agentId}`,
                method: "PUT",
            });
    
            if (response && response.message) {
                console.log(response.message);
                fetchAgentsList(); // Refresh the list after toggling status
            }
        } catch (error) {
            console.error("Error toggling user status:", error);
        }
    };

    return (
        <div className={`screen ${Styles.userlistScreen}`}>
            <Header />
            <div className={Styles.userListContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>Agents/Owners List</h1>
                <table className={Styles.userListTable} style={{fontSize:Config.fontSize.regular}}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Type</th>
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
                                        {agent.usrType}
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
                                    {userAuthData.usrType === 'admin' && ( <>
                                        {editMode === agent._id ? (
                                            <>
                                                <button
                                                    onClick={() => updateAgent(agent._id)}
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
                                                    onClick={() => handleEdit(agent)}>
                                                    <EditIcon/>Edit
                                                </button>
                                                <button
                                                    onClick={() => toggleUserStatus(agent._id, agent.usrStatus)}
                                                    style={{
                                                        color: Config.color.background,
                                                        backgroundColor: agent.usrStatus ? Config.color.success : Config.color.warning,
                                                        marginLeft: '10px ',
                                                        marginRight:"10px",
                                                        padding: '0.5rem',
                                                        borderRadius: '5px'
                                                    }}
                                                >
                                        {agent.usrStatus ? 'Disable' : 'Enable'}
                                    </button>
                                    <button 
                                            onClick={() => {
                                                console.log({agent})
                                                navigation('/AgentDetails', { state: agent }) }}
                                                style={{
                                                    color: Config.color.background,
                                                    backgroundColor: Config.color.primaryColor900,
                                                    width: "fit-content",
                                                    padding: ".5rem",
                                                    paddingLeft: ".8rem",
                                                    paddingRight: ".8rem",
                                                    fontSize: Config.fontSize.small,
                                                    borderRadius: "5px"
                                                }}
                                        >
                                            Details
                                        </button>
                                            </>
                                        )}
                                        </>
                                    )}
                                    {userAuthData.usrType === 'buyer' && ( <button 
                                            onClick={() => {
                                                console.log({agent})
                                                navigation('/AgentDetails', { state: agent }) }}
                                                style={{
                                                    color: Config.color.background,
                                                    backgroundColor: Config.color.primaryColor900,
                                                    width: "fit-content",
                                                    padding: ".5rem",
                                                    paddingLeft: ".8rem",
                                                    paddingRight: ".8rem",
                                                    fontSize: Config.fontSize.small,
                                                    borderRadius: "5px"
                                                }}
                                        >
                                            Details
                                        </button>
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
        </div>
    );
}

export default AgentList;
