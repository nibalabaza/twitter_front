import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Users from "./components/Users";
import UserSearch from "./components/UserSearch"
import './App.css';
import Sidebar from "./components/Sidebar";
import Twittes from "./components/Twittes";
import Right from "./components/Right";
import Followed from "./components/Followed"


function App() {
  return (
    <div className="Container">
      <div className="row">
      {/* <Login></Login> */}
      <div className="col-3">
      <Sidebar></Sidebar>
      </div>
      <div className="col-6">
        <Router> 
           <div className="App"> 
            <Switch> 
              <Route exact path='/' component= {(props)=> window.localStorage.getItem("jwt") ? <Twittes {...props}/> : <Login {...props}/>}></Route> //the props are passed by the router 
              <Route exact path='/register' component={Register}></Route> 
              <Route exact path='/users' component={Users}></Route> 
              <Route exact path='/usersfollowed' component={Followed}></Route> 
            </Switch> 
          </div> 
       </Router> 
       </div>
       <div className="col-3">
       <Right></Right>
       </div>
        {/* <Register></Register>
        <CreatePost></CreatePost> */}
        </div>
    </div>
  );
}

export default App;
