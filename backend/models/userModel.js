const {Schema,model} = require('mongoose');

// Model for user has 3 fields username, email and password
const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        unique : true,
        minlength : 3
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,

    }
},{
    timestamps : true
})

const User = model('User',userSchema)

module.exports = User