const {Schema,model} = require('mongoose')

const shareNoteSchema = new Schema({
    senderid :{
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    receiverid :{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
})

const shareNote = model('shareNote',shareNoteSchema)

module.exports = shareNote