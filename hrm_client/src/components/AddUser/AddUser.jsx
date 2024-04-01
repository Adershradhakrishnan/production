import React,{useEffect,useState} from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams} from 'react-router-dom';
import './AddUser.css';
import Login from "../Login/Login";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddUser(){

    const navigate=useNavigate();

    const isTokenpresent = () => {

        const token = localStorage.getItem('token');
        return !!token;
    };

    if (!isTokenpresent()) {
        Swal.fire({
            title: "Error", 
            text: "need to login to access the adduser.",
            icon: "error",
            button: "Login",
        }).then(()=> {
            navigate('/login');
        });
        return null;
    }

    const [name, setName] = useState('');
    const [nameerror, setNameerror] = useState('');

    const [email, setEmail] = useState('');
    const [emailerror, setEmailerror] = useState('');

    const [phonenumber, setPhonenumber] = useState('');
    const [phonenumbererror,setPhonenumbererror] = useState('');

    const [pincode,setPincode] = useState('');
    const [pincodeerror,setPincodeerror] = useState('');

    // const [password,setPassword] = useState('');
    // const [passworderror,setPassworderror] = useState('');

    const [generatedPassword, setGeneratedPassword] = useState('');

    const [token,setToken] = useState('')

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        //console.log("stored Token: ",storedToken);

        if (storedToken) {
            setToken(storedToken);
        }
    },[]);

    const validatename = (value) => {
        const nameRegex = /^.[a-z]{6}$/

        if(!value) {
            setNameerror('Enter your name')
        }else if (nameRegex.test(value)){
            setNameerror('Invalid name')
        }else {
            setNameerror('')
        }

    }

    const validateemail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!value) {
            setEmailerror('Enter your email')
        }else if (emailRegex.test(value)) {
            setEmailerror('Invalid email')
        }else {
            setEmailerror('')
        }
    }

    const validatephonenumber = (value) => {
        const phonenumberRegex = /^.[0-9]{10}$/

        if(!value) {
            setPhonenumbererror('Enter your phonenumber')
        }else if (phonenumberRegex.test(value)) {
            setPhonenumbererror('Enter valid phonenumber')
        }else {
            setPhonenumbererror('')
        }
    }

    const validatepincode = (value) => {
        const pincodeRegex = /^.[0-9]{6}$/

        if(!value) {
            setPincodeerror('Enter your pincode')
        }else if (pincodeRegex.test(value)) {
            setPincodeerror('Enter valid pincode')
        }else {
            setPincodeerror('')
        }
    }

    // const validatepassword = (value) => {
    //     const passwordRegex = /^.{6,}$/

    //     if(!value) {
    //         setPassworderror('Enter your password')
    //     }else if (passwordRegex.test(value)) {
    //         setPassworderror('Enter valid password')
    //     }else {
    //         setPassworderror('')
    //     }
    // }

    const handleAddUser = async (e) => {
        e.preventDefault();
        try{

            const data = {name,email,phonenumber,pincode};
            const json_data = JSON.stringify(data);
            console.log("json_data: ",json_data)

            console.log("Token",token);

            const response = await axios.post('http://localhost:3000/adduser',json_data,{
               
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    
                },
                body: json_data,
            });
            console.log('Response received',response);

            const responseData = response.data;
            console.log(responseData)
            if(responseData.errors) {

                if (responseData.errors.name || responseData.errors.name_empty) {
                    setNameerror(responseData.errors.name_empty || responseData.errors.name)
                }

                if (responseData.errors.email || responseData.errors.email_empty) {
                    setEmailerror(responseData.errors.email_empty || responseData.errors.email)
                }

                if (responseData.errors.phonenumber || responseData.errors.phonenumber_empty) {
                    setPhonenumbererror(responseData.errors.phonenumber_empty || responseData.errors.phonenumber)
                }

                if(responseData.errors.pincode || responseData.errors.pincode_empty){
                    setPincodeerror(responseData.errors.pincode_empty || responseData.errors.pincode)
                }

                // if(responseData.errors.password_empty){
                //     setPassworderror(responseData.errors.password_empty)
                // }
            }else if(responseData.success){
                const passwordFromServer = response.data.password;
                setGeneratedPassword(passwordFromServer);

                Swal.fire({
                    icon: "success",
                    title: "success",
                    text:response.message
                });
            }

           
        } catch(error) {
           Swal.fire({
            icon: "error",
            title: "error",
            text: "invalid email or password"
           })
        }
    }

    return(

        <div className="adddata">
            <h2>Add-User</h2>

            <form className="adddetails" onSubmit={handleAddUser}>

                <div>
                <label htmlFor="name">Enter Your UserName</label>
                <input type="text" placeholder="Username" name="name" value={name} onChange={(e)=>{setName(e.target.value); validatename(e.target.value) }} required/>
                {nameerror && <p className="error-message">{nameerror}</p>}
                </div>
                 
                 <div>
                <label htmlFor="email">Enter Your Email</label>
                <input type="email" placeholder="email" name="email" value={email} onChange={(e)=> {setEmail(e.target.value); validateemail(e.target.value)}} required/>
                {emailerror && <p className="error-message">{emailerror}</p>}
                </div>
                
                <div>
                <label htmlFor="phonenumber">Enter Your PhoneNumber</label>
                <input type="text" placeholder="Enter Your PhoneNumber" name="phonenumber" value={phonenumber} onChange={(e)=> {setPhonenumber(e.target.value); validatephonenumber(e.target.value)}} required/>
                {phonenumbererror && <p className="error-message">{phonenumbererror}</p>}
                </div>
                
                <div>
                <label htmlFor="pincode">Enter Your Pincode</label>
                <input type="pincode" placeholder="Enter Your Pincode" name="pincode" value={pincode} onChange={(e)=> {setPincode(e.target.value); validatepincode(e.target.value)}} required/>
                {pincodeerror && <p className="error-message">{pincodeerror}</p>}
                </div>

                {/* <label htmlFor="password">Enter Your Password</label>
                <input type="password" placeholder="Enter Your Password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value); validatepassword(e.target.value)}} required/>
                {passworderror && <p className="error-message">{passworderror}</p>} */}

                <div className="centre">
                    {/* <Link to="/getuser"> */}
                        <button type="submit" onClick={handleAddUser}>Add User</button>
                        {/* </Link> */}
                </div>
                
            </form>
            {generatedPassword && <p>password generated: {generatedPassword}</p>}
        </div>
    )
}

export default AddUser;

