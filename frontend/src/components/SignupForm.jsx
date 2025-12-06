import axios from "axios";
import { useState,useEffect } from "react"

function SignupForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [responsemsg, setResponsemsg] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            if(!username || !email || !password){
                console.log("All fields are required")
                return
            }
            console.log({username,email,password})

           const response = await axios.post(
                '/api/auth/signup',{
                    username:username,
                    email:email,
                    password:password
                }
            );
            console.log(response.data.message)
            setResponsemsg(response.data.message)

        }
        catch (error){
            console.error(error)
        }
        
    };

  return (
    <>
            <form onSubmit={handleSubmit}>                
                <div className="flex w-11/12 h-9/10 justify-self-center justify-center items-center rounded-3xl border-2 pt-2 pb-4">
                    <div className="w-9/20 h-9/10 mr-2">
                        <p className="text-end text-lg font-semibold my-1">Username</p>
                        <p className="text-end text-lg font-semibold my-1">Email</p>
                        <p className="text-end text-lg font-semibold my-1">Password</p>
                    </div>
                    <div className="w-9/20 h-9/10">
                        <input
                        className="border-b-2 focus:outline-none h-6 text-lg font-semibold w-3/5 my-1"
                        type="text"
                        id="username"
                        value={username}
                        required
                        onChange={(e)=> setUsername(e.target.value)}
                        />
                        <input
                        className="border-b-2 focus:outline-none h-6 text-lg font-semibold w-3/5 my-1 "
                        type="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                        <input
                        className="border-b-2 focus:outline-none h-6 text-lg font-semibold w-3/5 my-1"
                        type="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="block mx-auto font-bold border-2 p-2 mt-5 rounded-3xl cursor-pointer hover:shadow-xl hover:bg-violet-200">Sign up</button>
            </form>
        
    </>
  )
}

export default SignupForm