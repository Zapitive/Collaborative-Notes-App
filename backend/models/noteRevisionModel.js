const {Schema,model} = require('mongoose')

const noteRevisionSchema = new Schema({
    noteid :{
        type : Schema.Types.ObjectId,
        ref : 'note'
    },
    title:{
        type : String,
        required : true,
    },
    note : {
        type : String
    },
    noteVersion : {
        type : Number,
        required : true
    },
},{
    timestamps : true,
    versionKey : false
})

const noteRevision = model('noteRevision',noteRevisionSchema)

module.exports = noteRevision