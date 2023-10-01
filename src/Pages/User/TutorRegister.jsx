
import React, { useState, useEffect } from 'react';
import { TutorRegistration } from '../../Services/Apis';
import { languageList } from "../../Services/Apis"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Header from './Header';

import { Input } from "@nextui-org/react";

function TutorRegister() {
    const navigate = useNavigate();
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
        console.log('entering handile submitt')
        e.preventDefault();
        const data = {
            name: username,
            email: email,
            mobile: mobile,
            language: language,
            photo: file,
            password: password,
            confirmPassword: confirmPassword,
            
        }
        const mobilePattern = /^(\+91)[0-9]{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/;
        if (data.name === "") {
            alert("enter your name");
            toast.error("enter your name")
        }
        else if (!data.email.includes('@gmail.com')) {
            toast.error("enter enter a valid email id")
            alert("enter valid email");
        }
        else if (!mobilePattern.test(data.mobile)) {
            toast.error("please enter a valid mobile number");
            alert("enter valid mobile");
        }
        else if (data.language === "") {
            toast.error("Select a language ")
            alert('select language')
        }
        if (!passwordRegex.test(data.password)) {
            alert('type a good password')
            toast.error("Password must contain at least one capital letter, one small letter, one number or special character, and be at least 6 characters long.");
        }
        else if (data.password != data.confirmPassword) {
            alert('password and confirm password is not match')
            console.log(data.password,data.confirmPassword ,'this is password and confirm password')
            toast.error("Passwords do not match. Please type them correctly.");
        }else{
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
                if(responce.data.message == 'user is alredy exist'){

                }else if(responce.data.message == 'success'){
                    navigate('/tutorOtpVerification');
                }
            } catch (error) {
                
            }
        }
    }
    return (

        <div>
            <Header />
            <section className="flex justify-center items-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 grid grid-cols-1 gap-2 flex justify-center items-center">
                    <h2 className="text-2xl font-semibold mb-4">Register Here</h2>
                    <input
                        className="w-full p-2 border rounded-md mb-2"
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
                        className="w-full p-2 border rounded-md mb-2"
                    />

                    <input
                        className="w-full p-2 border rounded-md"
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
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm mb-2"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm mb-2"
                        placeholder="Confirm Password"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md mt-3"
                        onClick={handleSubmit}>Submit

                    </button>
                </div>

            </section>
        </div>
    )
}

export default TutorRegister
