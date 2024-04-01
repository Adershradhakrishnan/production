import React,{useEffect,useState} from "react";
import { BrowserRouter as Router,Route,Routes,Link, useParams} from 'react-router-dom';
import axios from 'axios';
import '../Userdetails/Userdetails.css'
import * as Yup from 'yup';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import  Image1 from './images/user.webp';

function Userdetailsformik() {
    const { userId } = useParams();
    const [user,setUser] = useState(null);
    const [readOnly, setReadOnly] = useState(true);

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/getuser/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.log('Error fetching user details:',error);
            }
        };
        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Enter Your Name'),
        email: Yup.string().email('Invalid email').required('Enter Your Email'),
        phonenumber: Yup.string().matches(/^[0-9]{10}$/, 'phone number must be 10 digits').required('Enter Your PhoneNumber'),
        pincode: Yup.string().matches(/^[0-9]{6}$/, 'pincode must be 6 digits').required('Enter Your Pincode'),
    });

    

    const Handleupdate = async() => {
        try{
            await axios.put(`http://localhost:3000/updateuser/${userId}`,user);
            console.log("Data updated successfully")
        } catch (error) {
            console.log("Updating user failed",error)
        }
    };

    return(
        <div className="one">
            
            {/* <div className="two">
                <img src={Image1} alt="#"/>
            </div> */}
            <div>
                <div className="three">
                    <Formik
                    initalValues={{
                        name: user.name,
                        email:user.email,
                        phonenumber:user.phonenumber,
                        pincode:user.pincode
                    }}
                    validationSchema={validationSchema}
                    onSubmit={Handleupdate}
                    validateOnChange
                    validateOnBlur

               >

                {({handleChange, handlrBlur, handleSubmit, values,errors,touched})=> (

                    <Form onSubmit={handleSubmit}>
                
                    <div>
                        <label htmlFor="name">Enter your Name</label>
                        <Field type="text" name="name" readOnly={readOnly} onChange={handleChange} onBlur={handlrBlur} value={values.name}/>
                        <ErrorMessage name="name" component="div" className="error-message"/>
                    </div>

                    <div>
                        <label htmlFor="email">Enter your Email</label>
                        <Field type="email" name="email" readOnly={readOnly} onChange={handleChange} onBlur={handlrBlur} value={values.email}/>
                        <ErrorMessage name="email" component="div" className="error=message"/>
                    </div>

                    <div>
                        <label htmlFor="phonenumber">Enter your Phonenumber</label>
                        <Field type="phonenumber" name="phonenumber" readOnly={readOnly} onChange={handleChange} onBlur={handlrBlur} value={values.phonenumber}/>
                        <ErrorMessage name="phonenumber" component="div" className="error-message"/>
                    </div>

                    <div>
                        <label htmlFor="pincode">Enter your Pincode</label>
                        <Field type="pincode" name="pincode" readOnly={readOnly} onChange={handleChange} onBlur={handlrBlur} value={values.pincode}/>
                        <ErrorMessage name="pincode" component="div" className="error-message"/>
                    </div>

                    <div className="buttonss">
                        <div className="button1">
                            <button type="submit">Submit</button>
                        </div>

                        <div className="button2">
                            <button type="button" onClick={() => setReadOnly(prevState => !prevState)}>{readOnly ? 'Edit' : 'Cancel'}</button>
                        </div>
                    </div>
                    </Form>
                )}
               </Formik> 
                </div>
            </div>
        </div>
        
    )
}

export default Userdetailsformik;
