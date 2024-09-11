import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';

function Dashboard() {
    var data = useSelector(data => data.AuthUserDetailsSlice)
   
    console.log("redux",data)
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard