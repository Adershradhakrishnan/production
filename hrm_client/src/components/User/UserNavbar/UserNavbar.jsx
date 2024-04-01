import React from "react";
import {BrowserRouter as Router,Route,Routes,Link, useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import './UserNavbar.css';

function UserNavbar(){

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return(
        <>
        <nav>
            <div className="listnav">
                <h3>Welcome</h3>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Services</li>
                </ul>
                <div className="buttonss">


                    <div>
                        <Link to="/changepassword"><button>Changepassword</button></Link>
                    </div>
                    <div className="button3">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>

            </div>
        </nav>
        </>
    )
}

export default UserNavbar;