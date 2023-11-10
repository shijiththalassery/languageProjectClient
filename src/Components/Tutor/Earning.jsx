import React from 'react';
import TutNav from './TutNav';
import { BarChart } from '@mui/x-charts/BarChart';



function Earning() {
    return (
        <div className='w-full h-full '>
            <TutNav />
            <div className='w-full h-full bg-green-200'>
                <div className='w-screen h-auto bg-slate-300'>


                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 pt-8 pb-8 border border-black'>

                        <div className='mx-auto border md:col-span-1 border-black bg-blue-200 hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-blue-900 font-bold"><b>Total Students: 12</b></p>
                            </div>
                        </div>

                        <div className='mx-auto border md:col-span-1 border-black bg-yellow-200 hover:bg-yellow-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-yellow-900 font-bold"><b>Total Students: 12</b></p>
                            </div>
                        </div>

                        <div className='mx-auto border md:col-span-1 border-black bg-green-200 hover:bg-green-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-green-900 font-bold"><b>Active Students: 3</b></p>
                            </div>
                        </div>

                        <div className='mx-auto border md:col-span-1 border-black bg-red-200 hover:bg-red-300 transform hover:scale-105 transition duration-300 ease-in-out'>

                            <div className='w-auto h-auto p-4'>
                                <p className="text-center text-red-900 font-bold"><b>Total Earnings: 108000</b></p>
                            </div>
                        </div>
                    </div>


                    <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

                        <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
                            <h1 className='text-center'><b>STUDENTS PER MONTH</b></h1>
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: ['bar A', 'bar B', 'bar C'],
                                        scaleType: 'band',
                                    },
                                ]}
                                series={[
                                    {
                                        data: [2, 5, 3],
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </div>
                        <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
                            <h1 className='text-center'><b>MONEY PER MONTH</b></h1>
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: ['bar A', 'bar B', 'bar C'],
                                        scaleType: 'band',
                                    },
                                ]}
                                series={[
                                    {
                                        data: [2, 5, 3],
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Earning
