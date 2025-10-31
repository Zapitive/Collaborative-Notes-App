const express = require('express')
const router = express.Router()

router.get('/signup',(req,res)=>{
    res.send('user signup route')
})

module.exports = router