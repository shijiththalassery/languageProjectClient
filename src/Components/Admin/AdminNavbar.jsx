

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

function AdminNavbar() {

 const navigate = useNavigate();
 const [tutorCount, setTutorCount] = useState(0);

 
 useEffect(() => {
  const socket = io('http://localhost:4002'); // Connect to the Socket.io server


  socket.on('connection', (message) => {
    if (message === 'user send a certificate') {
      // Increment the tutor count when a tutor logs in
      setTutorCount((prevCount) => prevCount + 1);
    }
  });

  return () => {
    socket.disconnect(); // Clean up the socket connection when the component unmounts
  };
}, []);

 console.log(tutorCount,'this is tutuor count')
 const adminLogout = ()=>{
  localStorage.removeItem('adminToken');
  navigate('/adminLogin')
 }

  return (
    <header className="bg-white">
    <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

        <div class="text-indigo-500 md:order-1">

          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul class="flex font-semibold justify-between">

            <li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to='/adminHome'> Dashboard</Link></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to='/adminTutorLists'> Tutors</Link></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to='/adminStudentLists'> Students</Link></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to='/checkTutor'> verification ({tutorCount})</Link></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to='/addLanguage'> language</Link></li>


          </ul>
        </div>
        <div class="order-2 md:order-3">
          <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
          onClick={adminLogout}
          >
                  
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Log Out</span>
                </button>
        </div>
      </div>
    </nav>
    </header>
  );
}

export default AdminNavbar;
