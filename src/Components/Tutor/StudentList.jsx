import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { studentList } from '../../Services/Apis';
import { timeConversion } from '../../Services/function';
import TutNav from './TutNav';
import Button from '@mui/material/Button';



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
        const responce = await studentList(tutorEmail)
        console.log(responce)
        setRes(responce.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStudentList(tutorEmail)
  }, []);

  const joinRoom = (id)=>{
    navigate(`/roomCreate/${id}`)
  }

  return (
    <div className="w-screen h-screen sm:h-screen md:h-screen sm:w-screen md:w-screen">
      <TutNav />

      {res && res.students && res.students.length > 0 && (
        res.students.map((student, index) => (
          <div key={index} className="
          relative flex flex-col md:flex-row md:max-w-md p-4 m-4 bg-white rounded-lg border-2 border-blue-500 shadow-lg">
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
              onClick={()=>{joinRoom(student?.roomNo)}}
          >
              Start Class
          </Button>
            </div>
          </div>
        ))
      )}
    </div>

  )
}

export default StudentList
