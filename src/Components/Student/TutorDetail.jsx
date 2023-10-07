import React, { useState, useEffect } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useParams } from 'react-router-dom';
import { SERVER } from '../../Services/helper';
import axios from 'axios';
import Modal from './TimeSlotModal/Modal';
import { tutorDetail } from '../../Services/Apis';

export default function TutorDetail() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimeSlotAvailable, setTimeSlotAvailable] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = () => {

    }

    const { id } = useParams()
    const [tutorDetails, setTutorDetails] = useState('');

    let time = tutorDetails.timeSlot ? tutorDetails.timeSlot : {name:'shijith'}

    const imageLink = 'https://img.freepik.com/free-vector/gradient-english-school-logo-design_23-2149483595.jpg?w=2000'
    const price = 990;
    const [name, setName] = useState('USER_TUTOR')
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }







    useEffect(() => {
        const fetchTutors = async (id) => {
            console.log(id, 'id of the tutor');
            try {
                const response = await axios.get(`http://localhost:4002/tutorDetail/651ac206cccbe19a427d5147`);
                console.log(response, 'this is the response')
                setTutorDetails(response.data.tutorDetail);
                setTimeSlotAvailable(!!response.data.tutorDetail.timeSlot);
            } catch (error) {
                console.error("Error fetching tutor detail:", error);
            }
        };
        fetchTutors(id);
    }, []);
    console.log(tutorDetails, 'this is tutorDetail')


    return (
        <>
            <StudentNavbar />
            <div className="h-full min-h-screen bg-blue-500">
                <div className="bg-green-500 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-auto p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <div className='bg-blue-600 flex flex-col md:flex-row w-full h-2/3 items-center'>
                        <div className='mb-4 md:mb-0'>
                            <div className="w-48 h-48 border border-gray-300 rounded-md">
                                <img src={tutorDetails?.profilePhoto} alt="Your Image" className="w-full h-full object-cover shadow-md" />
                            </div>
                        </div>
                        <div className='md:ml-4'>
                            <h3 className="text-lg">Name:<b>{tutorDetails?.name}</b></h3>
                            <h3 className="text-lg">Langugage:<b>{tutorDetails?.language}</b></h3>
                            <h3 className="text-lg">Price:<b>{tutorDetails?.price}</b></h3>
                        </div>
                    </div>
                    <div className='bg-white mt-2 flex flex-col md:flex-row justify-center w-full'>


                  
                        <Modal timeSlot={time} />
                     


                        <button
                            type="button"
                            className="mt-2 md:mt-0 mb-2 md:mb-0 mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick
                        >
                            Buy now
                        </button>
                        <button
                            type="button"
                            className="mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick
                        >
                            Book now
                        </button>
                    </div>
                    <div className='bg-yellow-400 w-full mt-2 flex flex-col justify-center'>
                        <h1>Review</h1>
                        <div className="h-1 w-full bg-blue-900"></div>
                        <div className=' justify-center text-center'>
                            <h3 className=''><b>name</b></h3>
                            <p>this  is the honest reeview from my side this
                                clas is very effective and very usefull i suggested
                                one of my friend also now his feed back is good</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


