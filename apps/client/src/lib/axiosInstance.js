import axios from 'axios';

let token;

if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? 'Bearer ' + token : '',
  },
});

export default axiosInstance;
