import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { studentList } from '../../Services/Apis';
import { timeConversion } from '../../Services/function';
import TutNav from './TutNav';
import Button from '@mui/material/Button';
import "../../App.css";
import axiosInstance from "../../api/axiosInstance";



function StudentList() {
  const navigate = useNavigate()
  const tutorEmail = JSON.parse(localStorage.getItem('tutorEmail'))

  const [res, setRes] = useState({})
  const [studentLists, setStudentLists] = useState({});

  const email = tutorEmail;

  console.log(res, 'htis is res means responce')

  ////////LOBY CHANGE ////////////////


  /////////////////////////////////////

  useEffect(() => {

    const fetchStudentList = async (tutorEmail) => {
      try {
        // const responce = await studentList(tutorEmail)
        const responce = await axiosInstance.get(`/studentList/${tutorEmail}`)
        console.log(responce)
        setRes(responce.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStudentList(tutorEmail)
  }, []);

  const joinRoom = (id) => {
    navigate(`/roomCreate/${id}`)
  }

  const tutorPremium = ()=>{
    navigate('/tutorPremium')
  }

  return (
    <div className="w-full h-screen sm:h-screen md:h-screen sm:w-full md:w-full">
      <TutNav />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-10 border border-green-500">
        <div className="col-span-1 md:col-span-6 shadow-lg rounded-lg  h-full border border-black ">

          <div className="mx-auto mt-8 rounded-xl shadow-lg w-full h-80 ">
            <div className="overflow-y-auto h-full mx-auto">
            <h1 className="font-bold text-blue-500 text-center">My Students</h1>

              {res && res.students && res.students.length > 0 && (
                res.students.map((student, index) => (
                  <div key={index} className="
relative flex flex-col md:flex-row md:max-w-md p-4 m-4 bg-white rounded-lg border-2 border-blue-500 shadow-lg mx-auto">
                    {/* Conditional rendering for the small circle */}
                    {student.isActive === true ? (
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-green-500"></div>
                    ) : (
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-red-500"></div>
                    )}


                    <div className="md:w-2/3 md:pl-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{student?.Name}</h2> {/* Student's name */}
                      </div>
                      <p className="text-gray-700">Time: <b>{student?.origianlTime}</b></p>
                      <p className="text-gray-700">Start Date: <b>{student.purchaseDate}</b></p>
                      <p className="text-gray-700 mb-2">End Date: <b>{student.endDate}</b></p>
                      <Button
                        variant="outlined"
                        className="h-8 mr-2 mt-2"
                        style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                        onClick={() => { joinRoom(student?.roomNo) }}
                      >
                        Start Class
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>


        </div>
        <div className="col-span-1 md:col-span-4 shadow-2xl rounded-lg  h-full">
          <div className="mt-4 mb-4 rounded-lg  p-4">
            <div className="h-full">
              <div className="premium-ad font-serif">
                <h3 className="font-bold text-center mt-2 text-blue-600">Upgrade to Premium Membership!</h3>

                <div className="w-full h-full  grid grid-cols-2">
                  <div className="col-span-1 md:col-span-1 ">
                    <img
                      src={"https://res.cloudinary.com/dk1eug9ms/image/upload/v1699897251/webImages/tutorPremiumAdd_edsqmu.png"} // Replace this URL with the direct link to your image
                      alt="Your Alt Text"
                      style={{ width: '200px', height: 'auto' }}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1 mx-auto my-auto ">
                    <div className="">
                      <ul class="font-bold text-blue-600 font-serif space-y-2">
                        <li className="glow">Enhanced Visibility</li>
                        <li className="glow">Priority Placement</li>
                        <li className="glow">Increased Student Engagement</li>
                      </ul>
                    </div>
                  </div>

                </div>
                <p className="mt-2 mb-2 font-serif text-center text-blue-600">Unlock exclusive features and benefits for just Rs. 990.</p>
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    className="h-8  mt-2 mb-2 font-serif"
                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                    onClick={tutorPremium}
                  >Upgrade Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default StudentList
