import React, { useEffect } from 'react'
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate } from 'react-router-dom';
import {
    CheckIcon,
    CloudUploadIcon,
    DatabaseIcon,
    PaperAirplaneIcon,
    ServerIcon,
    PhoneIcon,
    ArrowSmRightIcon,
    ChipIcon,
    SupportIcon
} from '@heroicons/react/solid';

import StudNav from './StudNav';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Shome() {
    const imageArrow = "https://th.bing.com/th/id/R.c535759992da20e8a16ec9ba597127a8?rik=g%2bErgZ8c7iwLAQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f3%2fRight-Arrow-PNG-Transparent-Picture.png&ehk=jP50kYKhPZWmbKLqppC9djlCyV3Zc3OqX6IdoCxkGD0%3d&risl=&pid=ImgRaw&r=0"
    useEffect(() => {
        const token = localStorage.getItem("studentEmail")
        if (!token) {
            navigate("/studentLogin")
        }
    })
    const navigate = useNavigate()
    const redirectTutuoList = async () => {
        navigate('/tutorList')
    }
    return (
        <div>
            <StudNav />
            <section>
                <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
                    <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                        <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                            <p className='text-blue-600 text-2xl ml-2'>Adapt or become obsolete</p>
                            <h1 className='text-blue-600  ml-2 mr-2 -2 py-3 text-5xl md:text-7xl font-bold'>Start learning Today &nbsp;
                                <Button
                                    variant="outlined"
                                    className="h-12 mr-2"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={redirectTutuoList}

                                >
                                    <img src={imageArrow} className='h-8 w-10' alt="Button Image" />
                                </Button>
                            </h1>
                            <p className='text-2xl text-blue-600 '>The Power of Language </p>
                            <button className='py-3 px-6 sm:w-[60%] my-4'>    </button>
                        </div>
                        <div>
                            <img className='w-full' src={"https://anchante.net/images/1%201.png"} alt="/" />
                        </div>
                        <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
        mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200
        border border-slate-300 rounded-xl text-center shadow-xl'>

                            <div className='flex justify-between flex-wrap px-4 '>
                                <li><b>Interactive Lesson</b></li>
                                <li><b>Language Exchange</b></li>
                                <li><b>Feedback and Assessment</b></li>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Shome
