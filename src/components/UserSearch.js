import React, { useState, useRef, useEffect} from 'react';
import Axios from 'axios';
import '../css/Users.css'


function Search(props) {
   const pseudoRef = useRef('')
   const [pseudo, setPseudo] = useState('')
   const [user, setUser] = useState(null)

   useEffect(()=>{
    props.setUserfilter(pseudo)// call the function setUserfilter with pseudo as argument
   })

    const onChange = (event)=>{
      console.log("setPseudo(event.target.value)",setPseudo(event.target.value))
      
    }

    const handleSubmit =(event)=>{
      event.preventDefault()
      console.log("pseudo", pseudo)
      Axios.get(`http://localhost:3001/user/pseudo/${pseudo}`,
   
      { headers: {
       Authorization:"Bearer " + window.localStorage.getItem("jwt"),
     }})
     .then((response) => {
       console.log(response);
       if(response.data.length === 0){
        alert("no user found")
       }
       else {
        setUser(response.data[0])
       }
   })
      
   }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <label>PSEUDO</label>
        
            <div className="searchBar">
            <input name ="pseudo" type= "text" value={pseudo} onChange={onChange} className="search" placeholder="Search pseudo"/>
            {/* <input type= "submit" value ="search" className = "btn btn-search"/> */}
            </div>
      
        
    </form>
    {user ? <p>{user.name}</p> : null}
    </div>
  );
}

export default Search;
