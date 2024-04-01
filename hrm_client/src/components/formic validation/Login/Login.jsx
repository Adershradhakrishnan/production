import React,{useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik,Form,Field,ErrorMessage} from 'formik';



function Login(){
   
    const navigate = useNavigate();

    
        return(
        
        <div className="data">
            
            <h2 className="seven">LOGIN</h2>
            <Formik
               initialValues={{
                email: '',
                password: ''
               }}

               validationSchema={Yup.object({
                   email: Yup.string()
                   .email('Invalid email address')
                   .required('Email is required'),
                password: Yup.string() 
                   .min(6, 'password must be at least 6 characters')
                   .required('password is required'),
               })}
               onSubmit={async (values, {setSubmitting})=>{
                try{
                    const response = await axios.post('http://localhost:3000/login',{
                        email: values.email,
                        password: values.password,
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
                        
                     });
                    }else {
                        swal.fire({
                            icon: "error",
                            title:"error",
                            text: "something went wrong"
                        })
                        
                    }
                } catch (error){
                    swal.fire({
                        icon: "error",
                        title: "error",
                        text: "invalid email or password"
                    })
                    
                    
                }
                setSubmitting(false);

              }}
           >
              {({ handleChange, handleBlur, handleSubmit, values,errors,touched,isSubmitting})=>(

              
            <Form className="logindata">
                <div>
                <label htmlFor="name">Enter Your Email</label>
                <Field type="email" name="email" placeholder="Email"/>
                <ErrorMessage name="email" component="div" className="error-message"/>
                </div>

                <div>
                <label htmlFor="password">Enter Your PassWord</label>
                <input type="password" name="password" placeholder="password"/>
                <ErrorMessage name="password" component="div" className="error-message"/>
                </div>

                <div className="centre">
                    <button type="submit" disabled={isSubmitting}>Login</button>
                </div>

                <div>
                    <Link to="/forgot-password">Forgot password</Link>
                </div>
            </Form>
              )}
              </Formik>
        </div>
    );
};

export default Login;

