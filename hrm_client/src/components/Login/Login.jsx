import React,{useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import swal from 'sweetalert2';



function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailerror,setEmailerror] = useState('');
    const [passworderror,setPassworderror] = useState('');
    const navigate = useNavigate();

    const validateemail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
            setEmailerror('please enter your email')
        } else if (!emailRegex.test(value)) {
            setEmailerror("invalid mail")
        } else {
            setEmailerror('')
        }
    }

    const validatepassword = (value) => {
        const passwordRegex = /^.{6,}$/

        if (!value){
            setPassworderror('Enter your password')
        }else if (!passwordRegex.test(value)) {
            setPassworderror('Enter valid password')
        }else {
            setPassworderror('')
        }
        
    }

    const handleSubmit = async (e)=>{
         e.preventDefault();

        // if (!email || !password) {
        //     if (!email) {
        //          setEmailerror('Please enter your email');
        //     }
        //     if (!password) {
        //         setPassworderror('Please enter your password');
        //      }
        //     return;
        //  }
        //  if (!emailerror || !passworderror) {
        //     return;
        //  }

        try{
            const response = await axios.post('http://localhost:3000/login',{
                email: email,
                password: password
            }, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
            if (response.data.success) {

                const {token,lastLogin,user_type} = response.data.data;
                // const token = response.data.data;
                localStorage.setItem('token',token);

                const userTypemap={
                     '65e9987a550c5c1f798ca45b': 'admin',
                     '65e99895550c5c1f798ca45c': 'employee'
                }
                const usertype=userTypemap[user_type]


                swal.fire({
                    icon: "success",
                    title: "success",
                    text:response.data.message
                    })
                     .then((result)=>{
                        if(result.isConfirmed){
                            if(!lastLogin) {
                                navigate('/changepassword');
                            }else {
                                navigate(usertype === 'admin' ? '/admin' : '/user');
                            }
                        }
                        // navigate('/admin');
                     });

                
                // alert(response.data.message);
            }else {
                swal.fire({
                    icon: "error",
                    title:"error",
                    text: "something went wrong"
                })
                // alert(response.data.message);
            }
        } catch (error){
            swal.fire({
                icon: "error",
                title: "error",
                text: "invalid email or password"
            })
            // console.log('Login failed:',error);
            // alert('Login failed.please try again later.');
        }
    }; 

    // const handleForgotPassword = async () => {
    //     if(!email){
    //         setEmailerror('please enter your email');
    //         return;
    //     }
    //     try{
    //         const response = await axios.post('http://localhost:3000/reset-password',{
    //             email: email,
    //         });

    //         if(response.status === 200){
    //             swal.fire({
    //                 icon: "success",
    //                 title: "success",
    //                 text: "password reset link has been sent to your email"
    //             });
    //         }else {
    //             swal.fire({
    //                 icon: "error",
    //                 title: "Error",
    //                 text: "failed to send reset link.please try again later."
    //             });
    //         }
    //     } catch (error) {
    //         console.log('Error',error);
    //         swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: "failed to send reset link.please try again later."
    //         });
    //     }
    // };

   
    return(
        
        <div className="data">
            
            <h2 className="seven">LOGIN</h2>
            <form className="logindata" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name">Enter Your Email</label>
                <input type="email" placeholder="email" name="email" value={email} onChange={(e)=> {setEmail(e.target.value); validateemail(e.target.value)}}/>
                {emailerror && <p className="error-message">{emailerror}</p>}
                </div>

                <div>
                <label htmlFor="password">Enter Your PassWord</label>
                <input type="password" placeholder="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value); validatepassword(e.target.value)}}/>
                {passworderror && <p className="error-message">{passworderror}</p>}
                </div>

                <div className="centre">
                    <button type="submit">Login</button>
                </div>

                <div>
                    <Link to="/forgot-password">Forgot password</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

