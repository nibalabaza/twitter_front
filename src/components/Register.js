import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUnlock,FaEnvelope, FaFacebookF, FaGofore, FaLinkedinIn, FaPinterestP} from "react-icons/fa";
import Axios from 'axios';


function Register(props) {
const[name, setName] = useState('');
const[pseudo, setPseudo] = useState('');
const[email, setEmail] = useState('');
const[password, setPassword] = useState('');


const register = () => {
  console.log(props)
    Axios.post('http://localhost:3001/user/register', {
        name: name,
        pseudo: pseudo,
        email: email,
        password: password,
    }).then((response) => {
        console.log(response);
        if(response.status===200){
          props.history.push("/")
        }
    })
}
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin">
            <div className="sign-in-form">
              <h1>SINGNUP</h1>
              <div className="input-field">
                    <FaUserPlus className="iconUser" />
                    <input type="text" onChange ={(e)=>{setName(e.target.value)}} placeholder="First Name"/><br/>
              </div>
              <div className="input-field">
                    <FaUserPlus className="iconUser" />
              <input type="text" onChange ={(e)=>{setPseudo(e.target.value)}} placeholder="Last Name"/><br/>
              </div>
              <div className="input-field">
                    <FaEnvelope className="iconUser" />
              <input type="email" onChange ={(e)=>{setEmail(e.target.value)}} placeholder="someone@gmail.com"/><br/>
              </div>
              <div className="input-field">
                    <FaUnlock className="iconUser" />
              <input type="password" onChange ={(e)=>{setPassword(e.target.value)}} placeholder="Password"/><br/>
              </div>

              <button className="btn" onClick= {register}>Submit</button>

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
                    <p class="social-text">You have an account?</p><Link to="login" className="sign">SIGNIN</Link>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Register;