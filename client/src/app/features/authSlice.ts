import { createSlice } from '@reduxjs/toolkit';
interface AuthUser {
  _id: string | null;
  name: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  interests: string[];
  freinds: string[];
  userId: string | null;
  socketID: string | null;
  bio: string | null;
  posts: unknown[];
  profilePic: string | null;
}

interface AuthState {
  user: AuthUser;
}

const initialState: AuthState = {
  user: {
    _id: null,
    name: null,
    firstname: null,
    lastname: null,
    email: null,
    interests: [],
    freinds: [],
    userId: null,
    socketID: null,
    bio: null,
    posts: [],
    profilePic: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setSocket: (state, action) => {
      state.user.socketID = action.payload;
    },
  },
});

export const { setUser, setSocket } = authSlice.actions;

export default authSlice;

// interface UserProfile {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   interests: string[];
//   ProfilePicture?: string;
//   userId?: string;
// }
