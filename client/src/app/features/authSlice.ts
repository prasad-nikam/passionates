import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      _id: null,
      firstname: null,
      lastname: null,
      email: null,
      interests: [],
      ProfilePicture: null,
      userId: null,
      socketID: null,
    },
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

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
