import React, { useState } from 'react';
import "../index.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import Button from '@mui/material/Button';


function Tags() {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('No file selected');
  const [file, setFile] = useState(null);


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
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className='h-screen bg-green-100 grid grid-cols-1 md:grid-cols-2'>
      <div className="bg-blue-100 flex justify-center items-center" >
        <img
          src='https://www.freeiconspng.com/uploads/register-button-png-20.png'
          className='sm:w-full sm:h-auto'
          alt='register image'
        />
      </div>
      <div className='bg-yellow-200 flex justify-center items-center'>
        <div className=' bg-green-400 w-3/4 h-3/4 flex justify-center items-center ' >

          {step === 1 && (

            <div className="slide-in mx-auto w-3/4  border border-red-500 p-4 ">
              <h1
                className='text-to-r from-white via-blue-500 to-white text-center'
              > <b>TUTOR REGISTER -1</b></h1>
              <input
                className="block  mx-auto p-2 w-full   rounded-md mb-2 bg-transparent border border-blue-800"
                type="text"
                name="username"
                value={userName}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <div className="slide-in mx-auto w-3/4  border border-red-500  ">
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <div className="slide-in mx-auto w-3/4  border border-red-500 p-4" >
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
  );
}

export default Tags;
