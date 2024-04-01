import Landingnavbar from "./Landingnavbar/Landingnavbar";
import Landingfooter from "./Landingfooter/Landingfooter";
import Login from "../Login/Login";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';

import './Landing.css';

function Landingpage(){
    return(
        <>
        <Landingnavbar/>
          <div className="landing">
            <button><Link to={"/login"}>Login</Link></button>
        </div>  
        
        <Landingfooter/>
        </>
    )
}

export default Landingpage;