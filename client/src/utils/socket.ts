import { io } from 'socket.io-client';
import { socketURL } from '../APIs/axiosInstance';

export const socket = io(socketURL, { withCredentials: true });
