import React, { useState, useEffect } from 'react'
import { studentProfileEdit } from '../../../Services/Apis';
import studentInstance from '../../../api/studentInstace'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileModal({ visible, onClose, stduentData }) {
  const studentEmail = localStorage.getItem('studentEmail');
  const studInf = stduentData;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('')
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);

  const handleBackground = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setBackgroundPhoto(reader.result);
      }
      setBackgroundPhoto(selectedFile)
    } else {
      console.log('nothing')
    }

  }
  const handleProfile = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setProfilePhoto(reader.result);
      }
      setProfilePhoto(selectedFile)
    } else {
      console.log('nothing')
    }
  }
  const editDetail = async () => {
    const data = {
      existEmail: studentEmail,
      name: name ? name : studInf.name,
      email: email ? email : studInf.email,
      number: number ? number : studInf.phone,
      profilePhoto: profilePhoto ? profilePhoto : studInf.profilePhoto,
      backgroundPhoto: backgroundPhoto ? backgroundPhoto : studInf.backgroundPhoto
    }
    const studData = JSON.stringify(data);
    console.log(typeof (data.phone, 'this is type of phone'))
    const modifiedMobilePattern = /^(91\d{10}|[6-9]\d{9})$/;

    if (!modifiedMobilePattern.test(data.number)) {
      alert('please enter a valid number')
    } 
    else if (!data.email.includes('@gmail.com')) {
      alert("enter valid email");
    } 
    else {
      try {
        //const respond = await studentProfileEdit(studData);
        const respond = await studentInstance.post(`/studentProfileEdit`,{
          existEmail: studentEmail,
          name: name ? name : studInf.name,
          email: email ? email : studInf.email,
          number: number ? number : studInf.phone,
          profilePhoto: profilePhoto ? profilePhoto : studInf.profilePhoto,
          backgroundPhoto: backgroundPhoto ? backgroundPhoto : studInf.backgroundPhoto
        })
        console.log(respond,'from profile edit')
        toast.success(respond.data)
        alert(respond.data)
        onClose()
      } catch (error) {
        console.log(error)
        onClose()
      }
    }
  }

  if (!visible) return null;
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose()
  }
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className="  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-1/3 ">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Edit Profile
        </h1>
        <p className="text-center text-gray-700 mb-5"></p>

        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={studInf?.name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <input
            type="email"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={studInf?.email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <input
            type="number"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={studInf?.phone}
            onChange={(e) => { setNumber(e.target.value) }}
          />
          <label>profile photo</label>
          <input
            type="file"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="profile photo"
            onChange={handleProfile}

          />
          <label>Background photo</label>
          <input
            type="file"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="background photo"
            onChange={handleBackground}
          />

        </div>
        <div className="text-center">
          <button onClick={editDetail} className="px-5 py-2 bg-gray-700 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal