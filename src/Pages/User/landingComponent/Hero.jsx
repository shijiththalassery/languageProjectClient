import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './heading.css'
import { useNavigate, Navigate, Link } from 'react-router-dom';




function Hero() {
    const navigate = useNavigate();
    const tutorRegistration = async () => {
        navigate('/TutorRegister')
    }
    const studentRegistration = async () => {
        navigate('/StudentRegister')
    }
    const loginDirectioin = async () => {
        navigate('/login')
    }
    return (
        <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>

                <h2 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 text-slate-700 animate-heading-slide'>
                    Teach and Learn
                </h2>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>

                    </p>

                </div>
                <p className='md:text-2xl text-xl font-bold text-slate-700'>Discover a unique opportunity where students thrive and tutors profit from their expertise</p>
                <div className="flex justify-center items-center space-x-4 my-4">
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                            onClick={() => tutorRegistration()}
                        >For Tutor
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                            onClick={() => studentRegistration()}
                        >For Student
                        </Button>
                    </Stack>
                </div>  
            </div>
        </div>
    )
}

export default Hero
