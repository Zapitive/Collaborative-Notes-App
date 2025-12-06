import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react"
import { useCookies } from "react-cookie";
import Overlay from "./Overlay";

const useDebounce = (value,delay)=>{
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(()=>{
    const timeoutHandler = setTimeout(() =>{
        setDebounceValue(value)
      },delay)

      return () =>{
        clearTimeout(timeoutHandler)
      };
  },[value,delay])

  return debounceValue
}

function Note({note,deleteOneNote}) {

    const [newtitle,setNewTitle] = useState(note.title)
    const [newnote,setNewNote] = useState(note.note)
    const [noteId, setNoteId] = useState(note.id)
    const [cookie,setCookie,removeCookie] = useCookies(['myCookie']);
    const textareaRef = useRef()
    const [overlayOpen,setOverlayOpen] = useState(false)

    // for share note feature
    const [shareInput, setShareInput] = useState('')
    const debounceInput = useDebounce(shareInput,1000)
    const [shareOverlayOpen, setShareOverlayOpen] = useState(false)
    const [users, setUsers] = useState(null)

    const toggleOverlay = async () =>{
      setOverlayOpen(!overlayOpen)
      if (overlayOpen === true && (note.title !== newtitle || note.note!== newnote)){
        try{

        
        const token = cookie.myCookie
        console.log(token)
        const response = await axios.patch(
                `/api/note/updateNote/${noteid}`,{
                    title:newtitle,
                    note:newnote
                },
                {
                    headers: { 'Authorization': `Bearer ${cookie.myCookie}` },
                    
                }
            )

            if (response.status === 200) {
              const data = await response.data;
              
            }
        }catch(err){
          console.log(err)
        }
      }
    } 

    const toggleShareOverlay = () =>{
      setShareOverlayOpen(!shareOverlayOpen)
      if(shareOverlayOpen) {
        setShareInput('')
        setUsers(null)
      }
    }
    
    const handleNoteChange = (e) => {
      setNewNote(e.target.value);

      // Auto resize height
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    };

    const shareRequest = async (receiverId)=>{
      try{
        const response = await axios.post(`/api/share/shareRequest/${receiverId}/${noteId}`,{},{
          headers : { 'Authorization': `Bearer ${cookie.myCookie}` }
        })
        if (response.status === 201){
          const msg = await response.data.msg
          setUsers(prev => prev.filter(user => user._id !== receiverId))
          alert(msg)
        }
      }catch(err){
        if(err.response){
          if (err.response.status === 409 || err.response.status === 500){
            alert(err.response?.data?.msg)
          }
        }
        else{
          console.error(err)
        }
      }
      
      
    }

    const handleDeleteNote = async () =>{
      const response = await axios.delete(
                `/api/note/deleteNote/${noteId}`,
                {
                    headers: { 'Authorization': `Bearer ${cookie.myCookie}` }
                }
            )
            if (response.status === 200) {
              const data = await response.data;
              alert(data.msg)
              deleteOneNote(noteId)
            }
            if (response.status === 204 ) {
              console.log('here')
              alert('Note Deleted Successfully')
              deleteOneNote(noteId)
            }
    }


    useEffect(()=>{
      if (debounceInput !== ''){
        try{
          const fetchUsers = async () =>{
            const response = await axios.get(`/api/share/getUsers/${noteId}?inp=${encodeURIComponent(debounceInput)}`,{
              headers: { 'Authorization': `Bearer ${cookie.myCookie}` }
            }
          )

            if(response.status === 200){
              const data = await response.data
              const users = await data.users
              setUsers(users)
              
            }
          }

          fetchUsers();
        }catch(err){
          console.log(err)
        }
        
      }
    },[debounceInput])

    useEffect(()=>{
      //console.log(users)
    },[users])
    

  return (
    <>
      <div className="bg-violet-200 w-full h-20 max-h-20 mt-4 rounded-2xl justify-self-center overflow-hidden scroll-smooth hide-scrollbar flex">
        <div className="w-9/10 cursor-pointer" onClick={toggleOverlay}>

          <div className="border-b-3 border-dotted border-gray-700">
            <h1 className="text-2xl font-semibold ml-4 my-1 min-h-8">{newtitle}</h1>
          </div>
          <div className="mx-4 w-9/10">
            <p className="text-lg mt-1">{newnote}</p>
          </div>
          <Overlay isOpen={overlayOpen} onClose={toggleOverlay}>
            <input className="focus:outline-0 w-full border-b-3 border-dotted border-gray-700 text-2xl font-semibold"
            type="text" 
            value={newtitle}  
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={75} />
            <textarea className="focus:outline-none w-full text-lg mt-1 overflow-hidden resize-none "
            ref={textareaRef}
            type="text" 
            value={newnote}
            onChange={handleNoteChange}/>
          </Overlay>
        </div>
        <div className="w-1/10 h-12 my-auto border-3 border-dotted border-gray-700 border-r-0 flex justify-around items-center">
          <div className="cursor-pointer"  onClick={handleDeleteNote}>
            <svg  className="size-8 hover:fill-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 11V17 M14 11V17 M4 7H20 M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="cursor-pointer" onClick={toggleShareOverlay}>
            <svg className="size-8 hover:fill-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <Overlay isOpen={shareOverlayOpen} onClose={toggleShareOverlay}>
              <div className="flex-col w-1/2 justify-self-center">
                <div className="border-b border-gray-700 rounded-2xl px-2 bg-violet-200 shadow-lg">
                  <input className="w-full focus:outline-0" placeholder="Search by username or email..." value={shareInput} onChange={(e) => setShareInput(e.target.value)} />
                </div>
                <div className="border-2 mt-2 bg-violet-500 rounded-2xl p-2 min-h-15 [&>div]:mt-2 [&>div:first-child]:mt-0">
                  {users ? 
                    users.map((user)=>{
                      return (
                      
                      <div className="w-full bg-violet-200 h-15 rounded-2xl flex" key={user._id}>
                        <div className="ml-3">
                          <h1 className="text-2xl font-semibold">{user.username}</h1>
                          <p className=" text-gray-500 text-md">{user.email}</p>
                        </div>
                        <div className="ml-auto mr-4 self-center cursor-pointer" onClick={()=>shareRequest(user._id)}>
                          <svg className="size-8 hover:fill-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    )}): users!==null &&
                    <div className="w-full bg-violet-200 h-15 rounded-2xl">
                      <h1 className="text-xl font-semibold ml-2 py-3 text-gray-500">No users with matching username or email</h1>
                    </div>
                  }
                </div>
              </div>
            </Overlay>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Note