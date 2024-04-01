import React, { useEffect, useState } from "react";
 import './Admin.css'
//  import adminImage from './images/admin.jpg';
 import AdminNavbar from "./AdminNavbar";
 import AdminFooter from "./AdminFooter";
 import { useNavigate } from "react-router-dom";
 import Swal from "sweetalert2";
 import Spinner from "../Spinners/Spinners";

 function Admin(){
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        const timeout = setTimeout(()=> {
            setLoading(false);
        },2000);

        return () => clearTimeout(timeout);
    }, []);

    const navigate = useNavigate();

    const isTokenpresent = ()=>{

        const token = localStorage.getItem('token');
        return !!token;
        
    };

    if (!isTokenpresent()){
        Swal.fire({
            title:"Error",
            text: "need access",
            icon: "error",
            button: "Login",
        }).then(()=>{
            navigate('/login');
        });

        return null;
    }
    return(
        <>
         <AdminNavbar/>

        <div className="adminlog">

             <div className="add">
                {loading ? (
                    <Spinner />
                ) : (
                  <>
                 <h1>Name</h1>
                 <ul className="adminlist">
                    <li>Edit</li>
                    <li>Settings</li>
                    <li>View</li>

                 </ul>
                 </>
            )}
             </div> 
         </div>
         <div className="footer">
            <AdminFooter/>
        </div>
         </>
     )
 }

 export default Admin;