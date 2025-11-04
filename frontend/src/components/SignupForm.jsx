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
        <div  className='bg-gray-600'>
            <h2 className="">Signup</h2>
            {/* <p>{responsemsg}</p> */}
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
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e)=> setEmail(e.target.value)}
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

export default SignupForm