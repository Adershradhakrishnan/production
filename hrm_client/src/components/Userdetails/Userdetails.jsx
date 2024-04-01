import React,{useEffect,useState} from "react";
import { BrowserRouter as Router,Route,Routes,Link, useParams} from 'react-router-dom';
import axios from 'axios';
import '../Userdetails/Userdetails.css'
import  Image1 from './images/user.webp';

function Userdetails() {
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

    const Togglereadonly=()=>{
        setReadOnly(prevState => !prevState);
    }

    const Handleupdate = async() => {
        try{
            await axios.put(`http://localhost:3000/updateuser/${userId}`,user);
            console.log("Data updated successfully")
        } catch (error) {
            console.log("Updating user failed",error)
        }
    }

    return(
        <div className="one">
            
            {/* <div className="two">
                <img src={Image1} alt="#"/>
            </div> */}
            <div>
                <div className="three">
                    <div>
                        <label htmlFor="name">Enter your Name</label>
                        <input type="text" name="name" defaultValue={user ? user.name: ''} readOnly={readOnly} onChange={(e)=>setUser({...user,name:e.target.value})}/>
                    </div>

                    <div>
                        <label htmlFor="email">Enter your Email</label>
                        <input type="email" name="email" defaultValue={user ? user.email: ''} readOnly={readOnly} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </div>

                    <div>
                        <label htmlFor="phonenumber">Enter your Phonenumber</label>
                        <input type="phonenumber" name="phonenumber" defaultValue={user ? user.phonenumber: ''} readOnly={readOnly} onChange={(e)=>setUser({...user,phonenumber:e.target.value})}/>
                    </div>

                    <div>
                        <label htmlFor="pincode">Enter your Pincode</label>
                        <input type="pincode" name="pincode" defaultValue={user ? user.pincode: ''} readOnly={readOnly} onChange={(e)=>({...user,pincode:e.target.value})}/>
                    </div>

                    <div className="buttonss">
                        <div className="button1">
                            <Link to="/getuser"><button type="submit" onClick={Handleupdate}>Submit</button></Link>
                        </div>

                        <div className="button2">
                            <button type="submit" onClick={Togglereadonly}>Edit</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Userdetails;
