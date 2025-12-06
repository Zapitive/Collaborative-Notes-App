import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react"
import Note from "../components/Note";
import { useCookies } from "react-cookie";
import ShareOptions from "../components/ShareOptions";
import Overlay from "../components/Overlay";

function NotesPage() {

    const [ notes , setNotes ] = useState(null)
    const [addNoteOverlay, setAddNoteOverlay] = useState(false)
    const [addNoteTitle, setAddNoteTitle] = useState('')
    const [addNote, setAddNote] = useState('')
    const [newNoteRequest, setNewNoteRequest] = useState(false)
    

    const textareaRef = useRef()

    const [cookie,setCookie,removeCookie] = useCookies(['myCookie'])

    const deleteOneNote = (value) =>{
      setNotes(prev => prev.filter(note => note.id !==  value));
    }

    const handleNoteChange = (e) => {
      setAddNote(e.target.value);

      // Auto resize height
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    };

    const toggleAddNoteOverlay = async () =>{
      setAddNoteOverlay(!addNoteOverlay)
      
      if (addNoteOverlay &&  (!/^\s*$/.test(addNoteTitle) || !/^\s*$/.test(addNote) )){
        try{
        
        const response = await axios.post(
                `/api/note/addNote`,{
                    title:addNoteTitle,
                    note:addNote
                },
                {
                    headers: { 'Authorization': `Bearer ${cookie.myCookie}` },
                    
                }
            )

            if (response.status === 201) {
              const data = await response.data;
              setAddNote('')
              setAddNoteTitle('')
              setNotes(prev => [...prev, data.note]);
              alert(data.message)
            }
        }catch(err){
          console.log(err)
        }
      }
    }

    useEffect(() => {
        const fetchNotes = async ()=>{
            const response = await axios.get(
                '/api/note/getNotes',
                {
                    headers: { 'Authorization': `Bearer ${cookie.myCookie}` }
                }
            )
            if (response.status === 200) {
              const data = await response.data.notes;
              setNotes(data);
            }
        }
        fetchNotes()

    },[newNoteRequest])
  return (
    <>
      <ShareOptions setNewNoteRequest={setNewNoteRequest} newNoteRequest={newNoteRequest}/>
        <div className="w-full h-full p-0.5">
          <div className="w-4/5 h-19/20 py-4 mt-5 m-auto rounded-2xl bg-violet-500 flex-col ">
            <div className="flex mb-1">
              <h1 className="text-4xl ml-9 mt-2">Collaborative Notes App</h1>
              <div className="w-1/9 ml-auto mr-8 bg-violet-200 rounded-l-full">
                <button className="rounded-full size-10 bg-violet-200 cursor-pointer mt-0.5" onClick={toggleAddNoteOverlay}>+</button>
                Add Note
                <Overlay isOpen={addNoteOverlay} onClose={toggleAddNoteOverlay}>
                  <input className="focus:outline-0 w-full border-b-3 border-dotted border-gray-700 text-2xl font-semibold"
                  type="text" 
                  value={addNoteTitle}  
                  onChange={(e) => setAddNoteTitle(e.target.value)}
                  maxLength={75} />
                  <textarea className="focus:outline-none w-full text-lg mt-1 overflow-hidden resize-none "
                  ref={textareaRef}
                  type="text" 
                  value={addNote}
                  onChange={handleNoteChange}/>
              </Overlay>
              </div>
            </div>
            <div className="w-19/20 h-7/8 justify-self-center overflow-auto scroll-smooth hide-scrollbar">

            {/* Note component will go below this */}
              {
                notes?.map(note =>{
                  
                  return <Note key={note.id} note={note} deleteOneNote={deleteOneNote} />
                })
              }
            </div>
            
          </div>
          
        </div>
    </>
  )
}

export default NotesPage