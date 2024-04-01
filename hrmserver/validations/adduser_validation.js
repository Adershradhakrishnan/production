const validator = require("validator")
const isEmpty = require('./isEmpty')
const adduser=require('../db/models/users');

module.exports=async function validateadduser(data){

    let errors={};

    data.name=!isEmpty(data.name)?data.name:"";
    data.email=!isEmpty(data.email)?data.email:"";
    data.phonenumber=!isEmpty(data.phonenumber)?data.phonenumber:"";
    data.pincode=!isEmpty(data.pincode)?data.pincode:"";
    // data.password=!isEmpty(data.password)?data.password:"";

    if(validator.isEmpty(data.name)){
        errors.name_empty="Name is required"
    }

    if(!validator.isAlpha(data.name)){
        errors.name="Name can only have alphabets"
    }

    if(!validator.isLength(data.name,{min:6,max:30})){
        errors.name="name must be between 6 and 30"
    }

    if(validator.isEmpty(data.email)){
        errors.email_empty="Email is required"
    }

    if(!validator.isEmail(data.email)){
        errors.email="Email is invalid"
    }

    let email_count = await adduser.countDocuments({
        "email":data.email,
    })

    if(Number(email_count)>0){
        errors.email="email must be unique"
    }
    if(validator.isEmpty(data.phonenumber)){
        errors.phonenumber_empty="phonenumber required"
    }

    if(!validator.isNumeric(data.phonenumber)){
        errors.phonenumber="Invalid phonenumber"
    }

    if(validator.isEmpty(data.pincode)){
        errors.pincode_empty="Pincode is required"
    }
   if(!validator.isNumeric(data.pincode)){
    errors.pincode="pincode invalid"
   }
//    if(validator.isEmpty(data.password)){
//     errors.password_empty="password is required"
//    }

   return{
      usererrors: errors,
      userValid : isEmpty(errors),
    };

    
}