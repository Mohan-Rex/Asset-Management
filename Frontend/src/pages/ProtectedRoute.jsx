import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute(props) {
    //verify the auth
    const{user,loading}= useAuth()
    const navigate=useNavigate()
    //mounting validation
   if(loading) return <h1> Loading.........</h1>

   if(!user) return <Navigate to={"/login"} replace/>

  
 return(
   <>
   {props.children}
   </>
 )
  

}

export default ProtectedRoute