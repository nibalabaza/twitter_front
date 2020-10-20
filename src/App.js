import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from "./components/Users";
import './App.css';
import Sidebar from "./components/Sidebar";
import Twittes from "./components/Twittes";
import Right from "./components/Right";
import Followed from "./components/Followed"

function users_array_to_object(users_array){
  let users = {}
  users_array.forEach( user => {
    users[user.id_user] = user
  })
  return users
}

async function get_all_users(setUsers){
  const url = `http://localhost:3001/user/`
  const jwt = window.localStorage.getItem("jwt")
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
  try{
    const response = await fetch(url, fetch_options)
    if(response.ok){
      const users = await response.json()
      setUsers(users_array_to_object(users))
    }
    else{
      console.error(`follow_user fetch failed: ${response}`)
    }
  }
  catch(error){
    console.error(error)
  }
}

function MainOrLogin(props){
  const {store_users} = props;
  return window.localStorage.getItem('jwt')
  ? <Twittes store_users={store_users} {...props}/>
  : <Login {...props}/>
}

function App() {
  const [store_users, set_store_users] = useState({})

  useEffect(() => {
    get_all_users(set_store_users)
  }, [])

  return (
      <Router> 
        <div className="Container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col-6">
              <div className="App"> 
                <Switch>
                  <Route exact path='/' component={props => MainOrLogin({...props, store_users})}></Route>
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/users' component={Users}></Route>
                  <Route exact path='/usersfollowed' component={Followed}></Route>
                </Switch> 
              </div> 
            </div>
            <div className="col-3">
              <Right />
            </div>
          </div>
        </div>
      </Router> 
  );
}

export default App;
