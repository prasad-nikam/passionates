import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import chatListSlice from './features/chatListSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chatList: chatListSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
