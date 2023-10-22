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

  useEffect(() => {
    const token = localStorage.getItem("studentEmail")
    if (!token) {
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

  const viewDetail = async (id) => {
    console.log(id);
    navigate(`/tutorDetail/${id}`)
  }

  return (
    <div>
      <StudentNavbar />
      <div className="min-h-screen border bg-gray-100">
        <div className="bg-white  rounded-lg shadow-lg w-screen  flex justify-end">
          <div className="mt-5 mb-1 mr-12">
            <input
              type="text"
              className="w-full  border rounded-md"
              placeholder="Search Tutor name..."
              onChange
            />
          </div>

          <div className="mr-20">
            <label className="block text-sm font-medium">Filter by Category:</label>
            <select
              className="w-full  border rounded-md mr-2 mb-1"
              onChange
            >
              <option value="">All</option>
              <option value="category1">Category 1</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className='mr-8'>
            <label className="block text-sm font-medium">Sort by:</label>
            <select
              className="w-full  border rounded-md mr-2"
              onChange
            >
              <option value="name">Price</option>
              <option value="age">Low-High</option>
              <option value="place">High-Low</option>
            </select>
          </div>
        </div>
        <div className="w-screen flex flex-wrap justify-center items-start mt-4 mb-2">
          {tutors.map((tutor) => (
            // <Card key={tutor._id} className="w-full max-w-[18rem] h-[24rem] shadow-lg mb-2 border border-black">
            //   <CardHeader floated={false} color="blue-gray">
            //     <img
            //       src={tutor.profilePhoto} // Use the tutor's image URL
            //       alt="Tutor profile"
            //     />
            //     <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            //   </CardHeader>
            //   <CardBody className="flex flex-col items-center justify-center">
            //     <div className='shadow-lg rounded pl-10 pr-10 pb-2'>
            //       <div className="mb-3 flex items-center justify-center">
            //         <Typography variant="h5" color="blue-gray" className="font-medium">
            //           {tutor.name} {/* Display tutor's name */}
            //         </Typography>
            //       </div>
            //       <div className="mb-3 flex">
            //         <Typography component="legend" className="mr-2">
            //           Rating
            //         </Typography>
            //         <Rating name="read-only" value={tutor.rating} readOnly style={{ display: 'flex', flexDirection: 'row' }} />
            //       </div>
            //       <div className="mt-3 flex items-center justify-center">
            //         <Typography variant="h5" color="blue-gray" className="font-medium">
            //           ₹ {tutor.price} {/* Display tutor's price */}
            //         </Typography>
            //       </div>
            //       <div className="mt-3 flex items-center justify-center">
            //         <Typography variant="h5" color="blue-gray" className="font-medium">
            //           {tutor.language} {/* Display tutor's language */}
            //         </Typography>
            //       </div>
            //     </div>
            //     <CardFooter className="pt-1 text-blue-700">
            //       <Button size="lg" fullWidth={true} className="text-blue-700 w-24 h-8 border border-black"
            //         onClick={() => { viewDetail(tutor._id) }}>
            //         Join Now
            //       </Button>
            //     </CardFooter>
            //   </CardBody>
            // </Card>
            <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-32 object-cover object-center"
                  src={tutor?.profilePhoto}
                  alt="Person's Name"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{tutor?.name} </div>
                  <p className="text-gray-700 text-base">{tutor?.language}</p>
                  <p className="text-gray-700 text-base">{tutor?.price}</p>
                </div>
                <div className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => { viewDetail(tutor._id) }}
                  >
                    Click Me
                  </button>
                </div>
                <div className="px-6 py-4">
                  <Rating name="read-only" value={tutor.rating} readOnly style={{ display: 'flex', flexDirection: 'row' }} />
                </div>
              </div>
            </div>


          ))}
        </div>
        <div className="w-full flex justify-center mt-4">
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap">
              <li>
                <a href="#previous" className="block px-3 py-2 rounded text-blue-500 bg-white hover:bg-blue-500 hover:text-white">Previous</a>
              </li>
              <li>
                <a href="#page1" className="block px-3 py-2 rounded text-blue-500 bg-white hover:bg-blue-500 hover:text-white">1</a>
              </li>
              <li>
                <a href="#page2" className="block px-3 py-2 rounded text-blue-500 bg-white hover:bg-blue-500 hover:text-white">2</a>
              </li>
              <li>
                <a href="#next" className="block px-3 py-2 rounded text-blue-500 bg-white hover:bg-blue-500 hover:text-white">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TutorList;
