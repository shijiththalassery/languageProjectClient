import React, { useState, useEffect } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate } from 'react-router-dom'; // You should use this for navigation
import { studentTutorList } from '../../Services/Apis';
import ReviewModal from './ReviewModal/Modal';
import { myTutorList } from '../../Services/Apis';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating, // Ensure proper imports for these components
} from "@material-tailwind/react";

function YourLanguage() {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState('')
  console.log(tutor,'this is my tutor')

  const email = JSON.parse(localStorage.getItem('studentEmail'))

  useEffect(() => {
    const token = localStorage.getItem("studentEmail")
    if (!token) {
      navigate("/studentLogin")
    }
  })

  useEffect(()=>{
    const fectMyCourse = (email)=>{
      const responce =  myTutorList(email)
      responce.then((result)=>{

        setTutor(result.data.course)
      }).catch((error)=>{

        console.log(error)
      })

    }
    fectMyCourse(email)
  },[])

  return (
    <div className='w-screen h-screen sm:w-full sm:h-full md:w-screen md:h-screen'>
      <StudentNavbar />
      {tutor && tutor.length > 0 && tutor.map((tutorObject, index) => (
        <div key={index} className=" border-2 border-blue-600 flex flex-col md:flex-row md:max-w-md p-4 m-4 bg-white rounded-lg shadow-lg">
          <div className="md:w-2/3 md:pl-4">
            <div className="flex justify between items-center mb-4">
              <h2 className="text-xl font-bold"></h2> {/* Tutor's name */}
            </div>
            <p className="text-gray-700">Course: <b>{tutorObject?.language}</b></p> {/* Course name */}
            <p className="text-gray-700">Time: <b>{tutorObject?.origianlTime}</b></p> {/* Price */}
            <ReviewModal id={tutorObject._id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default YourLanguage;
