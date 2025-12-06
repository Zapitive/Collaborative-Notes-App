import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

function SignupPage() {

  const [newuser,setNewuser] = useState(true)

  const showForm = (e)=>{
    const form = e.target.id

    if(form === 'signup' && newuser === false){
      setNewuser(true)
    }
    else if(form === 'login' && newuser === true){
      setNewuser(false)
    }
    else{
      return
    }
  }

  return (
    <>
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-1/2 h-1/2 flex flex-col bg-violet-500 p-4 rounded-4xl'>
        <div className='w-11/12 grid grid-cols-7 self-center'>
          <button className={` ${newuser? 'col-span-6 bg-violet-200 text-black font-bold border-3' : 'col-span-1'} m-1 border-2 rounded-3xl p-2`} id='signup' onClick={showForm}>Signup</button>
          <button className={`${newuser? 'col-span-1' : 'col-span-6 bg-violet-200 text-black font-bold border-3'} m-1 border-2 rounded-3xl p-2`} id='login' onClick={showForm}>Login</button>
        </div>
        {newuser ? 
          <h1 className='self-center text-2xl my-2'>Signup</h1>:
          <h1 className='self-center text-2xl my-2'>Login</h1>
        }
          {newuser ?<SignupForm /> :<LoginForm />}
      </div>
    </div>
    </>
  )
}

export default SignupPage