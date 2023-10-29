


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

        // If this is not the last slot, add intermediate slots
        if (i < timeSlots.length - 1) {
            for (let j = startTime + 1; j < timeSlots[i + 1]; j++) {
                const startIntermediate = j % 24;
                const endIntermediate = (startIntermediate + 1) % 24;
                const startIntermediatePeriod = startIntermediate < 12 ? 'am' : 'pm';
                const endIntermediatePeriod = endIntermediate < 12 ? 'am' : 'pm';

                const intermediateStartHour = startIntermediate === 0 ? 12 : startIntermediate % 12 || 12;
                const intermediateEndHour = endIntermediate === 0 ? 12 : endIntermediate % 12 || 12;

                const intermediateSlot = `${intermediateStartHour} ${startIntermediatePeriod} to ${intermediateEndHour} ${endIntermediatePeriod}`;
                formattedSlots.push(intermediateSlot);
            }
        }
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