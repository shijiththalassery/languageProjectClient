import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { userRegistration } from "../../Services/Apis"
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDataJSON = localStorage.getItem("StudentData");
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      userData.otp = otp;
      const datum = JSON.stringify(userData);
      const responce = await userRegistration(datum);
      if (responce.status == 200) {
        if (userDataJSON) {
          navigate('/studentLogin')
        } else {
          navigate('/tutorLogin')
        }

      } else {
        toast.error("Please enter correct otp")
      }
      console.log(responce, 'this is responce from data base storage ')
    }



  };

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
      <Header />
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

  );
}

export default Otp;
