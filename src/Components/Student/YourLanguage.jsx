import React, { useState, useEffect } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate } from 'react-router-dom'; // You should use this for navigation
import { studentTutorList } from '../../Services/Apis';
import ReviewModal from './ReviewModal/Modal';
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

  const e = localStorage.getItem('studentEmail')
  let email;
  if (e) {
    email = JSON.parse(e);
  } else {
    alert('user email is not found ')
  }
  const baseUrl = process.env.BACKEND_URL

  const id = 1234
  const tutorList = async (email) => {
    const responce = await studentTutorList(email);
    setTutor(responce.data.message)
  }

  useEffect(() => {
    const token = localStorage.getItem("studentEmail")
    if (!token) {
      navigate("/studentLogin")
    }
  })

  useEffect(() => {
    tutorList(email)
  }, [])

  return (
    <div>
      <StudentNavbar />
      <div className="flex flex-col md:flex-row md:max-w-md p-4 m-4 bg-white rounded-lg shadow-lg">
        <div className="md:w-1/3">
          <img
            src={tutor?.profilePhoto} // Replace with the user's image URL
            alt="User's Image"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-2/3 md:pl-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{tutor?.name}</h2> {/* User's name */}
          </div>
          <p className="text-gray-700">Course: <b>{tutor?.language}</b></p> {/* Course name */}
          <p className="text-gray-700">price: <b>{tutor?.price}</b></p> {/* Course name */}
          <ReviewModal
            id={tutor?._id} />
        </div>
      </div>
    </div>
  );
}

export default YourLanguage;
