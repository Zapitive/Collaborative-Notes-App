const Note  = require('../models/noteModel')

async function addNote(req,res){
    const { title,note } = req.body
    const user = req.user

    if(!title){
        res.status(400).json({msg:"please enter title"})
    }

    const newNote = await Note.create({title:title,note:note,createdBy:user.userid})
    if(newNote){
        res.status(201).json({message:"new note created successfully",note:newNote})
    }
    else{
        res.status(401).json({msg:"Unable to add note"})
    }
}

async function getAllNotes(req,res){
    const user = req.user
    const allNotes = await Note.find({$or:[{createdBy:user.userid},{accessTo:user.userid}]})
    res.status(200).send(allNotes)
}

async function giveAccess(req,res){
    const docid = req.params.docid
    const accid = req.params.accid

    const updatedNote = await Note.findByIdAndUpdate(docid,{$push:{accessTo:accid}})

    if(updatedNote){
        res.status(200).send(`Given access to ${accid}`)
    }
}


module.exports = {addNote,getAllNotes,giveAccess}