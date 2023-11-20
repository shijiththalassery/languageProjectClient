import React, { useState, useEffect } from 'react';
import TutNav from './TutNav';
import { BarChart } from '@mui/x-charts/BarChart';
import instance from '../../api/axiosInstance';

function Earning() {

    const [totalEarning, setTotalEarning] = useState()
    const [currentMonthEarning, setCurrentMonthEarning] = useState()
    const [totalActiveStudentsCount, setTotalActiveStudentsCount] = useState([]);
    const [totalStudent, setTotalStudent] = useState([]);
    const [studentPerMonth, setStudentPerMonth] = useState([]);
    const [pricePerMonth, setPricePerMonth] = useState([]);

    let totalStduents
    if (totalStudent && totalStudent.length > 0) {
        const studentArray = totalStudent.map((element) => element.totalStudents)
        totalStduents = studentArray;
    }

    let month = [];
    let studentsPerMonth = [];
    let pricePerMonths = [];

    if (pricePerMonth && pricePerMonth.length > 0) {
        pricePerMonths = pricePerMonth.map(element => element.totalPrice);
    }

    if (studentPerMonth && studentPerMonth.length > 0) {
        month = studentPerMonth.map(element => element.month);
        studentsPerMonth = studentPerMonth.map(element => element.totalStudents);
    }

    useEffect(() => {
        const fetchData = async () => {
            const respond = await instance.get(`/tutorEarning`)
            if (respond.data.check === true) {
                setTotalActiveStudentsCount(respond.data.totalActiveStudentsCount);
                setTotalStudent(respond.data.totalStudent);
                setStudentPerMonth(respond.data.studentPerMonth)
                setPricePerMonth(respond.data.pricePerMonth)
                setTotalEarning(respond.data.totalEarning)
                setCurrentMonthEarning(respond.data.currentMonthEarning)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='w-full h-full '>
            <TutNav />
            <div className='w-full h-full bg-green-200'>
                <div className='w-screen h-auto bg-slate-300'>

                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 pt-8 pb-8 border border-black'>

                        <div className='mx-auto border md:col-span-1 border-black bg-blue-200 hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-blue-900 font-bold"><b>Total Students:{totalStduents !== null ? totalStduents : 'no value'} </b></p>
                            </div>
                        </div>

                        <div className='mx-auto border md:col-span-1 border-black bg-yellow-200 hover:bg-yellow-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-yellow-900 font-bold"><b>Active Students: {totalActiveStudentsCount !== null ? totalActiveStudentsCount : 'No value'}</b></p>
                            </div>
                        </div>

                        <div className='mx-auto border md:col-span-1 border-black bg-green-200 hover:bg-green-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-green-900 font-bold"><b>This Month Earning: {currentMonthEarning && currentMonthEarning} </b></p>
                            </div>
                        </div>

                        <div className='mx-auto border md:col-span-1 border-black bg-red-200 hover:bg-red-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-red-900 font-bold"><b>Total Earnings: {totalEarning && totalEarning} </b></p>
                            </div>
                        </div>
                    </div>


                    <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

                        <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
                            <h1 className='text-center'><b>STUDENTS PER MONTH</b></h1>

                            {month.length > 0 && (
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'barCategories',
                                            data: month,
                                            scaleType: 'band',
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: studentsPerMonth,
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                />
                            )}

                        </div>
                        <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
                            <h1 className='text-center'><b>MONEY PER MONTH</b></h1>

                            {month.length > 0 && (
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'barCategories',
                                            data: month,
                                            scaleType: 'band',
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: pricePerMonths,
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                />
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Earning
