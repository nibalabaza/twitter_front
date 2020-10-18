import React, { useState, useEffect } from 'react';
import { FaUserPlus} from "react-icons/fa"
import Axios from 'axios';
import UserSearch from './UserSearch';
import '../css/Users.css'

function Users() {
    const[users, setUsers] = useState([]);
    const[userfilter, setUserfilter] = useState("");
    console.log("hello")
        useEffect(()=>{
            console.log("useEffect")
            Axios.get('http://localhost:3001/user', {
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
    
    <div className="container">
        <div className="row">
        <div className="col">
            <h2>All users</h2>
        </div>
        <div className="col">
        <UserSearch setUserfilter = {setUserfilter}></UserSearch>

        <h1>ALL USERS</h1>
        {users.filter(user => user.pseudo.toUpperCase().includes(userfilter.toUpperCase())).map(user=>{
            console.log("USER", user)
            return (
                <ul class="listUsers">
                    
                <FaUserPlus className="iconUser" />
                <li>{user.pseudo}</li>
                <li> {user.name}</li>
                {!user.is_followed ? <button className="btn btn-follow" >Suivre</button> : null}
                </ul>
                
             )
         })}
         </div>
         </div>
    </div>
  );
}

export default Users;
