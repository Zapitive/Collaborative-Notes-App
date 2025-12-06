const User = require('../models/userModel') 
const shareNote = require('../models/shareNoteModel')
const Note = require('../models/noteModel')

async function getUsers(req,res){
    try{
        const queryInput = req.query.inp
        const userId = req.user.userid
        const noteId = req.params.noteId
        
        const sentRequests = await shareNote.find({noteid:noteId,status:{$ne: "rejected"}}).select("receiverid")
        const sentReceiverIds = sentRequests.map(sentRequest =>{
            return sentRequest.receiverid.toString()
        })
        
        const users = await User.find({_id:{$ne: userId, $nin:sentReceiverIds},$or:[
            
            {username:{$regex:`^${queryInput}`,$options:"i"}},
            {email:{$regex:`^${queryInput}`,$options:"i"}}
        ]}).select('-password')

        if (users.length > 0){
            return res.status(200).json({msg:"all good",users:users})
        }
        else if(users){
            return res.status(200).json({msg:"no users found"})
        }
        return res.status(500).json({msg:"Server error"})
    }catch(err){
        console.log(err)
    }
}

async function shareRequest(req,res){
    try{
        const senderId = req.user.userid
        const receiverId = req.params.receiverId
        const noteId = req.params.noteId
        
        const shareRequest = await shareNote.findOne({noteid:noteId,senderid:senderId,receiverid:receiverId,status:{$ne:"rejected"}})
        if (shareRequest){
            return res.status(409).json({msg:`Share request already sent and is ${shareRequest.status}`})
        }
        const newShareRequest = await shareNote.create({noteid:noteId,senderid:senderId,receiverid:receiverId})
        if (newShareRequest){
            return res.status(201).json({msg:"Share request sent successfully"})
        }
        
        return res.status(500).json({msg:"Please try again later..."})
        

    }catch(err){
        console.log(err)
    }
    
}

async function allShareRequests(req,res){
    try{
        const receiverId = req.user.userid;
        const allRequests = await shareNote.find({receiverid:receiverId, status:'pending'});
        
        if(allRequests){
            const requestDetails = await Promise.all(allRequests.map(async (sharedRequest) =>{
                const sender = await User.findOne({_id:sharedRequest.senderid}).select('username')
                const note = await Note.findOne({_id:sharedRequest.noteid}).select('title')
                return {username:sender?.username, title:note?.title, reqId: sharedRequest.id}
            }
            ))
            return res.status(200).json({pendingRequests:requestDetails})
        }
        return res.status(200).json({msg:"No pending requests"})

    }catch(err){
        console.error(err)
    }

}

// function for updating status of request accepted or pending method will be post and noteid by param and status in body
async function statusUpdate (req, res) {
    try{
        const userId = req.user.userid
        const {shareRequestId} = req.params
        const status = req.body.status

        const sharedRequest = await shareNote.findById(shareRequestId)
        if (sharedRequest){
            sharedRequest.status = status
            const updatedStatus = await sharedRequest.save()
            if(updatedStatus){
                if(status === "rejected") return res.status(200).json({msg:"Rejected access to new note"})
                const accessUpdate = await Note.findByIdAndUpdate(sharedRequest.noteid,{$push:{accessTo:userId}})
                if (accessUpdate) return res.status(200).json({msg:"Accepted access to new note"})
                return res.status(401).json({msg:"Failed to give access"})
            }
            return res.status(500).json({msg:"Please try again"})
        }
        return res.status(404).json({msg:"share request not found"})

    }catch(err){
        console.error(err)
    }

}

module.exports = {getUsers, shareRequest, allShareRequests, statusUpdate}