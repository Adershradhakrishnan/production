let success_function=require('../utils/response-handler').success_function;
let error_function=require('../utils/response-handler').error_function;
const users =require('../db/models/users');
let jwt = require('jsonwebtoken');
let bcrypt =require('bcryptjs');
let dotenv =require('dotenv');
const validator = require("validator");
const isEmpty = require('../validations/isEmpty');
const sendEmail = require('../utils/sendemail').sendEmail;
const resetpassword = require('../utils/resetpassword').resetpassword;
dotenv.config();



exports.login = async function(req,res){

    try{
        
        let email = req.body.email;
        console.log("email: ",email);
        let password = req.body.password;
        console.log("password: ",password);

        async function ValidateLogin(data) {
            let errors = {};

            data.email = !isEmpty(data.email) ? data.email : "";
            data.password = !isEmpty(data.password) ? data.password : "";
            console.log(data.email)

            if (validator.isEmpty(data.email)) {
                errors.email_empty = "Email is required";
            }

            if(!validator.isEmail(data.email)) {
                errors.email = "Email is Invalid";
            }

            if (validator.isEmpty(data.password)) {
                errors.password_empty = "password is required";
            }

            return {
                userValid: isEmpty(errors),
                usererrors: errors,
            };
        }

        const { userValid, usererrors } = await ValidateLogin(req.body);

        console.log("userValid: ",userValid);
        console.log("usererrors: ",usererrors);

        if (!userValid) {
            let response = error_function({
                statusCode: 400,
                message: "validation error",
                errors: usererrors,
            });
            res.status(response.statusCode).send(response);
            return;
        } else {
            if (email && password){

            console.log("reached here..");
            let user = await users.findOne({
                email: email
            });

            console.log("user: ",user);

            if(!user){
                let response = error_function({"statusCode" :400,"message" : "Invalid email"});
                res.status(response.statusCode).send(response);
                return;
            }

            let firstLogin = !user.lastLogin;

            if (firstLogin) {
                await users.updateOne({ email: email}, {$set: {lastLogin: new Date()}});

            }

            if(user){

                let db_password=user.password;
                console.log("db_password: ",db_password);

                bcrypt.compare(password,db_password,(err,auth)=>{
                    if(auth === true) {
                        let access_token = jwt.sign({user_id :user._id}, process.env.PRIVATE_KEY,{expiresIn: "1d"});
                        console.log("access_token: ",access_token);
                            
                           
                         let response = success_function({
                            statusCode:200,
                            data: {
                                token: access_token,
                                lastLogin:user.lastLogin,
                                user_type:user.user_type,
                            },
                            
                            message: "Login successful"
                        });
                    
                        res.status(response.statusCode).send(response);
                        return;
                    } else{
                        let response = error_function({
                            statusCode:401,
                            message: "invalid credentials"
                        });
                        res.status(response.statusCode).send(response);
                        return;
                    }
                });
            }else{
                let response = error_function({
                    statusCode:401,
                    message: "invalid credentials"
                });
                res.status(response.statusCode).send(response);
                return;
            }

        }else{
            if(!email){
                let response=error_function({
                    statusCode:422,
                    message: "email is required"
                });
                res.status(response.statusCode).send(response);
                return;
            }

            if(!password){
                let response=success_function({
                    statusCode:422,
                    message: "password required"
                });
                res.status(response.statusCode).send(response);
                return;
            }
        }
    }
    } catch(error) {
        console.log("Node_env : ",process.env.NODE_ENV);
        if (process.env.NODE_ENV == "production") {
            let response = error_function({
                statusCode:400,
                message: error
                    ? error.message
                        ? error.message
                        : error
                :"something went wrong",        
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            let response=error_function({statusCode:400,message:error});
            res.status(response.statusCode).send(response);
            return;
        }
    }
};

exports.forgotPasswordController = async function(req,res) {
    try{
        let email = req.body.email;
        console.log("email:",email);

        if(email) {
            let user = await users.findOne({email: email});
            console.log("user: ",user);

            if(user) {
                let reset_token = jwt.sign(
                    {user_id : user._id},
                    process.env.PRIVATE_KEY,
                    {expiresIn: "10m"}
                );

                let data = await users.updateOne(
                    {email: email},
                    { $set : {password_token: reset_token}},
                );
                console.log("data: ",data);
                
                if (data.matchedCount === 1 && data.modifiedCount == 1) {
                    let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;

                    let email_template = await resetpassword(users.name,reset_link);
                    // console.log("email_template: ",email_template);

                    await sendEmail(email,"forgot password",email_template);
                    
                    let response = success_function({
                        statusCode: 200,
                        message: "Email sent successfully",
                      });
                      res.status(response.statusCode).send(response);
                      return;
            } else if (data.matchedCount === 0) {
                let response = error_function({
                    statusCode: 404,
                    message: "User not found",
                });
                res.status(response.statusCode).send(response);
                      return;
            } else {
                let response = error_function({
                    statusCode:400,
                    message: "pasword reset failed"
                });
                res.status(response.statusCode).send(response);
          return;
            }
             
        } else {
            let response = error_function({ statusCode: 403, message: "Forbidden" });
            res.status(response.statusCode).send(response);
            return;
          }

    } else {
        let response = error_function({
            statusCode: 422,
            message: "Email is required",
          });
          res.status(response.statusCode).send(response);
          return;
    }
} catch (error) {

    let response = error_function({
        statusCode:400,
        message: "something went wrong"
    });
    res.status(response.statusCode).send(response);
    return;
   }
}


    // if(process.env.NODE_ENV == "production") {
    //     let response = error_function({
    //         statusCode: 400,
    //         message: error
    //           ? error.message
    //             ? error.message
    //             : error
    //           : "Something went wrong",
    //       });
    //       res.status(response.statusCode).send(response);
    //       return;
    // } else {
    //     let response = error_function({ statusCode: 400, message: error });
    //   res.status(response.statusCode).send(response);
    //   return;
    // }



exports.passwordResetController = async function (req, res) {
    try {
     const authHeader = req.headers["authorization"];
      const token = authHeader.split(" ")[1];
  
      let password = req.body.password;
  
      decoded = jwt.decode(token);
//       //console.log("user_id : ", decoded.user_id);
//       //console.log("Token : ", token);
    let user = await users.findOne({
        $and: [{ _id: decoded.user_id }, { password_token: token }],
       });
      if (user) {
        let salt = bcrypt.genSaltSync(10);
        let password_hash = bcrypt.hashSync(password, salt);
        let data = await users.updateOne(
           { _id: decoded.user_id },
          { $set: { password: password_hash, password_token: null } }
        );
         if (data.matchedCount === 1 && data.modifiedCount == 1) {
          let response = success_function({
             statusCode: 200,
             message: "Password changed successfully",
          });
           res.status(response.statusCode).send(response);
          return;
        } else if (data.matchedCount === 0) {
           let response = error_function({
            statusCode: 404,
             message: "User not found",
          });
          res.status(response.statusCode).send(response);
          return;
        } else {
          let response = error_function({
            statusCode: 400,
             message: "Password reset failed",
          });
          res.status(response.statusCode).send(response);
          return;
        }
      } else {
         let response = error_function({ statusCode: 403, message: "Forbidden" });
        res.status(response.statusCode).send(response);
         return;
      }
    } catch (error) {
      if (process.env.NODE_ENV == "production") {
         let response = error_function({
           statusCode: 400,
          message: error
             ? error.message
               ? error.message
               : error
            : "Something went wrong",
         });
  
        res.status(response.statusCode).send(response);
         return;
      } else {
         let response = error_function({ statusCode: 400, message: error });
        res.status(response.statusCode).send(response);
        return;
      }
    }
   };

   exports.changepassword = async function (req,res){
     const {currentpassword, newpassword} = req.body;
     const authHeader = req.headers["authorization"];

     if(!authHeader){
        let response = error_function({
            statusCode: 401,
            message: "Authorization header not received",
        });
        res.status(response.statusCode).send(response);
        return;
     }
       try{
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token,process.env.PRIVATE_KEY);

        const UserId = decodedToken.user_id;
        // console.log("UserId:",UserId);

        const user = await users.findById(UserId);
        // console.log("user:",user);
        if(!user){
            let response = error_function({
                statusCode:404,
                message: "No such user"
            });
          res.status(response.statusCode).send(response);
          return;
        }

        const currentpasswordvalid = await bcrypt.compare(currentpassword,user.password);
        // console.log("currentpasswordvalid: ",currentpasswordvalid);
        if(!currentpasswordvalid) {
            let response = error_function({
                statusCode:400,
                message: "current password is incorrect"
            });
            res.status(response.statusCode).send(response);
            return;
        }

        const salt = await bcrypt.genSalt(10);
        console.log("salt: ",salt);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        console.log("hashedpassword:",hashedPassword);

        await users.findByIdAndUpdate(UserId,{password: hashedPassword});

        let response = success_function({
            statusCode:200,
            message: "password changed successfully"
        });
        res.status(response.statusCode).send(response);
        return;
       } catch (error){
        let response = error_function({
            statusCode:500,
            message: error.message || "Internal server error"
        });
        res.status(response.statusCode).send(response);
        return;
       }
     
   };