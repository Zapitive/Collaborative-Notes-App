const Note  = require('../models/noteModel')
const noteRevision = require('../models/noteRevisionModel')

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

async function getNote(req,res){
    const { noteId } = req.params
    const note = await Note.findById(noteId)
    if(note){
        res.status(200).send(note)
    }
    else{
        res.status(404).send("Unable to retrive the note")
    }
}

async function updateNote(req,res){
    const { noteId } = req.params
    const {title, note} = req.body
    const ogNote = await Note.findById(noteId)
    if(ogNote){
        const versionedNote = await noteRevision.create({noteid:ogNote._id,title:ogNote.title,note:ogNote.note,noteVersion:ogNote.noteVersion})
        ogNote.title = title
        ogNote.note = note
        ogNote.noteVersion +=1
        // only create versionedNote if note is updated 
        // check for errors
        const updatedNote = await ogNote.save()
        if (versionedNote && updatedNote){
            res.status(201).send(`${versionedNote} and ${updatedNote}`)
        }
    }
    else{
        res.status(404).send("Unable to retrive the note")
    }
}

async function deleteNote(req,res){
    const {noteId} = req.params
    const user = req.user
    const noteToDelete = await Note.findById(noteId)
    if(user.userid == noteToDelete.createdBy){
        const deletedNote = await noteToDelete.deleteOne()
        if (deletedNote){
            res.status(204)
        }
        else{
            res.status(400).send("Unable to delete note")
        }
        
    }
    else{
        res.status(401).send("No permission to delete the note")
    }
}

async function giveAccess(req,res){
    const docid = req.params.docid
    const accid = req.params.accid

    const updatedNote = await Note.findByIdAndUpdate(docid,{$push:{accessTo:accid}})

    if(updatedNote){
        res.status(200).send(`Given access to ${accid}`)
    }
}

module.exports = {addNote,getAllNotes,giveAccess,getNote,updateNote,deleteNote}