import React from 'react';

import './App.css'
import Landingpage from './components/Landing/Landing';
import AddUser from './components/AddUser/AddUser';
import Login from './components/Login/Login';
import {BrowserRouter as Router,Routes,Route,Link,useParams} from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Getuser from './components/GetUser/Getuser';
import Userdetails from './components/Userdetails/Userdetails';
import Resetpassword from './components/Resetpassword/Resetpassword';
import Forgotpassword from './components/Forgotpassword/Forgotpassword';
import Changepassword from './components/Changepassword/Changepassword';
import User from './components/User/User';
import AddUserformik from './components/formic validation/AddUser';
function App() {
  

  return (
   <Router>
    <div>
      <Routes>

      
   
       <Route path="/" exact element={<Landingpage/>}/>
       <Route path="/login" exact element={<Login/>}/>
       <Route path="/adduser" exact element={<AddUserformik/>}/>
        <Route path="/admin" exact element={<Admin/>}/> 
        <Route path="/getuser" exact element={<Getuser/>}/>
        <Route path="/detailsuser/:userId" exact element={<Userdetails/>}/>
        <Route path="/reset-password" exact element={<Resetpassword/>}/>
        <Route path="/forgot-password" exact element={<Forgotpassword/>}/>
        <Route path="/changepassword" exact element={<Changepassword/>}/>
        <Route path="/user" exact element={<User/>}/>
       
       </Routes>
       </div>
       </Router>
    
  )
}

export default App
