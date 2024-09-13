import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import Header from '../../components/Header';
import Styles from "./css/Dashboard.module.css";

function Dashboard() {
    var userAuthData = useSelector(data => data.AuthUserDetailsSlice)

    return (
        <div className={`screen ${Styles.dashboardScreen}`}>
            <Header />
            

            
        </div>
    )
}

export default Dashboard