import axios from 'axios';
const HOST = 'http://localhost';
export const BASEURL = `${HOST}:8080`;

export const NodeInstance = axios.create({
  baseURL: `${HOST}:8080`,
  timeout: 9000,
});

export const SocketInstance = axios.create({
  baseURL: `${HOST}:8080`,
  timeout: 9000,
});

export const socketURL = `${HOST}:8080`;
