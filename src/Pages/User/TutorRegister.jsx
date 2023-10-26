
import React, { useState, useEffect } from 'react';
import { TutorRegistration } from '../../Services/Apis';
import { languageList } from "../../Services/Apis"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TutorTimeSlot from './TutorTimeSlot';
import TimeSlotModal from './TimeSlotModal';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Header from './Header';

import { Input } from "@nextui-org/react";
import Button from '@mui/material/Button';
import TutorEdit from '../../Components/Tutor/TutorEdit';
import TutNav from '../../Components/Tutor/TutNav';

function TutorRegister() {
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("tutorEmail")
        if (token) {
            navigate("/tutorHome")
        }
    })
    const [step, setStep] = useState(1);
    const [hour, setHour] = useState('');
    const [price, setPrice] = useState('')
    const [mobile, setMobile] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [languages, setLanguageList] = useState([]);
    const [language, setLanguge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('No file selected');
    const [file, setFile] = useState(null);
    useEffect(() => {
        const fetchLanguageList = async () => {
            try {
                const response = await languageList();

                setLanguageList(response.data.language);
            } catch (error) {
                console.error("Error fetching language list:", error);
            }
        };

        fetchLanguageList();
    }, []);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setFile(reader.result);
                setSelectedFileName(selectedFile.name);
            }
            setFile(selectedFile)
        } else {
            setSelectedFileName('No file selected');
        }
    }

    const handleSubmit = async (e) => {
        let data
        console.log('entering handile submitt')
        e.preventDefault();
        const timeSlot = JSON.parse(localStorage.getItem('timeSlot'));
        if (!timeSlot) {
            toast.error("select your time slote")
        } else {
            data = {
                name: username,
                email: email,
                mobile: mobile,
                language: language,
                profilePhoto: file,
                password: password,
                confirmPassword: confirmPassword,
                hour: hour,
                price: price,
                timeSlot: timeSlot
            }
        }
        const mobilePattern = /^(\+91)[0-9]{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/;
        if (data.name === "") {

            toast.error("enter your name")
        }
        else if (!data.email.includes('@gmail.com')) {
            toast.error("enter enter a valid email id")

        }
        else if (!mobilePattern.test(data.mobile)) {
            toast.error("please enter a valid mobile number");

        }
        else if (data.language === "") {
            toast.error("Select a language ")

        }
        if (!passwordRegex.test(data.password)) {
            toast.error("Password must contain at least one capital letter, one small letter, one number or special character, and be at least 6 characters long.");
        }
        else if (data.password != data.confirmPassword) {
            console.log(data.password, data.confirmPassword, 'this is password and confirm password')
            toast.error("Passwords do not match. Please type them correctly.");
        }
        else if (!data.hour) {
            alert('please enter hour')
            toast.error("Please enter hour");
        }
        else if (!data.price) {
            alert('please enter price')
            toast.error("Please enter pirce");
        }
        else {
            console.log(data, 'this is the userDAta')
            localStorage.setItem("TutorData", JSON.stringify(data));
            const jsonData = {
                phone: data.mobile,
                name: data.name,
                email: data.email
            }
            const userData = JSON.stringify(data);
            try {
                console.log('everything is okey')
                const responce = await TutorRegistration(userData);
                console.log(responce.data.message)
                if (responce.data.message == 'user is alredy exist') {

                } else if (responce.data.message == 'success') {
                    navigate('/tutorOtpVerification');
                }
            } catch (error) {

            }
        }
    }
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleShowPopup = () => {
        setPopupVisible(true);
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };
    return (
        <div className='h-screen grid grid-cols-1 md:grid-cols-2'>
            <div className=" flex justify-center items-center" >
                <img
                    src='https://www.freeiconspng.com/uploads/register-button-png-20.png'
                    className='sm:w-full sm:h-auto'
                    alt='register image'
                />
            </div>
            <div className=' flex justify-center items-center shadow-md'>
                <div className='  w-3/4 h-3/4 flex justify-center items-center ' >

                    {step === 1 && (

                        <div className="slide-in mx-auto w-3/4  border  p-4  rounded-lg shadow-lg">
                            <h1
                                className='text-to-r from-white via-blue-500 to-white text-center'
                            > <b>TUTOR REGISTER -1</b></h1>
                            <input
                                className="block  mx-auto p-2 w-full   rounded-md mb-2 bg-transparent border border-blue-800"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="User Name"
                                style={{ '::placeholder': { color: 'black' } }}
                            />
                            <input
                                className="block mx-auto p-2 w-full rounded-md mb-2 bg-transparent   border border-blue-800"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                style={{ '::placeholder': { color: 'black' } }}
                            />
                            <input
                                className="block mx-auto w-full p-2 rounded-md mb-2 bg-transparent  border border-blue-800 "
                                type="number"
                                name="phone"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Phone"
                                style={{ '::placeholder': { color: 'red' } }}

                            />
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="block mx-auto w-full p-2 rounded-md mb-2 border border-blue-800"
                            />
                            <div className='flex justify-center' >
                                <Button
                                    variant=""
                                    className="block mx-auto"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={nextStep}>Next</Button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="slide-in mx-auto w-3/4  border  rounded-lg shadow-lg ">
                            <h1
                                className='text-to-r from-white via-blue-500 to-white text-center'
                            > <b>TUTOR REGISTER -2</b></h1>
                            <div className="flex justify-between space-x-4 p-4">
                                <select className='w-1/2 h-10 mb-2'>
                                    <option>one</option>
                                    <option>two</option>
                                    <option>three</option>
                                </select>

                                <select className='w-1/2  h-10 mb-2'>
                                    <option>lenev</option>
                                    <option>twelve</option>
                                    <option>thirteen</option>
                                </select>
                            </div>
                            <div className='ml-4 me-4 mb-2'>
                                <select className='w-full h-10 '>
                                    <option>lenev</option>
                                    <option>twelve</option>
                                    <option>thirteen</option>
                                </select>
                            </div>

                            <div className="mr-4 ml-4 pt-2">
                                <input
                                    className="block mx-auto w-full p-2 rounded-md mb-2 bg-transparent  border border-blue-800 "
                                    type="number"
                                    name="phone"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Phone"
                                    style={{ '::placeholder': { color: 'red' } }}

                                />
                            </div>
                            <div className="flex justify-between p-4">
                                <Button
                                    variant=""
                                    className="block mx-auto"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={prevStep}>Prev</Button>
                                <Button
                                    variant=""
                                    className="block mx-auto"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={nextStep}>Next</Button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="slide-in mx-auto w-3/4  border  p-4 rounded-lg shadow-lg" >
                            <h1
                                className='text-to-r from-white via-blue-500 to-white text-center'
                            > <b>TUTOR REGISTER -3</b></h1>
                            <input
                                className="w-full p-2 mb-4 border rounded-md"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <input
                                className="w-full p-2 border rounded-md"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <div className="flex justify-start space-x-8  p-4">
                                <Button
                                    variant=""
                                    className="block mx-auto"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={prevStep}>Prev</Button>
                                <Button
                                    variant="outlined"
                                    className="block mx-auto"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={nextStep}>SUBMIT</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TutorRegister
