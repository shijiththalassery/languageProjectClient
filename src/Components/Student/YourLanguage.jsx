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
import studentInstance from "../../api/studentInstace";
import ReactPlayer from 'react-player'




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
      const responce = studentInstance.get(`/myTutorList/${email}`)
      responce.then((result) => {

        setTutor(result.data.course);
        setTutorData(result.data)
      }).catch((error) => {

        console.log(error)
      })

    }
    fectMyCourse(email)
  }, [])

  const joinClass = (id) => {
    navigate(`/myclass/${id}`)
  }

  const [courseDetails, setCourseDetails] = useState({})
  const [view, setView] = useState(false)

  const viewDetail = (id) => {
    setView(!view)
    const responce = studentInstance.get(`/myCourseDetail/${id}`)
      .then(response => {
        const result = response.data;
        setCourseDetails(result)
        console.log(courseDetails, 'this is the resulr of the shijith and sreya');
      })
      .catch(error => {
        console.error(error);
      });
  }

  const today = new Date();
  let cancelDate ;
  let cancellationDate;
  let isBeforeCancellationDate
  if(courseDetails){
    cancelDate =  courseDetails.cancellationDate
    cancellationDate = new Date(cancelDate);
    isBeforeCancellationDate = today <= cancellationDate;
  }
  
  const handleCancellation = (id)=>{
    const responce = studentInstance.get(`/cancelPurchase/${id}`)
    .then(response => {
      const result = response.data;
      alert(result)
      console.log(result, ' this is result of cancel purchase');
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <div className=' h-screen sm:w-full sm:h-full  md:h-screen'>
      <StudNav />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 ">
        <div className="col-span-2  shadow-lg bg-cyan-50 mt-4">
          <h1 className='text-center font-bold font-blue-500 '>My Course</h1>
          {tutor && tutor.length > 0 && tutor.map((tutorObject, index) => (
            <div key={index} className=" border-2 border-blue-600 flex flex-col md:flex-row md:max-w-md p-4 m-4 bg-white rounded-lg shadow-lg ">
              <div className="md:w-2/3 md:pl-4">
                <div className="flex justify between items-center mb-4">
                  <h2 className="text-xl font-bold"></h2> {/* Tutor's name */}
                </div>
                <p className="text-gray-700">Course: <b>{tutorObject?.language}</b></p> {/* Course name */}
                <p className="text-gray-700">Time: <b>{tutorObject?.origianlTime}</b></p> {/* Price */}

                <ReviewModal id={tutorObject.tutorId} />
              </div>
              <div className="flex justify-end items-center ">
                <Button
                  variant="outlined"
                  className="h-18 w-16 mr-2"
                  style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                  onClick={() => joinClass(tutorObject?.roomNo)}
                >
                  Join
                </Button>
                <Button
                  variant="outlined"
                  className="h-18 w-16 mr-2 me-2"
                  style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                  onClick={() => viewDetail(tutorObject?.roomNo)}
                >
                  View
                </Button>
              </div>

            </div>
          ))}

        </div>
        <div className="col-span-2">
          <div className="border border-black  rounded-md mt-4">
            {!view &&
              <h1 className="text-center font-bold">click view button and get the information about your course</h1>
            }
            {view && (
              <div className='border border-blue-500 text-left bg-cyan-50 rounded-md'>
                <h1 className='text-center font-bold'>Course Detail</h1>
                <div className='flex justify-center mt-2'>
                  {courseDetails?.tutorData && (
                    <img
                      className='rounded-full h-32 w-32 text-center'
                      src={courseDetails?.tutorData?.profilePhoto}
                      alt="Tutor Profile"
                    />
                  )}
                </div>
                <div className='mx-auto font-bold text-center mt-2'>
                  {courseDetails?.tutorData && (
                    <>
                      <h1>Tutor Name: {courseDetails?.tutorData?.name}</h1>
                      <h1>Purchase Date: {courseDetails?.purchaseDate}</h1>
                      <h1>Course End Date: {courseDetails?.endDate}</h1>
                      <h1>Class Time: Daily {courseDetails?.origianlTime}</h1>
                      <h1>Price: {courseDetails?.tutorData?.price}</h1>
                      {isBeforeCancellationDate &&
                        <button
                        className="border-2  rounded-md  border-blue-500 shadow-lg mb-4 mt-2 "
                        onClick={()=>handleCancellation(courseDetails._id)} disabled={!isBeforeCancellationDate}>
                        Cancel purchase
                    </button> }
               
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourLanguage;
