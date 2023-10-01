import React,{useState, } from 'react';
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

    const premiumPurchase = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:4002/tutorPremiumPurchase', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)
        const amount = data.amount/100;
		const options = {
			key:process.env.KEY_ID,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Tutor Premium',
			description: 'Thank you for nothing. Please give us some money',
			image: imageLink,
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
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
                                onClick={()=>premiumPurchase()}
                                className='text-black'>Read More</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </>
    );
}

export default Premium;
