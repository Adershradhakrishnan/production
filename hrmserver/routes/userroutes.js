const express= require('express');
const router=express.Router();
const userController=require("../controllers/userController");
const checkLogin=require('../utils/checklogin').checkLogin;
const accesscontrol=require("../utils/accesscontrol").accesscontrol;

const setAccessControl = (access_type)=>{
    return (req,res,next)=> {
        accesscontrol(access_type,req,res,next)
    }
};

router.post('/adduser',setAccessControl('1'),userController.adduser);//add
router.get('/getuser',setAccessControl('1'),userController.getuser);//get
router.get('/:userId',userController.router);
router.put('/:userId',userController.Updateuser);

module.exports=router;