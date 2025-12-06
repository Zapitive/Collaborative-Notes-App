import axios from "axios";
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LoginForm() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [cookie,setCookie,removeCookie] = useCookies(['myCookie'])

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
                setCookie('myCookie',`${response.data.token}`,{path:'/'})
                navigate('/notes');
            }
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
                        <p className="text-end text-lg font-semibold my-1">Email or Username</p>
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
                        className="border-b-2 focus:outline-none h-6 text-lg font-semibold w-3/5 my-1"
                        type="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="block mx-auto font-bold border-2 p-2 px-3 mt-5 rounded-3xl cursor-pointer hover:shadow-xl hover:bg-violet-200">Login</button>
            </form>
    </>
  )
}

export default LoginForm