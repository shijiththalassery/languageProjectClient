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
  Rating, // Ensure proper imports for these components
} from "@material-tailwind/react";
import StudNav from './StudNav';
import Button from '@mui/material/Button';

function YourLanguage() {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState('')
  const [tutorData, setTutorData] = useState('')
  console.log(tutor, 'this is my tutor')

  const email = JSON.parse(localStorage.getItem('studentEmail'))

  useEffect(() => {
    const token = localStorage.getItem("studentEmail")
    if (!token) {
      navigate("/studentLogin")
    }
  })

  useEffect(() => {
    const fectMyCourse = (email) => {
      const responce = myTutorList(email)
      responce.then((result) => {

        setTutor(result.data.course);
        setTutorData(result.data)
      }).catch((error) => {

        console.log(error)
      })

    }
    fectMyCourse(email)
  }, [])

  const joinClass = (id)=>{
   navigate(`/myclass/${id}`)
  }

  return (
    <div className='w-screen h-screen sm:w-full sm:h-full md:w-screen md:h-screen'>
      <StudNav />
      {tutor && tutor.length > 0 && tutor.map((tutorObject, index) => (
        <div key={index} className=" border-2 border-blue-600 flex flex-col md:flex-row md:max-w-md p-4 m-4 bg-white rounded-lg shadow-lg">
          <div className="md:w-2/3 md:pl-4">
            <div className="flex justify between items-center mb-4">
              <h2 className="text-xl font-bold"></h2> {/* Tutor's name */}
            </div>
            <p className="text-gray-700">Course: <b>{tutorObject?.language}</b></p> {/* Course name */}
            <p className="text-gray-700">Time: <b>{tutorObject?.origianlTime}</b></p> {/* Price */}

            <ReviewModal id={tutorObject.tutorId} />
          </div>
          <div className="flex justify-end items-center">
          <Button
            variant="outlined"
            className="h-18 w-16 mr-2"
            style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
            onClick={()=>joinClass(tutorObject?.roomNo)}
          >
            Join
          </Button>
        </div>
      
        </div>
      ))}
    </div>
  );
}

export default YourLanguage;
