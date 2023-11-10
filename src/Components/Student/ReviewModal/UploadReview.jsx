import React, { useState } from 'react'
import { studentReview } from '../../../Services/Apis'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import studentInstance from "../../../api/studentInstace"

function UploadReview({ visible, onClose, id }) {

    const [value, setValue] = useState();

    const tutorId = id
    const email = JSON.parse(localStorage.getItem('studentEmail'))

    const [review, setReview] = useState("")

    const data = {
        email: email,
        tutorId: tutorId,
        review: review
    }

    const handleSubmit = async (data) => {
        console.log(data, 'this is the data of the user')
        if (data.name === "") {
            alert('please enter the name')
        } else if (data.review === "") {
            alert('please write your review')
        } else {
            try {
                onClose()
                const responce = await studentInstance.post(`/reviewPost`,{
                    email: email,
                    tutorId: tutorId,
                    review: review,
                    star:value
                });
                //const responce = await studentReview(data)
                if (responce.data.message === 'done it') {
                    alert('review is alredy wrote it')
                } else if (responce.data.message === 'success') {
                    alert('Review added successfully')
                } else {
                    alert('Try after some time')
                }
            } catch (error) {
                console.error(error)
            }

        }
    }

    if (!visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose()
    }
    return (

        <div
            id='container'
            onClick={handleOnClose}
            className="  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-2 rounded w-72">
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Write Your Review
                </h1>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend">Controlled</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />

                </Box>
                <p className="text-center text-gray-700 mb-5"></p>

                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder='Please write your review....'
                        className="border border-gray-700 p-2 w-full h-32 rounded mb-5"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button
                        className='bg-blue-500 w-24 rounded-lg shadow-lg'
                        onClick={() => handleSubmit(data)}>Submit</button>
                </div>
            </div>
        </div>

    )
}

export default UploadReview
