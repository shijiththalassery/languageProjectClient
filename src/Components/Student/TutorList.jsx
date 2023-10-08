import React, { useState, useEffect } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tutorList } from '../../Services/Apis';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";

function TutorList() {

  const navigate = useNavigate()

  useEffect(()=>{
    const token= localStorage.getItem("studentEmail")
    if(!token){
      navigate("/studentLogin")
    }
  })
  
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await tutorList();
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutor list:", error);
      }
    };
    fetchTutors();
  }, []);

  const viewDetail = async(id)=>{
    console.log(id);
    navigate(`/tutorDetail/${id}`)
  }

  return (
    <div>
      <StudentNavbar />
      <div className="min-h-screen border bg-gray-100">
        <div className="bg-white p-4 rounded-lg shadow-lg w-screen ">
          {/* Search and sorting options */}
          {/* ... */}
        </div>
        <div className="w-screen flex flex-wrap justify-center items-start mt-4 mb-2">
          {tutors.map((tutor) => (
            <Card key={tutor._id} className="w-full max-w-[18rem] h-[24rem] shadow-lg mb-2 border border-black">
            <CardHeader floated={false} color="blue-gray">
              <img
                src={tutor.profilePhoto} // Use the tutor's image URL
                alt="Tutor profile"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center">
              <div className='shadow-lg rounded pl-10 pr-10 pb-2'>
                <div className="mb-3 flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    {tutor.name} {/* Display tutor's name */}
                  </Typography>
                </div>
                <div className="mb-3 flex">
                  <Typography component="legend" className="mr-2">
                    Rating
                  </Typography>
                  <Rating name="read-only" value={tutor.rating} readOnly style={{ display: 'flex', flexDirection: 'row' }} />
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    ₹ {tutor.price} {/* Display tutor's price */}
                  </Typography>
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    {tutor.language} {/* Display tutor's language */}
                  </Typography>
                </div>
              </div>
              <CardFooter className="pt-1 text-blue-700">
                <Button size="lg" fullWidth={true} className="text-blue-700 w-24 h-8 border border-black"
                onClick={()=>{viewDetail(tutor._id)}}>
                  Join Now
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
          
          ))}
        </div>
      </div>
    </div>
  )
}

export default TutorList;
