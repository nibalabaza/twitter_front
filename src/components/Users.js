import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserSearch from './UserSearch';


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
    
    function followUser(id_user){
        const url = `http://localhost:3001/user/${id_user}/follow`
        const authValue = "Bearer " + window.localStorage.getItem("jwt")
        Axios.post(url,{}, {
            headers: {
                Authorization : authValue
            } 
        }).then(response => {
            if(response.status === 200){
                const modifiedUser = [...users]
                modifiedUser.forEach(user =>{
                    if(user.id_user=== id_user){
                        user.is_followed = 1 //follow the user
                    }
                })
                setUsers(modifiedUser)
                console.log("modifiedUser",modifiedUser)
            }
        })

    }
    return (
    
    <>
        
        <UserSearch setUserfilter = {setUserfilter}></UserSearch>
        <div className="container mt-4">
            {users ? users.filter(user => user.pseudo.toUpperCase().includes(userfilter.toUpperCase())).map(user=>{
            console.log("USER", user)
            return (
                
                    
                    <div className="row vertical-align">
                        <div className="col-3"><img className="avatar" src="/assets/nibal.png" alt="" /></div>
                            <div className="col-3">{user.pseudo} </div>
                            <div className="col-3"> {user.name}</div>

                            {!user.is_followed ?<div className="col-3" ><button onClick={()=>followUser(user.id_user)} className="btn btn-follow" >FOLLOW</button></div>  : null}
                            {user.is_followed ? <div className="col-3"><button className="btn btn-followed" >FOLLOWED</button></div>  : null}
                    </div>
               
             )
         }) : null}
       </div>
       </>
    
  );
}

export default Users;
