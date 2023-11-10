import React, { useState } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import StudNav from './StudNav';

function SelectSlot() {
    const daysObject = {
        Monday: [3, 6, 8],
        Tuesday: [2, 7, 4],
        Wednesday: [9, 1, 5],
        Thursday: [8, 6, 2],
        Friday: [7, 3, 1],
        Saturday: [4, 9, 5],
        Sunday: [6, 2, 8],
    };

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
        const days = Object.keys(daysObject);
        const currentIndex = days.indexOf(currentDay);
        if (currentIndex < days.length - 1) {
            setCurrentDay(days[currentIndex + 1]);
        }
    };

    const handlePrevDay = () => {
        const days = Object.keys(daysObject);
        const currentIndex = days.indexOf(currentDay);
        if (currentIndex > 0) {
            setCurrentDay(days[currentIndex - 1]);
        }
    };

    const handleSubmit = async () => {
        // Check if all days have been selected
        const allDaysSelected = Object.keys(daysObject).every((day) => selectedValues[day] !== undefined);

        if (allDaysSelected) {
            console.log(selectedValues,'this is the user selected time slot')
            setValidationError(false);
        } else {
            // Display validation error message
            setValidationError(true);
        }
    };

    const isLastDay = currentDay === Object.keys(daysObject)[Object.keys(daysObject).length - 1];

    return (
        <div className='w-full h-full '>
            <StudNav />
            <div className="flex h-screen items-center justify-center">
                <div className="p-4 bg-gray-200 rounded shadow-md">
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
                        <div className="flex space-x-4">
                            {daysObject[currentDay].map((value) => (
                                <label key={value} className="flex items-center">
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
                        <button
                            onClick={handleSubmit}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Submit
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default SelectSlot;
