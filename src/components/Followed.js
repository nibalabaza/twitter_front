import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Followed() {
    const[users, setUsers] = useState([]);
    console.log("hello")
        useEffect(()=>{
            console.log("useEffect")
            Axios.get('http://localhost:3001/user/usersfollowed', {
                 headers: {
                Authorization:"Bearer " + window.localStorage.getItem("jwt"),
                "Content-Type" : "multipart/form-data"
              }
        }).then((response) => {
            console.log(response.data);
            setUsers(response.data)
           
        })
    },[])
    
  return (
    
    <div className="users">

        <h1>ALL USERS</h1>
        {users.map(user=>{
            console.log("USER", user)
            return (
                <ul class="listUsersFollowed">
                <li>{user.pseudo}</li>
                <li> {user.name}</li>
                <li> {user.avatar}</li>
                
                </ul>
                )
            })}
    </div>
  );
}

export default Followed;
