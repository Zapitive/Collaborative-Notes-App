import axios from "axios";
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import {AppContext} from '../AppContext'

function LoginForm() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { usertoken, setUsertoken } = useContext(AppContext)

    const navigate = useNavigate();

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
            if(response.status === 200){
                setUsertoken(response.data.token)
                navigate('/notes');
            }
        }
        catch (error){
            console.error(error)
        }
        
    };

  return (
    <>
        <h2 className="text-center text-2xl  mt-5">Login</h2>
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
                <button type="submit" className="text-2xl border-2 p-3 mt-5 rounded-4xl cursor-pointer">Login</button>
                </div>
                
            </form>
        
    </>
  )
}

export default LoginForm