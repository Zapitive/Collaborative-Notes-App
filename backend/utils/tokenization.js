const jwt = require('jsonwebtoken')

function generateToken(userid,username){
    try{
        const payload = {userid:userid,username:username}
        const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30m'})
        return token
    }
    catch(err){
        console.log(err)
    }   
}

module.exports = { generateToken }