
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
import PublicHeader from './PublicHeader';



function TutorRegister() {

    const startTimeOptions = [
        '6 am', '7 am',
        '8 am', '9 am',
        '10 am', '11 am',
        '12 pm', '1 pm',
        '2 pm', '3 pm',
        '4 pm', '5 pm',
        '6 pm', '7 pm',
        '8 pm', '9 pm',
        '10 pm', '11 pm'
    ]

    const endTimeOptions = [
        '7 am',
        '8 am', '9 am',
        '10 am', '11 am',
        '12 pm', '1 pm',
        '2 pm', '3 pm',
        '4 pm', '5 pm',
        '6 pm', '7 pm',
        '8 pm', '9 pm',
        '10 pm', '11 pm',
        '12 am'
    ]


    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("tutorEmail")
        if (token) {
            navigate("/tutorHome")
        }
    })
    const [step, setStep] = useState(1);
    const [price, setPrice] = useState('')
    const [mobile, setMobile] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [languages, setLanguageList] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('No file selected');
    const [file, setFile] = useState(null);
    const [startingTime, setStartTime] = useState('12 am');
    const [endingTime, setEndTime] = useState('12 am');


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
        data = {
            name: username,
            email: email,
            mobile: mobile,
            language: selectedLanguage,
            profilePhoto: file,
            password: password,
            confirmPassword: confirmPassword,
            price: price,
            startingTime: startingTime,
            endingTime: endingTime
        }
        // }

        console.log(data)
        const mobilePattern = /^[6-9][0-9]{9}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/;
        const pricess = data.price;
        console.log(pricess ,'this is the price')

        if(price < 0){
            alert('price is zero')
        }
        if (data.name === "") {
            toast.error("enter your name");
            alert('corrct this name')
        }
        else if (!data.email.includes('@gmail.com')) {
            toast.error("enter enter a valid email id");
            alert('please enter correct email')
        }
        else if (!mobilePattern.test(data.mobile)) {
            toast.error("please enter a valid mobile number");
            alert('please enter correct mobile number')
        }
        else if (data.language === "") {
            toast.error("Select a language ")
            alert('please select language')
        }
        if (!passwordRegex.test(data.password)) {
            toast.error("Password must contain at least one capital letter, one small letter, one number or special character, and be at least 6 characters long.");
            alert('please enter suitable password')
        }
        else if (data.password != data.confirmPassword) {
            console.log(data.password, data.confirmPassword, 'this is password and confirm password')
            toast.error("Passwords do not match. Please type them correctly.");
            alert('please enter same  password')
        }
        else if(price < 0){
            alert('price is less than zero')
        }
        else if (!pricess ) {
            console.log(data.price)
            toast.error("Please enter pirce");
            alert('please enter correct price should be a positive value')
        }
        else {
            localStorage.setItem("TutorData", JSON.stringify(data));
            const jsonData = {
                phone: data.mobile,
                name: data.name,
                email: data.email
            }
            const userData = JSON.stringify(data);
            try {
                const responce = await TutorRegistration(userData);
                if (responce.data.message == 'user is alredy exist') {
                } else if (responce.data.message == 'success') {
                    navigate('/tutorOtpVerification');
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const filteredEndTimeOptions = startTimeOptions.indexOf(startingTime) !== -1
        ? endTimeOptions.slice(startTimeOptions.indexOf(startingTime))
        : endTimeOptions;

    return (
        <>
            <PublicHeader />
            <div className='h-screen grid grid-cols-1 md:grid-cols-2 rounded-md shadow-lg'>
                <div className=" my-auto justify-center items-center" >
                    <img
                        src='https://www.freeiconspng.com/uploads/register-button-png-20.png'
                        className='sm:w-full sm:h-auto'
                        alt='register image'
                    />
                    <p className='text-center'>Already Registered? <b><Link to="/tutorLogin">Login here</Link></b></p>
                </div>
                <div className=' flex justify-center items-center shadow-md'>
                    <div className='  w-3/4 h-3/4 flex justify-center items-center ' >

                        {step === 1 && (

                            <div className="slide-in mx-auto w-5/6   border  p-4  rounded-lg shadow-lg">
                                <h1
                                    className='text-to-r from-white via-blue-500 to-white text-center'
                                > <b>TUTOR REGISTER -1</b></h1>
                                <input
                                    className="block  mx-auto p-2 w-full   rounded-md mb-2 bg-transparent border border-blue-200"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="User Name"
                                    style={{ '::placeholder': { color: 'black' } }}
                                />
                                <input
                                    className="block mx-auto p-2 w-full rounded-md mb-2 bg-transparent   border border-blue-200"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    style={{ '::placeholder': { color: 'black' } }}
                                />
                                <input
                                    className="block mx-auto w-full p-2 rounded-md mb-2 bg-transparent  border border-blue-200 "
                                    type="number"
                                    name="phone"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Phone"
                                    style={{ '::placeholder': { color: 'red' } }}

                                />
                                <label>Profile Photo</label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="block mx-auto w-full p-2 rounded-md mb-2 border border-blue-200"
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
                            <div className="slide-in mx-auto w-5/6  border  rounded-lg shadow-lg ">
                                <h1
                                    className='text-to-r from-white via-blue-500 to-white text-center'
                                > <b>TUTOR REGISTER -2</b></h1>
                                <div className="flex justify-between space-x-4 p-4">
                                    <label className='my-2'>Start</label>
                                    <select
                                        className='w-1/2 h-10 mb-2 border border-blue-200 rounded-md'
                                        value={startingTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    >
                                        {startTimeOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <label className='my-2'>End</label>
                                    <select
                                        className='w-1/2 h-10 mb-2 border border-blue-200 rounded-md'
                                        value={endingTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    >
                                        {filteredEndTimeOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='ml-4 me-4 mb-2 border-blue-200 rounded-md'>
                                    <select
                                        className='w-full h-10 border border-blue-200 rounded-md'
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                    >
                                        <option value=''>Select a language</option>
                                        {languages.map((language) => (
                                            <option key={language.id} value={language.language}>
                                                {language.language}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="mr-4 ml-4 pt-2">
                                    <input
                                        className="block mx-auto w-full p-2 rounded-md mb-2 bg-transparent  border border-blue-200 "
                                        type="number"
                                        name="Pride"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="price"
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
                            <div className="slide-in mx-auto w-5/6   border  p-4 rounded-lg shadow-lg" >
                                <h1
                                    className='text-to-r from-white via-blue-500 to-white text-center'
                                > <b>TUTOR REGISTER -3</b></h1>
                                <input
                                    className="w-full p-2 mb-4 border rounded-md"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <input
                                    className="w-full p-2 border rounded-md"
                                    type="password"
                                    name="confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
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
                                        onClick={handleSubmit}>SUBMIT</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TutorRegister
