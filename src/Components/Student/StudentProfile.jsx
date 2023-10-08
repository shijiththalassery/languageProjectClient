import React ,{useState, useEffect} from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { BeakerIcon } from '@heroicons/react/solid'
import StudentEdit from './modal/StudentEdit'
import { useNavigate } from 'react-router-dom';

function StudentProfile() {
const navigate = useNavigate()

  useEffect(()=>{
    const token= localStorage.getItem("studentEmail")
    if(!token){
      navigate("/studentLogin")
    }
  })

  return (
    <div className='bg-blue-100' >
      < StudentNavbar />
      <div className="mt-4 student-profile-card w-11/12 max-w-screen-lg mx-auto h-1/2 bg-cardBackGround rounded-lg shadow-xl bg-opacity-75 p-4 ">
        <div className="h-screen  justify-center p-0 m-0 shadow-xl">
          <div className=" w-full h-1/2 rounded-full shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552839335-ab4d3df45a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1956&q=80"
              alt="Card Image"
              className="object-cover w-full h-full rounded-t-lg"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/4 bg-blue-500 bg-opacity-0 rounded-l-lg flex justify-center items-center ">
            <img
              src="https://media.licdn.com/dms/image/D5603AQHH_gy7qm5aJQ/profile-displayphoto-shrink_400_400/0/1691214052155?e=1700697600&v=beta&t=jHztuuifyau9vDqZZA3xAt_NUJCipuXLRAxEagQeIpE"
              alt="Rounded Image"
              className="h-36 w-36 rounded-full object-cover"
            />
          </div>


            <div className="student-profile-card w-full bg-blue-100 rounded-lg shadow-md p-2 mt-4">
              <div className='cardsz'>
                <div className="flex justify-between mt-4">
                  

                  <div className="w-1/4 flex items-center justify-center">
                  <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                    <h3 className="ml-2">shijith</h3>
                    <StudentEdit />
                  </div>
                </div>

                  <div className="w-1/4 flex items-center justify-center">
                    <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <h3 className="ml-2">shijith.thalassery@gmail.com</h3>
                      <StudentEdit />
                    </div>
                  </div>

                  <div className="w-1/4 flex items-center justify-center">
                    <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                      <h3 className="ml-2">9544345344</h3>
                      <StudentEdit />
                    </div>
                  </div>

                  <div className="w-1/4 flex items-center justify-center">
                    <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <h3 className="ml-2">change password</h3>
                      <StudentEdit />
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className='cardsz'>
              <div className="flex justify-between mt-4 space-x-4">
                <div className="student-profile-card w-1/4 bg-blue-500 rounded-lg shadow p-4">
                  <h3>Profile Summary</h3>
                  <p>This is a summary of the student's profile.</p>
                </div>
                <div className="student-profile-card w-1/4 bg-blue-500   rounded-lg shadow p-4">
                  <h3>Education</h3>
                  <p>This is a list of the student's educational qualifications.</p>
                </div>
                <div className="student-profile-card w-1/4 bg-blue-500 rounded-lg shadow p-4">
                  <h3>Skills</h3>
                  <p>This is a list of the student's skills and abilities.</p>
                </div>
                <div className="student-profile-card w-1/4 bg-blue-500 rounded-lg shadow p-4">
                  <h3>Experience</h3>
                  <p>This is a list of the student's work experience.</p>
                </div>
              </div>
            </div>


          </div>
        </div>


      </div>
    </div>
  );
}

export default StudentProfile;
