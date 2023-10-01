
import axios from "axios";

export const commenRequest = async(method, url, body, header)=>{
    const config = {
        method,
        url,
        headers:header?header 
        :{
            "Content-Type":"application/json"
        },
        data:body
    }
    //axios instance
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        console.log(error,'this is error')
        return error
    })
}