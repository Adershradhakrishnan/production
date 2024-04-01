import React, {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import UserNavbar from "./UserNavbar/UserNavbar";
import UserFooter from "./UserFooter/UserFooter";
import Spinner from "../Spinners/Spinners";
import Swal from "sweetalert2";
import './User.css';

function User() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setLoading(false);
        },2000);
        return () => clearTimeout(timeout);
    }, []);

    const isTokenPresent = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    useEffect(() => {
        if (!isTokenPresent()) {
            Swal.fire({
                title: "Error",
                text: "You need to login to access the user area.",
                icon: "error",
                button: "Login",
            }).then(()=> {
                navigate('/login');
            });
        }
    },[navigate]);

    if (!loading) {
        return (
            <>
            <UserNavbar/>
            <div className="userlogin">
                <div className="hii">
                    <h1>Name</h1>
                    <ul className="userlist">
                        <li>Edit</li>
                        <li>Settings</li>
                        <li>View</li>
                    </ul>
                </div>
                
            </div>
            <div className="footer">
                <UserFooter/>
            </div>
            </>
        );
    } else {
        return <Spinner />
    }
}

export default User;