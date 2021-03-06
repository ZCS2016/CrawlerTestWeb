import axios from 'axios'

//baseURL: 'http://192.168.2.123:9999',
//baseURL: 'http://172.27.49.91:9999',
const http = axios.create({
  baseURL: 'http://172.27.49.91:9999',
  timeout: 1000 * 60,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

http.baseURL = 'http://172.27.49.91:9999';

http.interceptors.response.use(res =>{
  return res.data;
});

export default http
