import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem('studentToken');
    const accessToken = localStorage.getItem('studentToken');


    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

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
    alert('responce is not available')
    if (error.code === "ECONNABORTED") toast.error("This request tooking long to respond", { position: toast.POSITION.TOP_CENTER })
    else if (error.response.status === 403) {
      toast.error(`${error.response.data.message}`, { position: toast.POSITION.TOP_CENTER })
      localStorage.removeItem('token')
      window.location.href = '/studentLogin';

    }
    else {
      toast.error(`${error.response.data.message}`, { position: toast.POSITION.TOP_CENTER })
    }
    return Promise.reject(error);

  }
);

export default instance;