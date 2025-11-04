import axios from "axios";
import { useState,useEffect } from "react"

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [responsemsg, setResponsemsg] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            if(!username  || !password){
                console.log("All fields are required")
                return
            }
            console.log({username,password})

           const response = await axios.post(
                '/api/auth/login',{
                    username:username,
                    password:password
                }
            );
            console.log(response.data)
            setResponsemsg(response.data)

        }
        catch (error){
            console.error(error)
        }
        
    };

  return (
    <>
        <div  className='bg-gray-600'>
            <h2 className="">Signup</h2>
            <p>{responsemsg}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    required
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
        
    </>
  )
}

export default LoginForm