import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL 
  // baseURL:`https://www.speaksphere.shop`
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('tutorToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    console.log(config,'this is config of tutor')
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.code==="ECONNABORTED") toast.error("This request tooking long to respond",{position:toast.POSITION.TOP_CENTER})
   else if (error.response.status === 403) {
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
      localStorage.removeItem('token')
      window.location.href = '/login';

    }
    else{
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
    }
    return Promise.reject(error);

  }
);

export default instance;