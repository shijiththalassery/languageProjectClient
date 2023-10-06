
import {commenRequest} from "./ApiCalls";
import { BACKEND_URL } from "./helper";

export const registerFunction = async(data)=>{
    return await commenRequest("POST",`${BACKEND_URL}/student/register`,data)
}

// export const sendOtp = async(data)=>{
//     return await commenRequest("POST",`${BACKEND_URL}/sendOtp`,data)
// }

export const checkUser = async (data) => {
    return await commenRequest("POST",`${BACKEND_URL}/checkUser`,data)
}

export const userRegistration = async (data)=>{
    return await commenRequest("POST",`${BACKEND_URL}/userRegistration`,data)
}

export const TutorRegistration = async (data)=>{
    return await commenRequest("POST",`${BACKEND_URL}/TutorRegistration`,data)
}

export const tutorOtpVerification = async (data)=>{
    return await commenRequest("POST",`${BACKEND_URL}/tutorOtpVerification`,data)
}

export const userLogin = async(data) => {
    return await commenRequest("POST",`${BACKEND_URL}/userLogin`,data)
}

export const adminLogin = async(data) => {
    return await commenRequest('POST',`${BACKEND_URL}/adminLogin`,data)
}

export const tutorVerification = async(data) => {
    return await commenRequest('POST',`${BACKEND_URL}/tutorVerification`,data)
}

export const addLanguage = async(data) => {
    return await commenRequest('POST',`${BACKEND_URL}/addLanguage`,data)
   
}

export const languageList = async() =>{
    return await commenRequest('GET',`${BACKEND_URL}/languageList`)
}

export const verificationList = async() => {
    return await commenRequest('GET',`${BACKEND_URL}/verificationList`) 
};


export const tutorProfileEdit = async(data) => {
    return await commenRequest('POST',`${BACKEND_URL}/tutorProfileEdit`,data)
}

export const tutorPremuimSetUp = async(data) => {
    return await commenRequest('POST',`${BACKEND_URL}/tutorPremuimSetUp`,data)
}

export const tutorList = async() =>{
    return await commenRequest('GET',`${BACKEND_URL}/tutorList`)
}

export const TutorDetail = async() =>{
    return await commenRequest('GET',`${BACKEND_URL}/TutorDetail/${id}`)
}

