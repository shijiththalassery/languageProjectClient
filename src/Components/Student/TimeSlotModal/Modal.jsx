import React, { useState } from 'react'
import UploadModal from './UploadModal';


function Modal({timeSlot}) {

    const availbleTimeSlot= timeSlot
    const [showModal, setShowModal] = useState(false);

    const handleOnClose = () => setShowModal(false);

    return (
        <div>

            <div className="flex items-center">
                
                <button
                    type="button"
                    className="mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    onClick={() => setShowModal(true)}
                >
                    Select Time
                </button>
                <UploadModal onClose={handleOnClose} visible={showModal}  tutorTimeSlot = {availbleTimeSlot} />
            </div>
        </div>
    )
}

export default Modal
