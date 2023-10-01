import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { tutorOtpVerification } from "../../Services/Apis"
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

function TutorOtp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const handleSubmit = async (e) => {
        console.log('inside handle submit')
        const tutorDataJSON = localStorage.getItem("TutorData");
        if(tutorDataJSON){
            const userData = JSON.parse(tutorDataJSON);
            userData.otp = otp;
            const datum = JSON.stringify(userData);
            const responce = await tutorOtpVerification(datum);
            if(responce.data.message == 'ok'){
                navigate('/tutorHome');
            }
        }
    }

    const handleResend = () => {
        // Add logic for resending OTP here
        console.log('Resending OTP...');
        setIsResendDisabled(true);
    
        // Simulate a delay before enabling the button again (e.g., 30 seconds)
        setTimeout(() => {
          setIsResendDisabled(false);
        }, 30000);
      };
  return (
    <> 
    <Header/>
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-5 shadow-md rounded-lg w-full max-w-sm">
      <div className="flex justify-center items-center ">
        {/* Create a centered box */}
        <div className="bg-blue-500  shadow-lg rounded-lg">
          {/* Place the OTP input inside the box */}
          <OtpInput
            className="w-100 h-48 bg-blue" // Set the width to 12rem
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span>-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-10 h-30 px-2 text-4xl border rounded-md m-3"
              />
            )}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-5"
      >
        Submit
      </button>
      <button
        onClick={handleResend}
        className={`w-full bg-blue-500 text-white p-2 rounded-md mt-2 ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={isResendDisabled}
      >
        Resend OTP
      </button>
    </div>
    <ToastContainer />
  </div>
    </>
  )
}

export default TutorOtp
