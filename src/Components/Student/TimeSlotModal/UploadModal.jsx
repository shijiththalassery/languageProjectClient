import React, { useEffect, useState } from 'react';
import { SERVER } from '../../../Services/helper';
import axios from 'axios';

function UploadModal({ visible, onClose, tutorTimeSlot }) {

    const timeSlot = tutorTimeSlot;

    const [selectedValues, setSelectedValues] = useState({});
    const [currentDay, setCurrentDay] = useState('Monday');
    const [validationError, setValidationError] = useState(false);



    const handleCheckboxChange = (day, value) => {
        setSelectedValues({
            ...selectedValues,
            [day]: value,
        });
    };

    const handleNextDay = () => {
        const days = Object.keys(timeSlot);
        const currentIndex = days.indexOf(currentDay);
        if (currentIndex < days.length - 1) {
            setCurrentDay(days[currentIndex + 1]);
        }
    };

    const handlePrevDay = () => {
        const days = Object.keys(timeSlot);
        const currentIndex = days.indexOf(currentDay);
        if (currentIndex > 0) {
            setCurrentDay(days[currentIndex - 1]);
        }
    };

    const handleSubmit = async () => {
        // Check if all days have been selected
        const allDaysSelected = Object.keys(timeSlot).every((day) => selectedValues[day] !== undefined);

        if (allDaysSelected) {
            console.log(selectedValues, 'this is the user selected time slot')

            setValidationError(false);
            onClose()
        } else {
            // Display validation error message
            setValidationError(true);
        }
    };
    const isLastDay = currentDay === Object.keys(timeSlot)[Object.keys(timeSlot).length - 1];

    const [languages, setLanguageList] = useState({});

    const handleOnSubmit = async (e) => {
        onClose()
    }

    if (!visible) return null;

    const handleOnClose = async (e) => {
        if (e.target.id === 'container') onClose()
    }







    return (
        <div
            id='container'
            onClick={handleOnClose}
            className="  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className='bg-blue-200'>

                <div className="bg-white p-2 rounded w-full">
                    <h1 className="font-semibold text-center text-xl text-gray-700">
                        Welcome back
                    </h1>
                    <input
                        id="fileInput"
                        type="text"
                        className="hidden"
                        name="file"
                        accept="image/*"
                    />
                </div>
                <div className="flex  items-center justify-center">
                    <div className="p-4 bg-gray-200 rounded shadow-md items-center justify-center">
                        <h2 className="text-lg font-semibold mb-2">Select One Value from Each Day:</h2>
                        {validationError && (
                            <p className="text-red-500 mb-2">Please select one value for each day before submitting.</p>
                        )}
                        <div className="mb-2">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handlePrevDay}
                                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Previous Day
                                </button>
                                <h3 className="text-md font-medium">{currentDay}:</h3>
                                <button
                                    onClick={handleNextDay}
                                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Next Day
                                </button>
                            </div>
                            <div className="flex space-x-4 items-center justify-center">
                                {timeSlot[currentDay].map((value) => (
                                    <label key={value} className="flex items-center mt-4">
                                        <input
                                            type="checkbox"
                                            value={value}
                                            checked={selectedValues[currentDay] === value}
                                            onChange={() => handleCheckboxChange(currentDay, value)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2">{value}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {isLastDay ? (
                            <div className='flex  items-center justify-center border'>
                                <button
                                    onClick={handleSubmit}
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            </div>

                        ) : null}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default UploadModal;
