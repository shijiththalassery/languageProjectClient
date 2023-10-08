import React, { useState } from 'react'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { useNavigate, Link } from 'react-router-dom';

import { tutorLogin } from '../../Services/Apis';
import { googleAuthCheck } from '../../Services/Apis';

function Login() {

    const navigate = useNavigate();

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
                alert('server issue')
            }else if (respond.data.message =='serverError'){
                alert('server issue please try again later')
            }
            else if (respond.data.message =='notFound'){
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
            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="md:w-1/3 max-w-sm">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Sample image"
                    />
                </div>
                <div className="md:w-1/3 max-w-sm">
                    <div className=" flex text-center md:text-left">
                    <h1>Tutor Sign In</h1>
                        <label className="mr-1">Sign in with</label>
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
                        <button
                            type="button"
                            className="mr-4 inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
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
                            <Link to="/TutorRegister">Register</Link> 
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login