import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/paquetes', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;