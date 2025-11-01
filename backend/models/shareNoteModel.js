const {Schema,model} = require('mongoose')

const shareNoteSchema = new Schema({
    noteid :{
        type : Schema.Types.ObjectId,
        ref : 'note',
        required : true
    },
    senderid :{
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    receiverid :{
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    status :{
        type : String,
        required : true
    }
},{
    timestamps:true
})

const shareNote = model('shareNote',shareNoteSchema)

module.exports = shareNote