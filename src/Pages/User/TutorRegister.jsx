
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
    return (

        <div>
            <Header />
            <section className=" w-screen h-screen">
                <div className='w-screen h-screen  rounded-lg flex justify-center content-center'>
                    <div className=' shadow-lg flex justify-center items-center '>
                        <div className='w-3/4 flex justify-center items-center rounded-xl shadow-2xl bg-blue-400'>
                            <div className='w-2/3 h-full  flex justify-center items-center  '>
                                <div className='w-1/2 h-full flex justify-center items-center '>
                                    <img
                                        src='https://www.freeiconspng.com/uploads/register-button-png-20.png'
                                        className='mr-12'></img>
                                </div>
                                <div className='w-1/2 h-full '>

                                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 grid-cols-1 gap-2  justify-center items-center">
                                        <h2 className="text-2xl font-semibold mb-4">Register Here</h2>
                                        <input
                                            className="w-full p-2  rounded-md mb-2 border border-blue-950"
                                            type="text"
                                            name="username"
                                            id=""
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="User Name"
                                        />

                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={mobile}
                                            onChange={setMobile}
                                            defaultCountry="IN"
                                            className="w-full p-2 border border-blue-950 rounded-md mb-2"
                                        />

                                        <input
                                            className="w-full p-2 border border-blue-950  rounded-md"
                                            type="text"
                                            name="email"
                                            id=""
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />

                                        <select
                                            className="w-full border border-gray-700 p-2 rounded mb-2"
                                            value={language}
                                            onChange={(e) => setLanguge(e.target.value)}
                                        >
                                            <option value="">Select a Language</option>
                                            {languages.map((lang) => (
                                                <option key={lang.id} value={lang.language}>
                                                    {lang.language}
                                                </option>
                                            ))}
                                        </select>
                                        <div className='flex '>
                                            <input
                                                type="number"
                                                name="number"
                                                placeholder="hour"
                                                className=" text-center w-1/3 p-2 border rounded-md border-blue-950 "
                                                onChange={(e) => setHour(e.target.value)}
                                                value={hour}
                                            />
                                            <input
                                                type="number"
                                                name="number"
                                                placeholder="Expected Price"
                                                className="  text-center ml-2 w-2/3  border rounded-md border-blue-950 "
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className='flex '>
                                            <input
                                                type="file"
                                                name="file"
                                                onChange={handleFileChange}
                                                className="w-1/2 p-2 border rounded-md border-blue-950 "
                                            />
                                            <TimeSlotModal />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full p-2 border border-blue-950  rounded-md shadow-sm mb-2 "
                                            placeholder="Password"
                                        />

                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full p-2 border border-blue-950  rounded-md shadow-sm mb-2 "
                                            placeholder="Confirm Password"
                                        />


                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 text-white p-2 rounded-md mt-3"
                                            onClick={handleSubmit}>Submit

                                        </button>
                                        <p className="mt-3">Alredy  have an account?<Link to="/tutorLogin" className="hover:text-blue-500">
                                            Login here
                                        </Link></p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TutorRegister
