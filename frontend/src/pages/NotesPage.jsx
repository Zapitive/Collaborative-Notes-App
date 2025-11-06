import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../AppContext";
import Note from "../components/Note";
import Overlay from "../components/Overlay";

function NotesPage() {

    const [ notes , setNotes ] = useState(null)
    const {usertoken , setUsertoken} = useContext(AppContext);
    const [noteOpen, setNoteOpen] = useState(false)

    useEffect(() => {
        const fetchNotes = async ()=>{
            const response = await axios.get(
                '/api/note/getNotes',
                {
                    headers: { 'Authorization': `Bearer ${usertoken}` }
                }
            )
            console.log(response.data);
            if (response.status === 200) {
              
                setNotes(response.data);
                
            }
        }
        fetchNotes()
    },[])

    const toggleNote = ()=>{
      setNoteOpen(!noteOpen)
    }

  return (
    <>
    <h1>Notes Page</h1>
    {notes && (
      <div className="w-4/5 mx-auto mt-5 ">
        {
          notes.map(item =>(
            <div key={item.id} onClick={toggleNote} className="bg-sky-600 w-full m-4 p-2 rounded-2xl flex justify-center cursor-pointer">
              <h2>{item.title}</h2>
              <Overlay  isOpen={noteOpen} onClose={toggleNote}>
                <Note key={item.id} title={item.title} note={item.note}/>
              </Overlay>
            </div>
          ))
        }
      </div>
          )}
    </>
  )
}

export default NotesPage