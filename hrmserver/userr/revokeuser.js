const accesscontrol = require('../db/models/revokedtokens');

exports.revoke = async function (token) {
    return new Promise(async (resolve,reject)=> {
        try{
            if (token == null || token == "null" || token == "" || token == "undefined"){
                reject({ "status":400, "message": "Invalid Access Token"});
            }
            else{
                let saveToken = await accesscontrol.findOneAndUpdate({ token:token},{upsert:true,new:true},
                    );

                    if(saveToken) {
                        resolve({"status":200,"message":"Logout successfull"});
                    }else {
                        reject({"status":400,"message": "Logout failed"});
                    }
            }
        }
        catch(error){
            if (process.env.NODE_ENV == "production") reject({"status":400,"message":error ? (error.message ? error.message :error): "something went wrong"});
            else reject({"status":400,"message":error});
        }

    });

}

exports.checkRevoked = function (token) {
    return new Promise(async (resolve,reject)=>{
        try{
            let revoked = await accesscontrol.findOne({token:token});
            if(revoked){
                resolve(true);
            }else{
                resolve(false);
            }
        }
        catch (error){
            let errorMessage = error.message || "something went wrong";
            reject({"status":400,"message": errorMessage});
        }
    });
};