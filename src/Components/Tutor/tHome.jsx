import React from 'react'
import TutorNavbar from './TutorNavbar'

function T_home() {
    
    return (
        <div>
        <TutorNavbar/>
            <div className="min-h-screen bg-blue-500 text-white flex flex-col items-center justify-center p-10">
                <h1 className="text-4xl font-semibold mb-4 animate-bounce">Start Your Teaching</h1>
                <div className="text-lg mb-8">
                    <p>Benefits of our platform:</p>
                    <ul className="list-disc pl-6">
                        <li>Interactive Learning</li>
                        <li>Flexible Scheduling</li>
                        <li>Wide Range of Courses</li>
                        <li>Expert Instructors</li>
                    </ul>
                </div>
                <p className="text-xl animate-pulse">Explore our courses below</p>
            </div>
        </div>
    )
}

export default T_home