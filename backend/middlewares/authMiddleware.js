const jwt = require('jsonwebtoken')


const authenticateToken = (req,res,next) => {
    try {
        const authHeaders = req.headers['authorization']
        const token = authHeaders && authHeaders.split(' ')[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if (err) return res.status(403).send("Please login")
            console.log(user)
            req.user = user
            next()
        })
 
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {authenticateToken}