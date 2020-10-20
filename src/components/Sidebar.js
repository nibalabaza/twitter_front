import React from 'react'
import { FaHome, FaHashtag, FaRegBell, FaRegEnvelope, FaRegBookmark, FaClipboardList, FaUserAlt, FaMehBlank, FaBars } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Users from "./Users";
import Followed from "./Followed"


const Sidebar = () => {
    const [state, setState] = React.useState(true);
    const toggle = () => {
        setState(!state);
    }
    return (
        
            <div>
            <span className="toggle" onClick={toggle}><paBars /> </span>
            {state ? (
            
            <ul className="sidebar">
                <li><Link to=""><AiOutlineTwitter className="icon logo" /></Link></li>
                <li><Link to="users"><FaHashtag className="icon logo" /><span>User List</span></Link></li>
                <li><Link to="followed"><FaRegBell className="icon" /><span>UsersFollowed</span></Link></li>
                <li><Link to=""><FaRegEnvelope className="icon" /><span>Messages</span></Link></li>
                <li><Link to=""><FaRegBookmark className="icon" /><span>Bookmarks</span></Link></li>
                <li><Link to="allPosts"><FaClipboardList className="icon" /><span>Lists</span></Link></li>
                <li><Link to=""><FaUserAlt className="icon" /><span>Profile</span></Link></li>
                <li><Link to=""><FaMehBlank className="icon" /><span>More</span></Link></li>
                <li><Link to="" className="profileBtn">Tweet</Link></li>
            </ul >) : ''}
                {/* <Switch>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/followed">
                        <Followed/>
                    </Route>
                </Switch> */}
                </div>
       
    )
}

export default Sidebar
