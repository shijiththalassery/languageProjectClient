
import React, { useState } from 'react'
import { adminLogin } from '../../Services/Apis'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async()=>{
    const jsonData = {
      name:email,
      password:password
    }
    const adminData = JSON.stringify(jsonData)
    const respond = await adminLogin(adminData)
    console.log(respond)
    if(respond){
      if(respond.data == 'success'){
        navigate('/adminHome')
      }
    }
  }
  return (
    <div>
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
    <div className="md:w-1/3 max-w-sm">
      <img
        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        alt="Sample image"
      />
    </div>
    <div className="md:w-1/3 max-w-sm">


      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        type="text"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-4">
        {/* Radio buttons for user type */}

      </div>
      <div className="text-center md:text-left">
        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider ml-36" 
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>

    </div>
  </section>
    </div>
  )
}

export default AdminLogin
