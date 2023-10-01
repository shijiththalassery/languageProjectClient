import React, { useState } from 'react';

function DayTimeSlotSelector() {
 
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [timeSlot, setTimeSlot] = useState('');
    const [schedule, setSchedule] = useState({});
  
    const daysOfWeek = [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
  
    const timeInfo = ['10-11', '11-12', '12-13', '13-14', '14-15'];
  
    const handleDayChange = (e) => {
      setSelectedDay(e.target.value);
    };
  
    const handleTimeSlotChange = (e) => {
      setTimeSlot(e.target.value);
    };
  
    const handleAddTimeSlot = () => {
      if (timeSlot) {
        setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
        setTimeSlot('');
      }
    };
  
    const handleAddStaticTimeSlots = () => {
      setSelectedTimeSlots([...selectedTimeSlots, ...timeInfo]);
    };
  
    const handleSaveSchedule = () => {
      if (selectedDay && selectedTimeSlots.length > 0) {
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          [selectedDay]: selectedTimeSlots,
        }));
        setSelectedDay('');
        setSelectedTimeSlots([]);
      }
    };


  return (
      <div>
      <label>Select a day:</label>
      <select value={selectedDay} onChange={handleDayChange}>
        <option value="">Select a day...</option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>

      <label>Set time slot:</label>
      <input type="text" value={timeSlot} onChange={handleTimeSlotChange} />
      <button onClick={handleAddTimeSlot}>Add Time Slot</button>
      <button onClick={handleAddStaticTimeSlots}>Add Static Time Slots</button>

      <div>
        <label>Selected time slots:</label>
        {selectedTimeSlots.map((slot, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={slot}
              checked={true} // You can customize this to manage checked state if needed
              readOnly
            />
            {slot}
          </div>
        ))}
      </div>

      <button onClick={handleSaveSchedule}>Save Schedule</button>

      <div>
        <label>Schedule:</label>
        <pre>{JSON.stringify(schedule, null, 2)}</pre>
      </div>
    </div>
  );
}

export default DayTimeSlotSelector;
