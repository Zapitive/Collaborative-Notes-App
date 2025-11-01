const jwt = require('jsonwebtoken')


const authenticateToken = (req,res,next) => {
    try {
        const authHeaders = req.headers['authorization']
        const token = authHeaders && authHeaders.split(' ')[1]

        if (token == null) res.status(403).json({messgae:"Please login again"})

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if (err) return
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