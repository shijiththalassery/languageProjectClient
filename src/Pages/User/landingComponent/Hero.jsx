import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
    const navigate = useNavigate()

    const studentLogin = ()=>{
        navigate('/studentLogin')
    }
    const tutorLogin = ()=>{
        navigate('/tutorLogin')
    }
  return (
    <div>
    <div className='w-screen h-screen  flex'>
      <div className='w-1/2 h-screen '>
        <div className='w-full h-1/2 flex'>
          <div className='w-full  flex justify-center items-center'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold text-indigo-700 mb-4'>Unlock Learning Opportunities</h1>
              <p className='text-lg text-gray-700'>Join now to connect with language tutors and start learning.</p>
              <button 
              onClick={studentLogin}
              className='bg-indigo-700 text-white rounded-full px-6 py-3 mt-4 hover:bg-indigo-600 transition duration-300'>Get Started</button>
            </div>
          </div>
        </div>
        <div className='w-full h-1/2 flex'>
          <div className='w-full  flex justify-center '>
            <div className='text-center'>
              <h1 className='text-3xl font-bold text-indigo-700 mb-4'>Unlock Teaching Opportunities</h1>
              <p className='text-lg text-gray-700'>Join now to share your language skills and start teaching.</p>
              <button className='bg-indigo-700 text-white rounded-full px-6 py-3 mt-4 hover:bg-indigo-600 transition duration-300'
              onClick={tutorLogin}>Get Started</button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 h-screen flex justify-center items-center '>
        <img src='https://bucket.mlcdn.com/a/2044/2044076/images/255ecc37d03bce82d5f82837742e0895aaf914cd.png'></img>
      </div>

    </div>
  </div>
  )
}

export default Hero
