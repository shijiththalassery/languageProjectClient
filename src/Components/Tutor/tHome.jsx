import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TutNav from './TutNav'
import "../../index.css"

function T_home() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("tutorEmail")
        if (!token) {
            navigate("/tutorLogin")
        }
    })

    return (
        <div>
            <TutNav />
            <div className='w-screen h-screen flex'>
                <div className='w-1/2 h-screen    '>
                    <div className='flex justify-start items-center h-screen'>
                        <div className=''>
                            <img
                                className='h-screen'
                                src="https://res.cloudinary.com/dk1eug9ms/image/upload/v1697902279/webImages/shijith123_kmwpun.png" ></img>
                        </div>
                        <div class="min-h-screen flex items-center  justify-center w-3/4">
                            <div class="text-center py-8">
                            <h1 class="text-4xl font-bold mb-4 text-indigo-700 animate-fade-in">Unlock Your Potential as a Tutor!</h1>
                                <ul class="list-disc list-inside text-lg text-left space-y-4">
                                    <li class="flex items-center justify-center">
                                        <span class="mr-2 text-2xl text-yellow-600">&#x2605;</span> <span class="text-gray-700"><b>Income Generation</b></span> <span class="text-gray-600"></span>
                                    </li>
                                    <li class="flex items-center justify-center">
                                        <span class="mr-2 text-2xl text-yellow-600">&#x2605;</span> <span class="text-gray-700"><b>Flexible Schedule</b></span> <span class="text-gray-600"></span>
                                    </li>
                                    <li class="flex items-center justify-center">
                                        <span class="mr-2 text-2xl text-yellow-600">&#x2605;</span> <span class="text-gray-700"><b>Professional Growth</b></span> <span class="text-gray-600"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-screen flex justify-end'>
                    <div className=' '>
                        <img src='https://bucket.mlcdn.com/a/2044/2044076/images/255ecc37d03bce82d5f82837742e0895aaf914cd.png'></img>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default T_home
