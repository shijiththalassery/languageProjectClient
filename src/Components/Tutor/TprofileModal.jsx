import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {tutorProfileEdit} from '../../Services/Apis'

function TProfileModal({ visible, onClose, tutorDetails }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const tutorInf = tutorDetails;

  if (!visible) return null;
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose()

  }

  const editDetail = async () => {
    const data = {
      name: name ? name : tutorInf.name,
      email: email ? email : tutorInf.email,
      phone: phone ? phone : tutorInf.phone,
      password: password ? password : tutorInf.password,
      confPassword: confPassword ? confPassword : tutorInf.password,
    }
    const userData = JSON.stringify(data);
    const mobilePattern = /^[6-9]\d{9}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/;
    if (!mobilePattern.test(data.phone)) {
      console.log('mobile issue')
    }
    else if (!passwordRegex.test(data.password)) {
      console.log('password issue')
      alert('type a good password')
      toast.error("Password must contain at least one capital letter, one small letter, one number or special character, and be at least 6 characters long.");
    }
    else if (data.password != data.confPassword) {
      alert('password and confirm password is not match')
      console.log(data.password, data.confPassword, 'this is password and confirm password')
      toast.error("Passwords do not match. Please type them correctly.");
    }
    else if (!data.email.includes('@gmail.com')) {
      toast.error("enter enter a valid email id")
      alert("enter valid email");
    } else {
      try {
        const responce = await tutorProfileEdit(userData);
        console.log(responce ,'thisis the responce of the edit profile api')
      } catch (error) {
        
      }

      onClose()
    }

  }
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className="  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Welcome back
        </h1>
        <p className="text-center text-gray-700 mb-5">Sign in</p>

        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={tutorInf.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={tutorInf.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={tutorInf.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="Password"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="Enter your Confirm Password"
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button onClick={editDetail} className="px-5 py-2 bg-gray-700 text-white rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default TProfileModal