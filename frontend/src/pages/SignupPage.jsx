import React, { useState } from 'react'
import SignupForm from '../components/signupForm'
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
    <div className='w-full h-dvh flex justify-center items-center'>
      <div className='w-1/2 h-fit bg-blue-600 p-4 rounded-4xl'>
        <div className='w-full flex '>
          <button className='w-1/2 m-1 border-2 rounded-3xl p-2' id='signup' onClick={showForm}>Signup</button>
          <button className='w-1/2 m-1 border-2 rounded-3xl p-2' id='login' onClick={showForm}>Login</button>
        </div>
          {newuser ?<SignupForm /> :<LoginForm />}
      </div>
    </div>
    </>
  )
}

export default SignupPage