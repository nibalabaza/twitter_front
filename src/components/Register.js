import React, { useState } from 'react';
import Axios from 'axios';


function Register() {
const[name, setName] = useState('');
const[pseudo, setPseudo] = useState('');
const[email, setEmail] = useState('');
const[password, setPassword] = useState('');


const register = () => {
    Axios.post('http://localhost:3001/user/register', {
        name: name,
        pseudo: pseudo,
        email: email,
        password: password,
    }).then((response) => {
        console.log(response);
    })
}
  return (
    <div className="login">
        <h1>Register</h1>
        <label>Name</label><br/>
        <input type="text" onChange ={(e)=>{setName(e.target.value)}} placeholder="First Name"/><br/>
       <input type="text" onChange ={(e)=>{setPseudo(e.target.value)}} placeholder="Last Name"/><br/>

        <label>UserName</label><br/>
        <input type="email" onChange ={(e)=>{setEmail(e.target.value)}} placeholder="someone@gmail.com"/><br/>
        <label>Password</label><br/>
        <input type="password" onChange ={(e)=>{setPassword(e.target.value)}} placeholder="Password"/><br/>
        <button onClick= {register}>Submit</button>
    </div>
  );
}

export default Register;