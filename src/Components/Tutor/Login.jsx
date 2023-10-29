import React, { useState ,useEffect} from 'react'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { useNavigate, Link } from 'react-router-dom';

import { tutorLogin } from '../../Services/Apis';
import { googleAuthCheck } from '../../Services/Apis';
import PublicHeader from '../../Pages/User/PublicHeader';


function Login() {
 
    const navigate = useNavigate();

    useEffect(()=>{
        const token= localStorage.getItem("tutorEmail")
        if(token){
          navigate("/tutorHome")
        }
      })

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('')

    const handleSubmit = async () =>{
        const data = {
            email : email,
            password : password
        }
        try {
            const respond = await tutorLogin(data);
            if(respond.data.success == true){
                localStorage.setItem("tutorEmail", JSON.stringify(email));
                navigate('/tutorHome')
            }else if(respond.data.message == false){
                alert('email or password is inncorect')
            }else if(respond.data.error == 'error'){
                alert('you are blocked please contact admin')
            }else if(respond.data.message == 'server error'){
                alert('server issue please try again later')
            }else{
                alert('unknown issue contact us')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const googleAuth = async(email) =>{
        const data = {
            email:email
        }
        const emails = JSON.stringify(data);
        try {
            const respond = await googleAuthCheck(emails);
            console.log(respond)
            if(respond.data.message =='success'){
                localStorage.setItem("tutorEmail", JSON.stringify(email));
                navigate('/tutorHome')
            }else if(respond.data.message =='error'){
                alert('tutor is blocked please contact admin')
            }else if (respond.data.message =='serverError'){
                alert('server issue please try again later')
            }
            else if (respond.data.message =='there no such data'){
                alert('plese register your account')
            }else {
                alert('unknow issue please contact helpline')
            }
        } catch (error) {
            console.log(error);
            alert('some internal issue try again')
        }
    }

    return (
        <div>
            <PublicHeader/>
            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-gradient-to-r shadow-2xl from-white via-blue-500 to-white ">

           <div className='h-auto flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-slate-50  rounded-2xl shadow-lg'>
           <div className="md:w-1/3 max-w-sm  ">
           <img
               src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
               alt="Sample image"
           />
       </div>
       <div className="md:w-1/3 max-w-sm  text-center  ">
       <h1 className='mt-4 mb-2 '><b>TUTOR SIGN IN</b></h1>
           <div className=" flex text-center items-center md:text-left ">
          
               <label className="mr-1"></label>
               <GoogleOAuthProvider clientId="820725030281-ije9hlnj9mg8509b4bpu2o73ff3vv250.apps.googleusercontent.com">
                   <GoogleLogin
                       onSuccess={credentialResponse => {
                           var decoded = jwt_decode(credentialResponse.credential);
                           (function() {
                               googleAuth(decoded.email)
                             })();

                       }}
                       onError={() => {
                           console.log('Login Failed');
                       }}
                   />

               </GoogleOAuthProvider>

           </div>
           <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
               <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
           </div>
           <input
               className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded shadow-xl"
               type="text"
               placeholder="Email Address"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
           />
           <input
               className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 shadow-xl"
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
           />
           <div className="mt-4 flex justify-between font-semibold text-sm">

               <a
                   className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                   href="#"
               >
                   Forgot Password?
               </a>
           </div>
           <div className="text-center flex  items-center justify-center md:text-left">
               <button
                   className="mt-4 bg-blue-600 shadow-xl hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                   type="submit"
                   onClick={handleSubmit}
               >
                   Login
               </button>
           </div>
           <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left mb-4">
               Don't have an account?{" "}
               <a
                   className="text-red-600 hover:underline hover:underline-offset-4"
                   href="#"
               >
                   <Link to="/TutorRegister">Register</Link> 
               </a>
           </div>
       </div>
           </div>

            </section>
        </div>
    )
}

export default Login
