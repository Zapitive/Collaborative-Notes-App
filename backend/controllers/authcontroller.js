const { generateToken } = require('../utils/tokenization')
const User = require('../models/userModel') 
const {hashedPassword,checkPassword} = require('../utils/passwordHashing')

async function signup(req,res){
    const {username,email,password} = req.body

    if (!username || !email || !password) {
        res.status(400).send({message:"All fields are required"})
    }

    const duplicateUsername = await User.findOne({username:username})
    const duplicateEmail = await User.findOne({email:email})

    if (duplicateUsername){
        res.status(409).send({message:"Username already taken"})
    }

    if (duplicateEmail){
        res.status(409).send({message:"Email address already has an account"})
    }

    const hash = await hashedPassword(password)

    const user = await User.create({username:username,email:email,password:hash})
    if(user){
        res.status(201).json({message:"User created successfully"})
    }
    else{
        res.status(400).send({message:"Unable to create user please try again"})
    }
    
}

async function login(req,res){
    const {username,password} = req.body

    if(!username || !password){
        res.status(400).json({message:"All fields are required"})
    }

    const user = await User.findOne({username:username})
    const dbPassword = user.password
    const match = await checkPassword(password,dbPassword)

    if (match){
        const token = generateToken(user.id,user.username)
        res.status(200).send(token)
        }

    else{
        res.status(401).json({message:"Username and Password does not match"})
    }

}

module.exports = {signup,login}