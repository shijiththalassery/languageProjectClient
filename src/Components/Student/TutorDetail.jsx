import React, { useState, useEffect } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { SERVER } from '../../Services/helper';
import axios from 'axios';
import Modal from './TimeSlotModal/Modal';
import { tutorDetails } from '../../Services/Apis';
import { coursePurchase } from '../../Services/Apis';
import { buyCourse } from '../../Services/Apis';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Rating,
} from "@material-tailwind/react";

import Button from '@mui/material/Button';

import { timeConversion, amPmToRealTime } from '../../Services/function';


export default function TutorDetail() {

    const navigate = useNavigate
    useEffect(() => {
        const token = localStorage.getItem("studentEmail")
        if (!token) {
            navigate("/studentLogin")
        }
    })

    const [isTimeSlotAvailable, setTimeSlotAvailable] = useState(false);
    const [studentSelectedTime, setStudentSelectedTime] = useState(null);

    let intStudentSelectedTime;
    if (studentSelectedTime) {
        intStudentSelectedTime = amPmToRealTime(studentSelectedTime);
    }

    const handleRadioChange = (time) => {
        setStudentSelectedTime(time);
    };


    const { id } = useParams()
    const [tutorDetails, setTutorDetails] = useState('');
    const [tutorTimeSlote, setTutorTimeSlote] = useState({})

    useEffect(() => {
        const fetchTutors = async (id) => {
            try {
                const response = await axios.get(`${SERVER}tutorDetails/${id}`);
                setTutorDetails(response.data.tutorDetail);
                setTutorTimeSlote(response.data.tutorDetail.timeSlot)
                setTimeSlotAvailable(!!response.data.tutorDetail.timeSlot);
            } catch (error) {
                console.error("Error fetching tutor detail:", error);
            }
        };
        fetchTutors(id);
    }, []);
    console.log(tutorDetails, 'this is tutorDetail')

    const timeAmPm = tutorDetails?.timeSlot
    let convertedTime = []
    if (timeAmPm) {
        // tutor total time
        convertedTime = timeConversion(timeAmPm);
    }

    const aTime = tutorDetails?.availableTime;
    let availableTime = []
    if (aTime) {
        // tutor available time
        availableTime = timeConversion(aTime);
    }

    const bTime = tutorDetails?.bookedTime;
    let bookedTime = []
    if (bTime) {
        //tutor booked time
        bookedTime = timeConversion(bTime);
    }

    const review = tutorDetails?.reviews
    const amount = tutorDetails?.price

    /// back end data setting

    const studentEmail = JSON.parse(localStorage.getItem('studentEmail'))


    let data = {}
    if (studentSelectedTime) {
        const IntTime =   amPmToRealTime(studentSelectedTime)
        data.studentSelectedTime = IntTime;
        data.stringTime = studentSelectedTime;
        if (tutorDetails) {
            data.tutorId = tutorDetails._id;
            data.language = tutorDetails.language;
            data.studentEmail = studentEmail
            data.price = tutorDetails.price
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount === "") {
            alert("Please enter the amount");
        } else {
            var options = {
                key: "rzp_test_dCt9cirikejw9W",
                key_secret: "1vOoqQ7woOpJXIy94N3Lk4R0",
                amount: amount * 100,
                currency: "INR",
                name: "Speak Sphere",
                description: "Course Purchase",
                image: 'https://img.freepik.com/free-vector/gradient-english-school-logo-design_23-2149483595.jpg?w=2000',
                handler: async function (response) {
                    // Payment completed, check the response for status
                    if (response.razorpay_payment_id) {
                        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
                        const res = await buyCourse(data)
                        console.log(res)
                        // You can perform additional actions here, like updating your database, sending confirmation emails, etc.
                    } else {
                        alert("Payment failed");
                    }
                },
                prefill: {
                    name: "shijith",
                    email: "shijith.thalassery@gmail.com",
                    contact: "9544345344"
                },
                notes: {
                    address: "Razorpay Corporate office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    }
    return (
        <div>

            <div className="bg-white p-4 rounded-lg shadow-md  ">
                {/* Tutor Details Section */}
                <div className='rounded-lg shadow-xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>
                    <div className='w-full border border-black md:col-span-3'>
                        <div className="text-center mb-2 border border-black  md:w-2/4 w-3/4 mx-auto  justify-center  shadow-md">
                            <img
                                src={tutorDetails?.profilePhoto}
                                alt="Tutor Profile"
                                className="w-32 h-32 mx-auto rounded-full"
                            />
                            <h2 className="text-2xl font-semibold mt-2">{tutorDetails?.name}</h2>
                            <p className="text-gray-500">Language: {tutorDetails?.language}</p>
                            <p className="text-green-500 font-semibold">Price: {tutorDetails?.price}</p>
                        </div>

                        {/* Student Details Section */}
                        <div className="mt-4 text-center flex justify-between items-center space-x-4 md:h-16 xl:h-20 sm:h-20">

                            <p className='ml-8'>Total Students: 100</p> &nbsp;
                            <p>Active Students: 75</p> &nbsp;
                            <p>Passed Students: 25</p> &nbsp;
                        </div>
                    </div>
                    <div className='border  border-black md:col-span-1 flex justify-center items-center '>
                        <div className='border border-red-500 sm:w-full sm:h-20 sm:overflow-y-auto  md:w-3/4 md:h-48 md:overflow-y-auto'>
                            <h1 className='text-center'><b> TIME SCHEDULE</b></h1>
                            <ul className='text-center '>
                                {convertedTime !== null && convertedTime.map((time, index) => (
                                    <div
                                        key={index} // You should use a unique key for each element when mapping an array
                                        className='bg-blue-300 rounded-md sm:w-full md:w-3/4 mx-auto mb-2 mt-2 md:shadow-md sm:shadow-md'
                                    >
                                        {time}
                                    </div>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 border border-black mt-2">
                    <div className="md:col-span-2 border border-blue-500">
                        <h1 className='text-center'>booked time slot</h1>
                        {bookedTime !== null && bookedTime.map((time, index) => (
                            <div
                                key={index} // You should use a unique key for each element when mapping an array
                                className=' border border-red-500 bg-red-300 rounded-md  w-1/2 sm:w-1/2 md:w-1/4 mx-auto mb-2 mt-2 md:shadow-md sm:shadow-md text-center '
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-2 border border-red-500 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4">

                        <div className='mx-auto w-2/4 h-3/4 border border-yellow-500 md:col-span-3 '>
                            <h1 className='text-center'>available time</h1>
                            <ul className='text-center '>
                                {availableTime !== null && availableTime.map((time, index) => (
                                    <div
                                        key={index}
                                        className={`sm:overflow-y-auto md:overflow-y-auto border border-green-500 bg-green-300 rounded-md w-3/4 sm:w-3/4 sm:overflow-hidden  md:w-3/4 mx-auto mb-2 mt-2 md:shadow-md sm:shadow-md text-center  ${studentSelectedTime === time ? 'bg-yellow-500' : ''
                                            }`}
                                    >
                                        <label >
                                            <input
                                                className='mr-1'
                                                type="radio"
                                                name="selectedTime"
                                                onChange={() => handleRadioChange(time)}
                                                checked={studentSelectedTime === time}
                                            />
                                            {time}
                                        </label>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className='border border-green-500 md:col-span-1 flex items-end justify-end'>
                            <Button
                                variant="outlined"
                                className="flex justify-end items-end rounded-lg"
                                style={{ borderColor: 'green', color: 'green' }}
                                onClick={handleSubmit}>Buy Now</Button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-4 mb-2 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold">Reviews</h3>
                    <ul>
                        <li className="mt-2">
                            <div className="flex items-center">
                                <img
                                    src="https://www.cricbuzz.com/a/img/v1/152x152/i1/c332891/virat-kohli.jpg"
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />

                                {review && review.map((items) => (
                                    <div className="ml-2">
                                        <h4 className="font-semibold">{items?.name}</h4>
                                        <p>{items?.review} </p>
                                    </div>
                                ))}

                            </div>
                        </li>
                        {/* Add more reviews as needed */}
                    </ul>
                </div>
                <div class="grid grid-cols-2   md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    <div class="bg-blue-200 p-4">Div 1</div>
                    <div class="bg-green-200 p-4">Div 2</div>
                    <div class="bg-red-200 p-4">Div 3</div>
                    <div class="bg-yellow-200 p-4">Div 4</div>
                </div>


            </div>
        </div>
    )
}


