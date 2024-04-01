import React, {useEffect,useState} from "react";

import './Resetpassword.css';
import axios from "axios";

function Resetpassword(){

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token,setToken] = useState("");

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        setToken(token);
      },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            setErrorMessage("passwords do not match");
            return;
        }

        try{
            const response = await axios.patch('http://localhost:3000/reset-password',{password},{
                
                headers: {
                    
                    Authorization: `Bearer ${token}`
                },
               
            });

            if (response.status === 200) {
                setErrorMessage(response.data.message);
            }else{
                setErrorMessage("failed to reset password.plese try again later");
            }

            
        } catch (error) {
            console.log('Error: ',error);
            setErrorMessage("An error occured.please try again later.");
        }
    };

    return(
        <>

        <h1>Reset password</h1>

        <div className="container">

            <form onSubmit={handleSubmit}>
                <div className="password">
                    <input type="password" id="password" name="password" required placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)}/>

                </div>
                <div className="confirm">
                    <input type="password" id="confirmpassword" name="confirmpassword" required placeholder="Confirm your password" onChange={(e)=> setConfirmPassword(e.target.value)}/>

                </div>
                <div className="submit">
                    <button>submit</button>
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </form>
        </div>
        </>
    )
}

export default Resetpassword;