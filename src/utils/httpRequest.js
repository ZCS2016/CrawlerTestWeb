import axios from 'axios'

const http = axios.create({
  timeout: 1000 * 60,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

http.interceptors.response.use(res =>{
  return res.data;
});

export default http
