import axios from 'axios';
import { getToken } from './token';

const base_url = 'http://localhost:8001'
const token = getToken();

const myApiClient = axios.create({
    baseURL: base_url,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token?`Bearer ${token}`:''
    }
});

  export default myApiClient