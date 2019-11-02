const db = require("../../configurations/db/dbConfig"),
  ObjectID = require("mongodb").ObjectID,
  dbCollection = require("../../configurations/db/dbCollections"),
  User = {
    createNewUser: (data, callback) => {
      console.log(`createNewUser called`);
      User.findUserByEmail(data.email, (user) => {
        if (!user) {
          db.get()
            .collection(dbCollection.COL_USER)
            .insertOne(User.arrangeDataForNewUser(data), (err, result) => {
              if (result != null) {
                
                callback(true, result.ops[0], "User Successfully Created"); // result.ops --> inserted obj
              } else {
                callback(false, null, "Internal Server Error, Please Try Again");
              }
            });
        } else {
          callback(false, null, 'User already Exists !');
        }
      });
    },
    findUserByEmail: (email, callback) => {
      console.log(`isLocalExists called`);
      console.log(email);
      db.get()
        .collection(dbCollection.COL_USER)
        .findOne({ "email": email }, (err, user) => {
          console.log(user);
          if (user != null) {
            callback(user);
          } else {
            callback(null);
          }
        });
    },
    arrangeDataForNewUser: data => {
      console.log(data);
      return (user = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        date : new Date()
      });
    },
    getAllUsers: ()=> {
      return new Promise((resolve, reject)=> {
        db.get()
        .collection(dbCollection.COL_USER)
        .find({})
        .toArray((err, arr)=> {
          if(!err){
            resolve(arr)
          }
          else{
            resolve(null)
          }
        })
      })
    }
  }

module.exports = User