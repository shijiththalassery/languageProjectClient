import logo from './logo.svg';
import './App.css';
import Login from './Pages/User/Login';
import StudentRegister from './Pages/User/StudentRegister';
import TutorRegister from './Pages/User/TutorRegister';
import Otp from './Pages/User/Otp';
import Header from './Pages/User/Header';
import Footer from './Pages/User/Footer';
import Error from './Pages/User/Error';
import LandigPage from './Pages/User/LandigPage';

import Tutor_home from './Pages/Tutor/tHome';
import TutorProfiles from './Pages/Tutor/TutorProfiles';
import TutorOtp from './Pages/User/TutorOtp';
import TutorLogin from './Pages/Tutor/TutorLogin';
import Premiums from './Pages/Tutor/Premiums';



import S_home from './Pages/Student/S_home';
import StudentProfiles from './Pages/Student/StudentProfiles';
import TutorLists from './Pages/Student/TutorLists';

import Alogin from './Pages/Admin/Alogin';
import AdminHomes from './Pages/Admin/AdminHomes';
import AdminStudentLists from './Pages/Admin/AdminStudentLists';
import AdminTutorLists from './Pages/Admin/AdminTutorLists';
import AdminCoupens from './Pages/Admin/AdminCoupens';
import AdminLanguages from './Pages/Admin/AdminLanguages';
import AdminVerificationLists from './Pages/Admin/AdminVerificationLists';


import { Route, Routes } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <React.Fragment>

  
    <Routes className="mt-4 screen-md">
      <Route path='*' element={<Error />} />
      <Route path='/' element={<LandigPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp' element={<Otp />} />
      <Route path='/StudentRegister' element={<StudentRegister />} />
     



      <Route path='/tutorHome' element={<Tutor_home />} />
      <Route path='/tutorProfile' element={<TutorProfiles />} />
      <Route path='/TutorRegister' element={<TutorRegister />} />
      <Route path='/tutorOtpVerification' element={<TutorOtp />} />
      <Route path='/tutorLogin' element={<TutorLogin />} />
      <Route path='/tutorPremium' element={<Premiums/>} />


      <Route path='/studentHome' element={<S_home />} />
      <Route path='/studentProfile' element={<StudentProfiles />} />
      <Route path='/tutorList' element={<TutorLists />} />

      <Route path='/adminLogin' element={<Alogin />} />
      <Route path='/adminHome' element={<AdminHomes />} />
      <Route path='/adminStudentLists' element={<AdminStudentLists />} />
      <Route path='/adminTutorLists' element={<AdminTutorLists />} />
      <Route path='/adminCouponLists' element={<AdminCoupens />} />
      <Route path='/addLanguage' element={<AdminLanguages />} />
      <Route path='/checkTutor' element={<AdminVerificationLists />} />

    </Routes>
  
    <Footer className="mb-8" />
  </React.Fragment>
  );
}

export default App;