const jwt = require('jsonwebtoken')

function generateToken(userid){
    try{
        const payload = {userid:userid}
        const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5h'})
        return accessToken
    }
    catch(err){
        console.log(err)
    }   
}

module.exports = { generateToken }