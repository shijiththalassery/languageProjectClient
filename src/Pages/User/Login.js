import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import {  userLogin} from "../../Services/Apis"
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("tutor"); 

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const jsonData = {
      userMail:email,
      userPassword:password,
      role:userType
    }
    const userData = JSON.stringify(jsonData);
    const result = await userLogin(userData)
    if(result){
      if(result.data){
        console.log(result.data,'this is result.data ')
        if(result.data.role == 'tutor'){
          localStorage.setItem("tutorEmail", JSON.stringify(jsonData.userMail));
          navigate('/tutorHome')
        }else if(result.data.role == 'student'){
          localStorage.setItem("studentEmail", JSON.stringify(jsonData.userMail));
          navigate('/studentHome')
        }
        else{
          toast.error("Invalid username or password")
        }
      }
      else {
        console.error('Bad Request: Invalid role');
        toast.error("Invalid username or password")
      }
    }
    
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <React.Fragment>
    <Header/>
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button>
         <LoginSocialGoogle
          client_id={
            "820725030281-ije9hlnj9mg8509b4bpu2o73ff3vv250.apps.googleusercontent.com"
          }
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log('inside success')
            console.log(provider, data,'shijith');
          }}
          onReject={(err) => {
            console.log('inside error')
            console.log(err,'sreya');
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>


          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-4">
          {/* Radio buttons for user type */}
          <div className="flex items-center">
            <label className="mr-2">
              <input
                type="radio"
                name="userType"
                value="tutor"
                checked={userType === "tutor"}
                onChange={handleUserTypeChange}
              />
              Tutor
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={userType === "student"}
                onChange={handleUserTypeChange}
              />
              Student
            </label>
          </div>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </section>
    </React.Fragment>
  );
}
