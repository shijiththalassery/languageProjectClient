import React,{useState} from 'react'
import UploadReview from './UploadReview';

function ReviewModal({ id }) {

    const tutorId = {
        id :id
    } ;

    const [showModal, setShowModal] = useState(false);
    const handleOnClose = () => setShowModal(false)
    return (
        <div>
            <div className='flex ' >
                <p className='mt-1'><b>write your review</b></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className=" ml-4 w-4 h-4 mt-2"
                    onClick={() => setShowModal(true)}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <UploadReview onClose={handleOnClose} visible={showModal} id={tutorId?.id}  />
                      </div>
        </div>
    )
}

export default ReviewModal
