import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';

import axios from "axios";
import "./Changepassword.css";
import Swal from "sweetalert2";

function Changepassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async (event) => {
        // console.log("handleChangePassword: ",handleChangePassword);
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("New password do not match");
            return;
        }

        try{

            const token = localStorage.getItem("token");
            console.log("token: ",token);
            const response = await axios.patch(
                'http://localhost:3000/changepassword',
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("response: ",response);

            Swal.fire({
                icon: "success",
                title: "success",
                text:response.data.message
            }).then(()=>{
                navigate('/login');
            })
        } catch (error) {
            console.log('Error',error);
            setErrorMessage("Failed to change password");
        }
    };

    return(
        <div className="change-password-container">
            <h2>change password</h2>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <input type="password" placeholder="currentPassword" value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)}/>

                </div>
                <div className="form-group">
                    <input type="password" placeholder="newPassword" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <button type="submit" className="button">Change password</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default Changepassword;