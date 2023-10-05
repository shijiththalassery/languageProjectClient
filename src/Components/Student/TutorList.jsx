import React, { useState } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

function TutorList() {
 


  let number = []
  const [value, setValue] = useState(4);
  console.log(value)
  return (
    <div>
      <StudentNavbar />
      
      <div className="min-h-screen  border  bg-gray-100">
        <div className="bg-white p-4 rounded-lg shadow-lg w-screen ">
          <div className="mb-4">
            <div className="flex space-x-2  p-2 rounded-lg">
              <input
                type="text"
                className="border rounded-lg px-2 py-1 w-1/2"
                placeholder="Search"
              />
              <select className="border rounded-lg px-2 py-1">
                <option>High-Low</option>
                <option>Low-High</option>
              </select>
              <select className="border rounded-lg px-2 py-1">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-screen flex flex-col    items-center mt-4 mb-2">
          <Card className="w-full max-w-[18rem] h-[24 rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray" >
              <img
                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="ui/ux review check"
              />
              <div className=" to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody className="flex items-center justify-center">
              <div className='shadow-lg rounded pl-10 pr-10 pb-2'>
                <div className="mb-3 flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    first name 
                  </Typography>
                </div>
                <div className="mb-3 flex items-center">
                  <Typography component="legend" className="mr-2">
                    Rating
                  </Typography>
                  <Rating name="read-only" value={value} readOnly />
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    ₹ 7000
                  </Typography>
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    MALAYALAM
                  </Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-1 text-blue-700">
              <Button size="lg" fullWidth={true} className="text-blue-700 border border-blue h-12">
                join now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TutorList
