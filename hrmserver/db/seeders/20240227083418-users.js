'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.users
        
          .insertMany([
           {
            _id : "65d9bb622af666718a1b38f9",
            name: "Adershradhakrishnan",
            email: "adershradhakrishnan07@gmail.com",
            phonenumber: "7034603650",
            pincode: "683575",
            
            password: "$2a$04$Fz.QmkBnszB/Lbj7SNoV3ukl/n2gxxzHLrnsCMr8BPBBht0V7huei",//123456789
            user_type: "65e9987a550c5c1f798ca45b"
           }
          ])
        },
            
  
 down: (models, mongoose) => {

  return models.users
.deleteMany({
 _id:{
   $in: [
     "65d9bb622af666718a1b38f9",
   ],
 },

 
})
.then((res)=>{
 console.log(res.deletedCount);
});
}
};
