import { jwtDecode } from 'jwt-decode'

const decodeToken = (token) =>{
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

export  { decodeToken };