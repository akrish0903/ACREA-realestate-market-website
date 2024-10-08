//acrea/src/views/UsersList/AgentList.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/BuyerList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';

function AgentList() {
    const [agents, setAgents] = useState([]);
    const userAuthData = useSelector((data) => data.AuthUserDetailsSlice);
    console.log("user auth data ---> ", userAuthData);

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
    
    

    useEffect(() => {
        if (userAuthData.usrType === "admin") {
            fetchAgentsList();
        }
    }, [userAuthData]);
    

    return (
        <div className={`screen ${Styles.buyerScreen}`}>
            <Header />
            <div className={Styles.buyerListContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>agents List</h1>
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
                        {agents.length > 0 ? (
                            agents.map((agent) => (
                                <tr key={agent._id}>
                                    <td>{agent.usrFullName}</td>
                                    <td>{agent.usrEmail}</td>
                                    <td>{agent.usrMobileNumber}</td>
                                    <td>{agent.userBio}</td>
                                    <td>
                                        <DeleteIcon style={{ cursor: 'pointer', color: 'red', margin: '10px' }} />
                                        <EditIcon style={{ cursor: 'pointer', color: 'blue' }} />
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
