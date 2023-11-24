import React, { useState, useEffect } from 'react';
import TutNav from './TutNav';
import { tutorPremuimSetUp } from '../../Services/Apis'
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/axiosInstance";


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


function Premium() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("tutorEmail")
        if (!token) {
            navigate("/tutorLogin")
        }
    })
    const imageLink = 'https://img.freepik.com/free-vector/gradient-english-school-logo-design_23-2149483595.jpg?w=2000'
    const amount = 990;
    
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
                    if (response.razorpay_payment_id) {
                        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
                       const res = await axiosInstance.post(`/tutorPremiumPurchase`);
                        console.log(res.data)
                        alert(res.data)
                        
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
        <>
            <TutNav />
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className='items-center justify-center'>
                    <Card className="mt-6 w-96 items-center">
                        <h1 className="text-2xl font-semibold ">Premium Membership</h1>
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src="https://img.freepik.com/free-vector/realistic-vip-card-template-with-golden-details_23-2149125294.jpg?w=826&t=st=1696077269~exp=1696077869~hmac=0f76599b266eb481303c7d7f733b2880cef25f48e6d1e929f45a45c8bdd04f1b"
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody className=' items-center justify-center'>
                            <Typography variant="h5" color="blue-gray" className="mb-2 itmes-center">
                                Unlock Your Full Potential
                            </Typography>
                            <Typography className='  items-start'>
                                <ul class="list-disc justify-center items-end">
                                    <li>Enhanced Visibility</li>
                                    <li>Priority Placement</li>
                                    <li>Increased Student Engagement</li>
                                </ul>
                            </Typography>

                            <Button variant="gradient" className=' mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded'><b>₹990</b></Button>

                        </CardBody>
                        <CardFooter className="pt-0 justify-center items-center">
                            <Button
                                onClick={handleSubmit}
                                className='text-black'>Buy Now</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </>
    );
}

export default Premium;
