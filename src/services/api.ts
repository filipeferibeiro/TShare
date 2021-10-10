import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tshare-backend.herokuapp.com',
    headers: {
        "Content-type": "application/json"
      }
});

export default api;