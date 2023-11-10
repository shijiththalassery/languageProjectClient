


export function timeConversion(arr) {
    const timeSlots = arr;

    const formattedSlots = [];

    for (let i = 0; i < timeSlots.length; i++) {
        const startTime = timeSlots[i];
        const endTime = (startTime + 1) % 24; // Calculate end time
    
        const startPeriod = startTime < 12 ? 'am' : 'pm';
        const endPeriod = endTime < 12 ? 'am' : 'pm';
    
        // Format the time slot
        const startHour = startTime === 0 ? 12 : startTime % 12 || 12;
        const endHour = endTime === 0 ? 12 : endTime % 12 || 12;
    
        const timeSlot = `${startHour} ${startPeriod} to ${endHour} ${endPeriod}`;
        formattedSlots.push(timeSlot);
    }
    return formattedSlots;
}



export function amPmToRealTime(timeInString) {
    
    if ((timeInString.slice(0, 5)).includes('pm')) {
        if (parseInt((timeInString.slice(0, 5))) !== 12) {
            return (parseInt((timeInString.slice(0, 5))) + 12)
        }
        else {
            return 12
        }
    } else {
        if (parseInt((timeInString.slice(0, 5))) !== 12) {
            return (parseInt((timeInString.slice(0, 5))) )
        }
        else {
            return 0
        }
    }
}