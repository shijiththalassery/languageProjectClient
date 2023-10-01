import React, { useState } from 'react';
import { checkUser } from "../../Services/Apis"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Header from './Header';


function StudentRegister() {

    const [email, setEmail] = useState("")

    const [username, setUserName] = useState("")

    const [mobileNumber, setMobile] = useState("");

    const [selectRole, setSelectRole] = useState("")

    const [password, setPassword] = useState("");

    const [selectedFileName, setSelectedFileName] = useState('No file selected');
    const [file, setFile] = useState(null);

    const [confrimPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        mobileNumber: '',
        email: '',
        role: 'tutor',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tutorEmail = localStorage.getItem('tutorEmail');
        const formData = new FormData();
        formData.append('username', username);
        formData.append('mobileNumber', mobileNumber);
        formData.append('email', email);
        formData.append('profilePhoto', file);
        formData.append('password', password);
        formData.append('confrimPassword', confrimPassword);

        console.log(formData, 'this is form data')
       
        const data = {
            username: username,
            mobileNumber: mobileNumber,
            email: email,
            password: password,
            confrimPassword: confrimPassword,
            photo:file,
        }
        console.log(data)
        const mobilePattern = /^(\+91)[0-9]{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/;
        if (data.username === "") {
            toast.error("enter your name")
        }
        else if (!data.email.includes('@gmail.com')) {
            toast.error("enter enter a valid email id")
        }
        else if (!mobilePattern.test(data.mobileNumber)) {
            toast.error("please enter a valid mobile number")
        }
        if (!passwordRegex.test(data.password)) {
            toast.error("Password must contain at least one capital letter, one small letter, one number or special character, and be at least 6 characters long.");
        }
        else if (data.password != data.confrimPassword) {
            console.log(data.password,data.confrimPassword)
            toast.error("Passwords do not match. Please type them correctly.");
        }
        else {
            localStorage.setItem("StudentData", JSON.stringify(data));
            const jsonData = {
                phone: data.mobileNumber,
                name: data.username,
                email: data.email
            }
            const userData = JSON.stringify(data);
            try {
                const response = await checkUser(formData);
                if (response.data.message === 'success') {
                    navigate('/otp');
                } else if (response.data.message === 'error') {
                    navigate('/login');
                } else {
                    toast.error('Something went wrong. Please try again after some time.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again later.');
            }
        }

    };
    const handleFileChange = async(e) => {
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

    return (
        <React.Fragment>
            <Header />
            <section>
                <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                    <div className="bg-white p-4 shadow-md rounded-lg w-full max-w-sm text-center">
                        <h2 className="text-lg font-semibold mb-2">Registration Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full max-w-md mx-auto">
                                <div className="space-y-4">
                                    <input
                                        className="w-full p-2 border rounded-md"
                                        type="text"
                                        name="username"
                                        id=""
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="User Name"
                                    />

                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={mobileNumber}
                                        onChange={setMobile}
                                        defaultCountry="IN"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    <div id="recaptcha-container" />
                                    <input
                                        className="w-full p-2 border rounded-md"
                                        type="text"
                                        name="email"
                                        id=""
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />


                                    <input
                                        type="password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border rounded-md shadow-sm"
                                        placeholder="Password"
                                    />
                                    <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md"
                                />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full p-2 border rounded-md shadow-sm"
                                            placeholder="Confirm Password"
                                        />
                                </div>
                            </div>

                            <button type="submit" onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded-md mt-3">
                                Submit
                            </button>

                            <p className="mt-3">Alredy  have an account?<Link to="/login" className="hover:text-blue-500">
                                Login here
                            </Link></p>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </React.Fragment>
    );
}

export default StudentRegister;
