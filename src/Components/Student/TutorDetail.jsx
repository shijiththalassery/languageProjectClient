import React from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';

function TutorDetail() {
    return (
        <>
            <StudentNavbar />
            <div className="h-full min-h-screen bg-blue-500">
                <div className="bg-green-500 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-auto p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <div className='bg-blue-600 flex flex-col md:flex-row w-full h-2/3 items-center'>
                        <div className='mb-4 md:mb-0'>
                            <div className="w-48 h-48 border border-gray-300 rounded-md">
                                <img src="your-image-url.jpg" alt="Your Image" className="w-full h-full object-cover shadow-md" />
                            </div>
                        </div>
                        <div className='md:ml-4'>
                            <h3 className="text-lg">Name: Tutor</h3>
                            <h3 className="text-lg">Landing Page: Malayalam</h3>
                            <h3 className="text-lg">Price: $15000</h3>
                        </div>
                    </div>
                    <div className='bg-white mt-2 flex flex-col md:flex-row justify-center w-full'>
                        <button
                            type="button"
                            className="mt-2 md:mt-0 mb-2 md:mb-0 mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick
                        >
                            Buy now
                        </button>
                        <button
                            type="button"
                            className="mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick
                        >
                            Book now
                        </button>
                    </div>
                    <div className='bg-yellow-400 w-full mt-2 flex flex-col'>
                        <h1>Review</h1>
                        <div className="h-1 w-full bg-blue-900"></div>
                        <div className=' justify-center text-center'>
                            <h3 className=''><b>name</b></h3>
                            <p>this  is the honest reeview from my side this
                                clas is very effective and very usefull i suggested
                                one of my friend also now his feed back is good</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TutorDetail;