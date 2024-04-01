import React,{useEffect,useState} from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams} from 'react-router-dom';
import './AddUser.css';
import Login from "../Login/Login";
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddUserformik(){

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

    

    const [generatedPassword, setGeneratedPassword] = useState('');

    const [token,setToken] = useState('')

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        //console.log("stored Token: ",storedToken);

        if (storedToken) {
            setToken(storedToken);
        }
    },[]);

   

    


    const handleAddUser = async (json_data, {setSubmitting}) => {
        
        try{


            const response = await axios.post('http://localhost:3000/adduser',json_data,{
               
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    
                },
               
            });
            

            const responseData = response.data;
            console.log(responseData)
             if(responseData.success){
                // const passwordFromServer = response.data.password;
                // setGeneratedPassword(passwordFromServer);

                setGeneratedPassword(responseData.password);
                Swal.fire({
                    icon: "success",
                    title: "success",
                    text:responseData.message
                });
            }else if(responseData.errors) {
                //handle errors from the server
            }

           
        } catch(error) {
            console.log("Error:",error);
           Swal.fire({
            icon: "error",
            title: "error",
            text: "invalid email or password"
           });
        }
        setSubmitting(false);
    };

    return(

        <div className="adddata">
            <h2>Add-User</h2>
            <Formik
            initialValues={{
                name: '',
                email: '',
                phonenumber: '',
                pincode: ''
            }}

            validationSchema ={Yup.object({
                name: Yup.string().min(3,'Too Short...').max(30,'Too Long...').required('Enter your UserName'),
                email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'invalid email').required('Enter your Email'),
                phonenumber: Yup.string().matches(/^[0-9]{10}$/, 'phone number must be 10 digits').required('Enter Your PhoneNumber'),
                pincode: Yup.string().matches(/^[0-9]{6}$/, 'pincode must be 6 digits').required('Enter Your Pincode'),
            })}

            onSubmit={handleAddUser}
            validateOnChange
            validateOnBlur
        
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting })=> (

                
            <Form className='adddetails' onSubmit={handleSubmit}>

                <div>
                <label htmlFor="name">Enter Your UserName</label>
                <Field type="text" name='name' placeholder=" Enter Your Username" onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                <ErrorMessage name="name" component="div" className="error-message"/>
                </div>
                 
                 <div>
                <label htmlFor="email">Enter Your Email</label>
                <Field type="email" name='email' placeholder="Enter Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                <ErrorMessage name="email" component="div" className="error-message"/>
                </div>
                
                <div>
                <label htmlFor="phonenumber">Enter Your PhoneNumber</label>
                <Field type="text" name='phonenumber' placeholder="Enter Your PhoneNumber" onChange={handleChange} onBlur={handleBlur} value={values.phonenumber}/>
                <ErrorMessage name="phonenumber" component="div" className="error-message"/>
                </div>
                
                <div>
                <label htmlFor="pincode">Enter Your Pincode</label>
                <Field type="pincode" name='pincode' placeholder="Enter Your Pincode" onChange={handleChange} onBlur={handleBlur} value={values.pincode}/>
                <ErrorMessage name="pincode" component="div" className="error-message"/>
                </div>

                <div className="centre">
                    {/* <Link to="/getuser"> */}
                        <button type="submit" disabled={isSubmitting}>Add User</button>
                        {/* </Link> */}
                </div>
                
            </Form>
                )}
            </Formik>
            {generatedPassword && <p>password generated: {generatedPassword}</p>}
        </div>
    )
}

export default AddUserformik;

