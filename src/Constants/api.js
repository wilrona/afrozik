
import axios from 'axios';


const BASE_URL = 'http://afro.adorationdivine.com/api';

axios.interceptors.request.use(request => {
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});


const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        common : {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type' : 'application/json'
        },
        post : {
          'Content-Type' : 'application/json;charset=UTF-8'
        }
      }
});

export {BASE_URL, Api, axios}