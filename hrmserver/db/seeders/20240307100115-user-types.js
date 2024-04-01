'use strict';
module.exports = {
  up: (models, mongoose) => {
   
    return models.user_types
    .insertMany([
      {
      _id: "65e9987a550c5c1f798ca45b",
      user_type: "admin"
      },
      {
        _id: "65e99895550c5c1f798ca45c",
        user_type: "employee"
      }
    ])
  },

  down: (models, mongoose) => {
    return models.user_types

    .deleteMany({
      _id:{
        $in:[
          "65e9987a550c5c1f798ca45b",
          "65e99895550c5c1f798ca45c"
        ],
      },
    })

}
};
