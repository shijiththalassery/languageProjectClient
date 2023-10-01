import React from 'react';
import TutorNavbar from './TutorNavbar';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

function Premium() {
    const price = 990;

    const premiumPurchase = async () => {
        let options = {
            key:"",
            key_secret:"",
            amount:990,
            currency:'INR',
            description:'for testing purpose',
            handler:function(responce){
                alert(responce.razorpay_payment_id)
            },
            prefill:{
                name:'shijith',
                email:'shijith.thalassery@gmail.com',
                contact:'9544345344',
            },
            notes:{
                address:'razorpay co-op office'
            },
            theme:{
                color:'#3399cc'
            }
        }
        let pay = new window.Razorpay(options)
        pay.open()
        
    }
    return (
        <>
            <TutorNavbar />
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
                                onClick={premiumPurchase}
                                className='text-black'>Read More</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </>
    );
}

export default Premium;
