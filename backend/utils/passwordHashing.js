const bcrypt = require('bcrypt')

async function hashedPassword(password){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        console.log(salt,hashedPassword)
        return hashedPassword
    }
    catch (err){
        console.log(err)
    }
    
}

async function checkPassword(password,hashedPassword){
    try{
        const match = bcrypt.compare(password,hashedPassword)
        return match
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {hashedPassword,checkPassword}