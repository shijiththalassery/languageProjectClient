import React,{useState} from 'react'
import AdminNavbar from './AdminNavbar'
import { addLanguage } from '../../Services/Apis';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AdminLanguage() {
    const [language, setLanguage] = useState('');
    const jsonData = {
        language:language,
    }
    const handleSubmit = async(e) => {
        try {
            const languageData = JSON.stringify(jsonData);
            const response = await addLanguage(languageData);
            if(response.data.message){
                toast.success(response.data.message)
                setLanguage('');
            }else{
                toast.error('something wrong')
            }
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div>
            <AdminNavbar />
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded-md w-96">
                    <div className="text-center mx-auto">
                        <h1 className="text-2xl font-semibold mb-4">Add Language</h1>
                    </div>

                    <input
                        className="w-full border rounded-md p-2 mb-4"
                        type="text"
                        placeholder="Enter Language Name"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        type="submit" onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AdminLanguage;
