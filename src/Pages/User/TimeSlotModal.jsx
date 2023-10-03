import React,{useState} from 'react'
import TutorTimeSlot from './TutorTimeSlot';

function TimeSlotModal() {
    const [showModal, setShowModal] = useState(false)
    
    const handleOnClose = () => setShowModal(false)
    return (
        <div className='w-1/2 rounded-lg flex  justify-center ml-2' >
            <button
            className=' justify-center w-full h-full border border-blue-950 text-center rounded-md '
            onClick={()=>setShowModal(true)}
            >
            Select time</button>
            <TutorTimeSlot onClose={handleOnClose} visible={showModal} />
        </div>
    );
}

export default TimeSlotModal
