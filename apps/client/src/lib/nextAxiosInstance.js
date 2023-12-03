import axios from 'axios';

let token;

if (typeof window !== 'undefined') {
  token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
}

const nextAxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? 'Bearer ' + token : '',
  },
});

export default nextAxiosInstance;
