import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../AppContext";

function Note({id,title,note}) {

    const [newtitle,setNewTitle] = useState(title)
    const [newnote,setNewNote] = useState(note)


    const updateNote = ()=>{
        console.log(newtitle,newnote)
    }
    
    

  return (
    <>
        <div className="bg-blue-600 w-9/10 min-h-fit">
            <button onClick={updateNote}>Save</button>
            <input onChange={(e)=>{setNewTitle(e.target.value)}} value={newtitle} id="title" className="w-full text-3xl focus:outline-none border-b-2"/>
            <textarea onChange={(e)=>{setNewNote(e.target.value)}} value={newnote} id="note" className="w-full text-xl"/>
        </div>
    </>
    
  )
}

export default Note