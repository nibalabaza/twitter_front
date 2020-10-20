import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { FaUserPlus, FaUnlock, FaFacebookF, FaGofore, FaLinkedinIn, FaPinterestP} from "react-icons/fa";
import '../css/Login.css'

function Login(props) {
const[email, setEmail] = useState('');
const[password, setPassword] = useState('');

const login = () => {
    console.log(email , password); 
    Axios.post('http://localhost:3001/user/login', {
        email: email,
        password: password,
    }).then((response) => {
        console.log(response);
        const jwt = response.data// to rceive the JWT from b/e
        const storage = window.localStorage
        storage.setItem("jwt", jwt)
        console.log(jwt)
        if(jwt){
            props.history.push('/')
        }
    })
}
console.log("props", props)
console.log("props.history", props.history)
    return (
    <div className="container">
        <div className="forms-container">
            <div className="signin">
                <div className="sign-in-form">
                    <h1 className="title">Sign in</h1>
                    <div className="input-field">
                    <FaUserPlus className="iconUser" />
                    <input type="text" onChange ={(e)=>{setEmail(e.target.value)}} placeholder="Username"/><br/>
                    </div>
                    <div className="input-field">
                    <FaUnlock className="iconUser"/>
                    <input type="text" onChange ={(e)=>{setPassword(e.target.value)}}  placeholder="Password"/><br/>
                    </div>
                    <button className="btn" onClick={()=>login(props.history)} >Submit</button>
                    
                    <div class="social-media">
                    <a href="#" class="social-icon">
                        <FaFacebookF/>
                    </a>
                    <a href="#" class="social-icon">
                        <FaGofore/>
                    </a>
                    <a href="#" class="social-icon">
                        <FaLinkedinIn/>
                    </a>
                    <a href="#" class="social-icon">
                        <FaPinterestP/>
                    </a>
                    </div>
                    <p class="social-text">You don't have an account?</p><Link to="register">SIGNUP</Link>
                    
                </div>
            </div>
        </div>
    </div>
  );
}
export default Login;
