import React, { useState } from 'react'

function TutorTimeSlot({ visible, onClose }) {

    const [selectedDay, setSelectedDay] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [schedule, setSchedule] = useState({});
    const [error, setError] = useState('');

    const maxAllowedSelections = 3;

    const daysOfWeek = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
        setShowPopup(true);
    };
    if (!visible) return null;
    const handleOnClose = (e) => {
        if (Object.keys(schedule).length === 7) {
            if (e.target.id === 'container') onClose()
        }
    }
    const handleCheckboxChange = (e) => {
        const number = parseInt(e.target.value);
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
        } else {
            if (selectedNumbers.length < maxAllowedSelections) {
                setSelectedNumbers([...selectedNumbers, number]);
            } else {
                setError(`You can only select up to ${maxAllowedSelections} numbers.`);
            }
        }
    };

    const handleSubmit = () => {
        if (selectedDay) {
            if (selectedNumbers.length === 3) {
                const updatedSchedule = {
                    ...schedule,
                    [selectedDay]: selectedNumbers,
                };
                setSchedule(updatedSchedule);
                setSelectedDay('');
                setSelectedNumbers([]);
                setShowPopup(false);
                setError('');
                console.log(`Schedule updated:`, updatedSchedule);
            } else {
                setError('Please select exactly three numbers.');
            }
        } else {
            setError('Please select a day.');
        }
    };

    if (Object.keys(schedule).length === 7) {

    } else {

    }

    const submit = async () => {
        if (Object.keys(schedule).length === 7) {

            const timeSlot = {
                ...schedule,
            };
            localStorage.setItem('timeSlot', JSON.stringify(timeSlot));
            onClose()
        } else {
            alert('Please select all seven days.');
        }
    };


    return (
        <div id='container'
            onClick={handleOnClose}
            className="  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
            <div className=" w-1/2 flex flex-col justify-center items-center h-screen">
                <div className='w-full h- items-center justify-center rounded-md bg-slate-300 shadow-lg pb-2'>
                    <div className="bg-white p-6 rounded-md drop-shadow-lg mt-2 ml-2 me-2 w-  text-center">
                        <label htmlFor="day">Select a day:</label>
                        <select id="day" onChange={handleDayChange} value={selectedDay} className="block w-full p-2 border rounded">
                            <option value="">Select a day...</option>
                            {daysOfWeek.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                        <div className='flex justify-center items-center mt-4'>
                            <button
                                onClick={submit}
                                className='text-center rounded-md bg-blue-500 drop-shadow-lg border-blue w-1/4 h-10 '
                            >
                                Done
                            </button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                            <div className="bg-white p-6 rounded shadow-md items-center flext justify-center">
                                <label htmlFor="inputField">Input Field:</label>

                                <label className="mt-4">Each class is 1 hour </label>
                                <div>
                                    {Array.from({ length: 14 }, (_, i) => i + 9).map((number) => (
                                        <label key={number} className="block">
                                            <input
                                                type="checkbox"
                                                value={number}
                                                checked={selectedNumbers.includes(number)}
                                                onChange={handleCheckboxChange}
                                                disabled={selectedNumbers.length >= maxAllowedSelections && !selectedNumbers.includes(number)}
                                            />
                                            {number}
                                        </label>
                                    ))}

                                </div>
                                <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                        </div>
                    )}

                    {/* Display selected days */}
                    <div className="mt-5   bg-white rounded-lg drop-shadow-lg items-center text-center overflow-y-auto  ml-2 me-2 w-">
                        <div className="mt-2  mb-2 h-full ">
                            <strong>Selected Days:</strong><br></br>
                            {Object.keys(schedule).map((day) => (
                                <span key={day} className="ml-2">{day}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorTimeSlot
