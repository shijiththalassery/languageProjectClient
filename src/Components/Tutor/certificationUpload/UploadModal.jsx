import React, { useEffect, useState } from 'react'
import { tutorVerification, languageList } from '../../../Services/Apis'
import axiosInstance from "../../../api/axiosInstance"
function UploadModal({ visible, onClose }) {

    const timeSlot = [9.00, 10.00, 11.00, 12.00,
        13.00, 14.00, 15.00, 16.00, 17.00, 18.00,
        19.00, 20.00, 21.00, 22.00,]

    const [startTime, setStartTime] = useState(6.00)
    const [endTime, setEndTime] = useState(23.00)
    const [language, setLanguge] = useState('')
    const [selectedFileName, setSelectedFileName] = useState('No file selected');
    const [file, setFile] = useState(null);
    console.log(file)

    const [languages, setLanguageList] = useState({});

    useEffect(() => {
        const fetchLanguageList = async () => {
            try {
                //  const response = await languageList();
                    const response = await axiosInstance.get(`/languageList`)
                setLanguageList(response.data.language);
            } catch (error) {
                console.error("Error fetching language list:", error);
            }
        };

        fetchLanguageList();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setFile(reader.result);
                setSelectedFileName(selectedFile.name);
            }
            setFile(selectedFile)
        } else {
            setSelectedFileName('No file selected');
        }
    };

    if (!visible) return null;
    const handleOnSubmit = async (e) => {
        const tutorEmail = localStorage.getItem('tutorEmail');
        const formData = new FormData();
        formData.append('email',tutorEmail)
        console.log(formData, 'this is form data')
        if (formData) {
            //tutorVerification(formData)
            await axiosInstance.post(`/tutorVerification`,{
               email:tutorEmail 
            })
            onClose()
        }

    }
    const handleOnClose = async (e) => {
        if (e.target.id === 'container') onClose()
    }
    console.log(typeof (selectedFileName), 'this is the type of the fiel name')
    let fileName = selectedFileName
    if (fileName.length > 9) {
        fileName = fileName.substring(0, 9) + "...";
    }

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className="  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className='bg-blue-200'>
                <form>
                    <div className="bg-white p-2 rounded w-72">
                        <h1 className="font-semibold text-center text-xl text-gray-700">
                            Welcome back
                        </h1>
                        <p className="text-center text-gray-700 mb-5">Please press verify button to send verification message</p>

                        <div className="flex space-x-4 ">
                            <div className="flex flex-col  " style={{ order: 1 }}>

                            </div>
                            <div className="flex flex-col">

                            </div>
                        </div>
                        <div >
                        </div>
                        <div className="flex flex-col mt-2">

                        </div>
                        <div className="child-div mb-2">

                        </div>
                        <div className="text-center">
                            <button onClick={handleOnSubmit} className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                Verify
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadModal;
