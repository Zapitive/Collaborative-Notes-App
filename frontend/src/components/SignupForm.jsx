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
            <h2 className="text-center text-2xl  mt-5">Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center space-y-2 mt-5">
                <div >
                    <label htmlFor="username" className="mr-2">Username</label>
                    <input
                    className="border-b-2 focus:outline-none"
                    type="text"
                    id="username"
                    value={username}
                    required
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                    
                </div>
                <div>
                    <label htmlFor="email" className="mr-10">Email</label>
                    <input
                    className="border-b-2 focus:outline-none"
                    type="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    
                </div>
                <div >
                    
                    
                    <label htmlFor="password" className="mr-3">Password</label>
                    <input
                    className="border-b-2 focus:outline-none"
                    type="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="text-2xl border-2 p-3 mt-5 rounded-4xl cursor-pointer">Sign up</button>
                </div>
                
            </form>
        
    </>
  )
}

export default SignupForm