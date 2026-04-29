import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

interface chatListState {
  totalusers: User[];
  currentUser: User | null;
}
const initialState: chatListState = {
  totalusers: [],
  currentUser: null,
};

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    setChatList: (state, action) => {
      state.totalusers = action.payload;
    },
    setCurrentChat: (state, action) => {
      let id = action.payload;
      let user = state.totalusers.find((u) => u._id === id);
      if (user) {
        state.currentUser = user;
      }
    },
    pushToChatList: (state, action) => {
      state.totalusers.push(action.payload);
    },
  },
});
export const { setChatList, setCurrentChat, pushToChatList } =
  chatListSlice.actions;
export default chatListSlice;

// documentation-- AI generated
/**
 * Chat list slice for managing chat and user data
 *
 * @property {Array} totalusers - Array of all users in the chat list
 * @property {Object} currentUser - Currently selected user object
 */

/**
 * Sets the complete chat list with all users
 * @param {Object} state - Current slice state
 * @param {Object} action - Redux action object
 * @param {Array<{_id: string, ...}>} action.payload - Array of user objects to set as the chat list
 * @example
 * dispatch(setChatList([{ _id: '1', name: 'John' }, { _id: '2', name: 'Jane' }]))
 */

/**
 * Sets the current active chat user by user ID
 * @param {Object} state - Current slice state
 * @param {Object} action - Redux action object
 * @param {string} action.payload - User ID to set as current user
 * @example
 * dispatch(setCurrentChat('user123'))
 */

/**
 * Adds a new user to the chat list
 * @param {Object} state - Current slice state
 * @param {Object} action - Redux action object
 * @param {Object} action.payload - User object to add { _id: string, ...properties }
 * @example
 * dispatch(pushToChatList({ _id: '3', name: 'Bob', email: 'bob@example.com' }))
 */
