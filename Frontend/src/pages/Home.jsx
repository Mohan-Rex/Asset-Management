import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Home/Sidebar'

function Home() {

  const navigate=useNavigate()

  return (
   <>
      <div className='flex w-full min-h-screen'>
        <div className='w-[20%] bg-amber-200'>
          <Sidebar/>
        </div>
        {/* main Content */}
        <div className='flex-1 bg-blue-500'>
          <Outlet/>
        </div>

      </div>

   </>
    
  )
}

export default Home