import { useState, useEffect } from "react"
import RequestComponent from "./RequestComponent"
import axios from "axios"
import { useCookies } from "react-cookie"


function ShareOptions({setNewNoteRequest, newNoteRequest}) {

    const [isShareOpen, setIsShareOpen] = useState(false)
    const [cookie,setCookie,removeCookie] = useCookies(['myCookie']);
    const [shareRequests, setShareRequests] = useState(null)

    const toggleShareOptions = () =>{
        setIsShareOpen(!isShareOpen)
    }

    const removeRequest = (reqId,status) => {
        setShareRequests(prev => prev.filter(shareRequest => shareRequest.reqId !== reqId));
        if (status==='accepted') setNewNoteRequest(!newNoteRequest)
    };

    useEffect(()=>{
        try{
            const allSharedRequests = async () =>{
                const response = await axios.get(`/api/share/allShareRequests`,{
                      headers: { 'Authorization': `Bearer ${cookie.myCookie}` }
                    })
                const data = await response.data?.pendingRequests
                setShareRequests(data)
            }

            allSharedRequests()
        }catch(err){
            console.log(err)
        }
         
    },[isShareOpen])

  return (
    <div className={`h-19/20 mt-5 ml-2 rounded-2xl w-1/3 z-10 absolute transition-all duration-400 bg-white p-3 flex ${isShareOpen ? 'border-5' : '-translate-x-85/100'}`}>
        <div className="w-4/5 ml-4 rounded-2xl bg-violet-500 p-4">
        <h1 className="mb-4 font-semibold text-3xl">Requests Received</h1>
            {
                shareRequests ? shareRequests.map((shareReq) =>{
                    return <RequestComponent key={shareReq.reqId} shareReq={shareReq} removeRequest={removeRequest}/>
                })
                
                :(
                    <div className="bg-violet-200 w-full min-h-20 max-h-fit rounded-xl p-0.5 flex justify-around">
                    
                        <div className="p-1 my-2 w-15/20 ">
                            <h1 className="font-bold text-xl text-gray-700">No pending requests</h1>
                        </div>
                    </div>
                )
            }
            
        </div>
        <div className={`h-15 mr-2 rounded-2xl bg-violet-200 ml-auto w-1/8 cursor-pointer ${isShareOpen && 'border-2'}`} onClick={toggleShareOptions}>
            <svg className="size-15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="transition-all duration-700 ease-out" d={`${isShareOpen ? 'M4 6H20M4 12H14M4 18H9' : 'M4 6H20M4 12H20M4 18H20'}`} stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    </div>
  )
}

export default ShareOptions