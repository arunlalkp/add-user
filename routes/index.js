/***
created by @arunlalkp on 01-11-2019
**/


var express = require('express');
var router = express.Router();
const Joi = require('@hapi/joi')
const UserSchema = require('../models/joi/userSchema')
const userHelper = require('../helpers/dbHelpers/userHelper')

/* GET home page. */
router.get('/', async(req, res, next) => {

  let allUsers = await userHelper.getAllUsers()
  //console.log(allUsers)

  const error = req.flash('errorMsg')[0]
  const alert = req.flash('successMsg')[0]

  res.render('index', { 
    title: 'User List',
    users: allUsers.reverse(), 
    error: error,
    alert:alert });
});

router.post('/new-user', (req, res, next)=> {
  console.log(req.body)
  let userData = {
    name: req.body.name,
    email:req.body.email,
    mobile:req.body.mobile
  }
  const {error, value} = Joi.validate(userData, UserSchema)
  if(!error){
    //data passed validation so we can save it
    userHelper.createNewUser(value, (isCreated, newUser, msg)=> {
      if(isCreated){
        // send success message
        req.flash('successMsg', 'user successfully created!')
        res.redirect('back')
      }
      else{
        // send error message
        req.flash('errorMsg', msg)
        res.redirect('back')
      }
    })
  }
  else{
    // validation fails
    // send error message
    req.flash('errorMsg', error.message)
    res.redirect('back')
  }
})
module.exports = router;
