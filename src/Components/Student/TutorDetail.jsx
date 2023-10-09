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
    Button,
    Rating,
} from "@material-tailwind/react";

export default function TutorDetail() {

    const navigate = useNavigate
    useEffect(() => {
        const token = localStorage.getItem("studentEmail")
        if (!token) {
            navigate("/studentLogin")
        }
    })

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
    const [tutorTimeSlote, setTutorTimeSlote] = useState({})

    useEffect(() => {
        const fetchTutors = async (id) => {
            console.log(id, 'id of the tutor');
            try {
                console.log('inside try block')
                const response = await axios.get(`${SERVER}tutorDetails/${id}`);
                console.log(response, 'this is the response')
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
    console.log(tutorTimeSlote, 'THIS IS TIME SLOTE')

    const time = tutorTimeSlote ? tutorTimeSlote : { name: 'shijith' }

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

    const premiumPurchase = async (id) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const data = await fetch(`${SERVER}coursePurchase/${id}`, { method: 'GET', }).then((t) =>
            t.json()
        )

        console.log(data, 'this is data from  back end')
        console.log(id, 'thsi is the id of the tutor is fine shijith')
        const amount = data.amount / 100;
        const options = {
            key: process.env.KEY_ID,
            currency: data.currency,
            amount: amount.toString(),
            order_id: data.id,
            name: 'Tutor Premium',
            description: 'Thank you for nothing. Please give us some money',
            image: imageLink,
            handler: async function (response) {
                console.log(response)
            },
            prefill: {
                name,
                email: 'shijith.thalassery@gmail.com',
                phone_number: '9544345344'
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        if (data.id) {
            const userSelectedTime = localStorage.getItem('userSelectedTime');
            const userTime = JSON.parse(userSelectedTime)
            const tutorId = id;
            const userData = localStorage.getItem('studentEmail')
            const userId = JSON.parse(userData)
            const data = {
                userSelectedTime: userTime,
                tutorId: tutorId,
                userId: userId,
            }
            try {
                const response = await buyCourse(data);
                console.log(response, 'this is the responce')
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <>
            <StudentNavbar />
            <div className="min-h-screen flex justify-center items-center bg-blue-500">
                <div className="bg-white md:w-2/3 lg:w-3/4 xl:w-2/3 mx-auto my-auto p-2 rounded-lg  shadow-md flex flex-col items-center justify-center">
                    <div className='bg-blue-200 flex flex-col md:flex-row w-full h-2/3 items-center rounded-md'>
                        <div className='mb-4 md:mb-0 rounded-md'>
                            <div className="w-48 h-48 border border-gray-300 rounded-md">
                                <img src={tutorDetails?.profilePhoto} alt="Your Image" className="w-full h-full object-cover shadow-md rounded-md" />
                            </div>
                        </div>
                        <div className='md:ml-4 rounded-md'>
                            <h3 className="text-lg">Name:<b>{tutorDetails?.name}</b></h3>
                            <h3 className="text-lg">Langugage:<b>{tutorDetails?.language}</b></h3>
                            <h3 className="text-lg">Price:<b>{tutorDetails?.price}</b></h3>
                        </div>
                    </div>
                    <div className='bg-white mt-2 flex flex-col md:flex-row justify-end w-full'>

                        <Modal timeSlot={time} />

                        <button
                            type="button"
                            className="mt-2 md:mt-0 mb-2 md:mb-0 mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={() => premiumPurchase(tutorDetails._id ? tutorDetails._id : null)}
                        >
                            Buy now
                        </button>

                    </div>
                    <div className='bg-blue-200 w-full mt-2 flex p-2 flex-col justify-center rounded-md'>
                        <h1>Review</h1>
                        <div className="h-1 w-full bg-blue-500 mb-2"></div>
                        <div className=' justify-start'>
                            <div className='flex '>
                                <h3 className=' mr-4'><b>Student One</b>&nbsp;  </h3>
                                <Rating name="read-only" value={tutorDetails?.rating} readOnly style={{ display: 'flex', flexDirection: 'row',  }} />
                            </div>
                            <p>this  is the honest reeview from my side this
                                clas is very effective and very usefull i suggested
                                one of my friend also now his feed back is good</p>
                        </div>
                        <div className=' justify-start'>
                        <div className='flex '>
                            <h3 className='mr-4'><b>Student Two</b>&nbsp;  </h3>
                            <Rating name="read-only" value={tutorDetails?.rating} readOnly style={{ display: 'flex', flexDirection: 'row' }} />
                        </div>
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


