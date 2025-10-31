const mongoose = require('mongoose')

const mongo_uri = process.env.MONGO_URI

async function connectDb(){
    try{
        conn = await mongoose.connect(mongo_uri);
        if (conn) console.log("Connected to DB")
    } catch(e){
        console.error(e)
    }

    return conn
}




module.exports = connectDb
