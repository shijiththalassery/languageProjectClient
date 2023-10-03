import React, { useState } from 'react';

function Tags() {
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

    const submit = async () => {
        if (Object.keys(schedule).length === 7) {
            // All seven days have been selected
            const timeSlot = {
                ...schedule,
            };
            alert('successfully completed')
            console.log('Time Slot:', timeSlot);
        } else {
            alert('Please select all seven days.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className='w-1/2 h-1/2 items-center justify-center rounded-md bg-slate-300 shadow-lg'>
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

                            <label className="mt-4">Select numbers (1-9):</label>
                            <div>
                                {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
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
                <div className="mt-7  h-1/4 bg-white rounded-lg drop-shadow-lg items-center text-center overflow-x-auto  ml-2 me-2 w-">
                    <div className="mt-4">
                        <strong>Selected Days:</strong><br></br>
                        {Object.keys(schedule).map((day) => (
                            <span key={day} className="ml-2">{day}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tags;
