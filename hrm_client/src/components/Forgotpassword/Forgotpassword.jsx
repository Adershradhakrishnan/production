import React,{useState} from "react";
import './Forgotpassword.css';
import swal from 'sweetalert2';
import axios from "axios";


function Forgotpassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async ()=> {
        try{
            const response = await axios.post('http://localhost:3000/forgot-password',{email});
            setMessage(response.data.message);

            if(response.status === 200) {
               swal.fire({
                icon: "success",
                title: "Success",
                text: "password reset link has been sent to your email"
               });
            }else {
                swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to send reset link.please try again later"
                });
            }
        } catch (error) {
           console.log("Error: ",error);
           swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send reset link.please try again later."
           });
        }
    };

    return(
        
        <div className="forgot">
            <h2>Forgot password</h2>
            <input type="email" value={email} placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)}/>
            <button onClick={handleForgotPassword}>submit</button>
            {message && <p>{message}</p>}
        </div>
        
        
    );
}

export default Forgotpassword;