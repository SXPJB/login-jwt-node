import React from 'react';
import {getUser, removeUserSession} from "../utils/Common";

export default function Dashboard(props){

    const user=getUser();
    //handle click of logout button
    const handleLogout=()=>{
        console.log("click")
        removeUserSession();
        props.history.push('/login')
    }

    return(
        <div className='container text-center'>
            <h1>Welcome {user.name}!</h1>
            <input className='btn btn-danger mt-2' type="button" onClick={handleLogout} value="Logout"/>
        </div>
    )
}
