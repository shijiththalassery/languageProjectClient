import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TutorNavbar from './TutorNavbar';
import { BeakerIcon } from '@heroicons/react/solid'
import TutorEdit from './TutorEdit';
import { useNavigate, Link } from 'react-router-dom';
import CertificationUpload from './certificationUpload/CertificationUpload';





export default function TutorProfile() {
    const navigate = useNavigate()
    const tutorEmail = localStorage.getItem('tutorEmail');
    const [tutor, setTutorList] = useState([])

    const tutorDetail = async () => {
        const email = tutorEmail;
        const res = await axios.get(`http://localhost:4002/tutorDetail/${email}`)
        setTutorList(res.data.detail)
    }

        useEffect(() => {
            tutorDetail()
        }, [tutor])


        const handleNavigation = () => {
            navigate('/tutorPremium')
        };
        return (
            <div className='bg-blue-100' >
                <TutorNavbar />
                <div className="mt-4 student-profile-card w-11/12 max-w-screen-lg mx-auto h-1/2 bg-cardBackGround rounded-lg shadow-xl bg-opacity-70 p-4 ">
                    <div className="h-screen  justify-center p-0 m-0  bg-opacity-0">
                        <div className=" w-full h-1/2 rounded-full shadow-2xl bg-opacity-0">
                            <img
                                src={tutor.backgroundPhoto}
                                alt="Card Image"
                                className="object-cover w-full h-full rounded-xl shadow-2xl"
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/4 bg-blue-500 bg-opacity-0  rounded-l-lg flex justify-center items-center ">
                                <img
                                    src={tutor.profilePhoto} // Replace with your image URL
                                    alt="Rounded Image"
                                    className="h-36 w-36 rounded-full object-cover shadow-md"
                                />
                            </div>

                            <div className="student-profile-card w-full bg-blue-100 rounded-lg shadow-md p-2 mt-4 bg-opacity-0">
                                <div className='cardsz bg-opacity-0'>
                                    <div className="flex justify-between mt-4 bg-opacity-0 text-center items-center">

                                        <TutorEdit tutorDetail={tutor}  refresh/>
                                        <div className="w-1/4 flex items-center justify-center bg-opacity-0">
                                            <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>


                                                <h3 key={tutor._id} className="ml-2">{tutor.name}</h3>


                                            </div>
                                        </div>

                                        <div className="w-1/4 flex items-center justify-center">
                                            <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                                </svg>
                                                <h3 className="ml-2">{tutor.email}</h3>

                                            </div>
                                        </div>

                                        <div className="w-1/4 flex items-center justify-center">
                                            <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                                </svg>
                                                <h3 className="ml-2">{tutor.phone}</h3>

                                            </div>
                                        </div>

                                        <div className="w-1/4 flex items-center justify-center ">
                                            <div className="bg-white rounded-lg  p-2 flex flex-row items-center bg-opacity-0 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                </svg>
                                                <h3 className="ml-2">change password</h3>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='cardsz bg-opacity-0'>
                                <div className="flex justify-between mt-4 space-x-4 bg-opacity-0">
                                    <div className="student-profile-card w-1/4 h-12 bg-blue-500 rounded-lg shadow-md p-4 flex items-center">
                                        <CertificationUpload isVerified={tutor.is_verified} />
                                    </div>
                                    <div className="student-profile-card w-1/4 h-12 bg-blue-500 rounded-lg shadow-md p-4 flex items-center">
                                    {tutor.is_premium ? (
                                        <h1 className="ml-2 text-lg font-bold text-amber-900">Premium user</h1>
                                       
                                    ) : (
                                        <Link to="/tutorPremium">
                                            <h3 className="mr-2 font-bold">Premium membership</h3>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4 font-bold"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                        </Link>
                                    )}
                                    </div>
                                    <div className="student-profile-card w-1/4 h-12 bg-blue-500 rounded-lg shadow-md p-4 flex items-center">
                                        <h3 className="mr-2 font-bold">Profile verification</h3>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 font-bold"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </div>
                                    <div className="student-profile-card w-1/4 h-12 bg-blue-500 rounded-lg shadow-md p-4 flex items-center">
                                        <h3 className="mr-2 font-bold">Profile verification</h3>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 font-bold"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
