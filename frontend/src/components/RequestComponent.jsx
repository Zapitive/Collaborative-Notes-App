import { useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"

function RequestComponent({shareReq, removeRequest}) {

    const [shareRequestId, setShareRequestId] = useState(shareReq?.reqId)
    
    const [cookie,setCookie,removeCookie] = useCookies(['myCookie'])

    const handleRequest = async (status) =>{
        try{
            console.log(status)
            const response = await axios.post(
                `/api/share/statusUpdate/${shareRequestId}`,{
                    status:status
        },{
            headers: {
                Authorization: `Bearer ${cookie.myCookie}`,
            }
        })

        if (response.status === 200){
            const data = await response.data
            removeRequest(shareRequestId,status)
            alert(data.msg)
            
        }
            

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="bg-violet-200 w-full min-h-20 max-h-fit rounded-xl p-0.5 flex justify-around mt-2">
        <div className="p-1 my-2 w-15/20 overflow-hidden">
            <h1 className="font-bold text-xl">{shareReq?.username}</h1>
            <p className="font-medium text-gray-700">{shareReq?.title}</p>
        </div>
        <div className="w-3/20 h-15 p-2 justify-around">
            <div>
                <button className="w-full border-2 rounded mb-2 bg-white hover:bg-green-500 hover:font-bold hover:cursor-pointer" onClick={() => {handleRequest("accepted")}}>
                    <svg className="size-6 ml-1 group" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="group-hover:stroke-white" d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div>
                <button className="w-full border-2 rounded mb-2 bg-white hover:bg-red-500 hover:cursor-pointer" onClick={() => {handleRequest("rejected")}}>
                    <svg className="size-6 ml-1 hover:fill-white" viewBox="0 0 25 25" fill="#000">
                        <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"/>
                    </svg>
                </button>
            </div> 
        </div>
    </div>
  )
}

export default RequestComponent