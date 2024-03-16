import axios from 'axios';
const HOST = "http://localhost"
export const NodeInstance = axios.create({
    baseURL: `${HOST}:8080`,
    timeout: 9000,
});

export const SocketInstance = axios.create({
    baseURL: `${HOST}:3000`,
    timeout: 9000,
});

export const socketURL = `${HOST}:3000`;