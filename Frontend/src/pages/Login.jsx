import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const {user,login}=useAuth()
  const navigate= useNavigate()
  const[credentials,setCredentials]= useState({email:"",password:""})
  useEffect(()=> {
    if(user){
      setTimeout(()=>navigate("/"),500)
    }
  },[user])

 async function handlelogin(event){
  event.preventDefault()// preventing refresh
    if(credentials.email && credentials.password){
      await login(credentials) // waiting fro login to complete
      navigate("/")

    }
   
  }
  function changeHandler(e){
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  
  return (
    <>
    <h1 className="text-green-400 text-5xl font-bold text-center mt-10">
  Login Form
</h1>

<form className="w-[500px] bg-gray-300 rounded-2xl flex flex-col items-center m-auto mt-10 py-10 gap-10" onSubmit={handlelogin}>
  {/* Email Field */}
  <div className="flex w-4/5 justify-between items-center gap-5">
    <label htmlFor="email" className="text-xl font-bold w-1/3">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Write your Email..."
      required
      className=" outline-1 rounded-md text-lg px-3 py-2 w-2/3"
      onChange={changeHandler} 
      value={credentials.email}
    />
  </div>

  {/* Password Field */}
  <div className="flex w-4/5 justify-between items-center gap-5">
    <label htmlFor="password" className="text-xl font-bold w-1/3">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Write your Password..."
      required
      className=" outline-1 rounded-md text-lg px-3 py-2 w-2/3"
      onChange={changeHandler} 
      value={credentials.password}
    />
  </div>

  {/* Button */}
  <div>
    <button
      type="submit"
      className="py-2 px-20 bg-emerald-600 text-white text-2xl rounded-md hover:bg-emerald-700 transition-all"
    >
      Login
    </button>
  </div>
</form>

    </>
  )
}

export default Login