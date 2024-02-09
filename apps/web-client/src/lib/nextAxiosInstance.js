import axios from 'axios';

let token;

if (typeof window !== 'undefined') {
  token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
}

const nextAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? 'Bearer ' + token : '',
  },
});

export default nextAxiosInstance;
