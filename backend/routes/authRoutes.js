const express = require('express')
const { signup,login } = require('../controllers/authcontroller')
const User = require('../models/userModel')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)

//temporary route for configuring
router.delete('/deleteuser/:userID',async (req,res)=>{
    const userID = req.params.userID
    const user = await User.findByIdAndDelete(userID)
    if (user){
        res.send("USer deleted")
    }
})

module.exports = router