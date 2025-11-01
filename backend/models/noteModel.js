const {Schema,model} = require('mongoose')

const noteSchema  = new Schema({
    title:{
        type : String,
        required : true,
    },
    note : {
        type : String,
        default : ''
    },
    noteVersion : {
        type : Number,
        default : 1
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    accessTo : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }]
},{
    timestamps : true,
    versionKey : false
})

const Note = model('Note',noteSchema)

module.exports =  Note 