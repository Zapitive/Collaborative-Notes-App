const Note  = require('../models/noteModel')
const noteRevision = require('../models/noteRevisionModel')
const shareNote = require('../models/shareNoteModel')

async function addNote(req,res){
    const { title,note } = req.body
    const user = req.user

    

    const newNote = await Note.create({title:title,note:note,createdBy:user.userid})
    if(newNote){
        const newNoteId = await newNote.id
        return res.status(201).json({message:"new note created successfully",note:{id:newNoteId,title:title,note:note}})
    }
    else{
        return res.status(401).json({msg:"Unable to add note"})
    }
}

async function getAllNotes(req,res){
    const user = req.user
    const allNotes = await Note.find({$or:[{createdBy:user.userid},{accessTo:user.userid}]})
    const notes = allNotes.map(
        notedata =>{
            return {
                id : notedata.id,
                title: notedata.title,
                note: notedata.note
            }
        }
    )
    return res.status(200).json({notes:notes})
}

async function getNote(req,res){
    const { noteId } = req.params
    const note = await Note.findById(noteId)
    if(note){
        return res.status(200).send(note)
    }
    else{
        return res.status(404).send("Unable to retrive the note")
    }
}

async function updateNote(req,res){
    const { noteId } = req.params
    const {title, note} = req.body
    const ogNote = await Note.findById(noteId)
    // make it on frontend
    if(ogNote.title === title && ogNote.note === note){
        return res.status(200).json({message:"note read only"})
    }
    if(ogNote){
        const versionedNote = await noteRevision.create({noteid:ogNote._id,title:ogNote.title,note:ogNote.note,noteVersion:ogNote.noteVersion})
        ogNote.title = title
        ogNote.note = note
        ogNote.noteVersion +=1
        // only create versionedNote if note is updated 
        // check for errors
        const updatedNote = await ogNote.save()
        if (versionedNote && updatedNote){
            return res.status(201).json(`${versionedNote} and ${updatedNote}`)
        }
    }
    else{
        return res.status(404).send("Unable to retrive the note")
    }
}

async function deleteNote(req,res){
    const {noteId} = req.params
    const user = req.user
    const noteToDelete = await Note.findById(noteId)
    if(user.userid === noteToDelete.createdBy.toString()){
        //const updateNote = await noteToDelete.updateOne({$set:{accessTo:[]}}) send the other user state update
        const deletedNote = await noteToDelete.deleteOne()
        if (deletedNote){
            await shareNote.deleteMany({noteid:noteId})
            await noteRevision.deleteMany({noteid:noteId})
            return res.status(204).send()
        }
        else{
            return res.status(400).send("Unable to delete note")
        }
        
    }
    else{
        const updateNote = await noteToDelete.updateOne({$pull:{accessTo:user.userid}})
        if (updateNote){
            return res.status(200).json({msg:"Note access removed successfully"})
        }
        else{
            return res.status(400).send("Unable to delete note")
        }
    }
}

// async function giveAccess(req,res){
//     const docid = req.params.docid
//     const accid = req.params.accid

//     const updatedNote = await Note.findByIdAndUpdate(docid,{$push:{accessTo:accid}})

//     if(updatedNote){
//         res.status(200).send(`Given access to ${accid}`)
//     }
// }

module.exports = {addNote,getAllNotes,getNote,updateNote,deleteNote}