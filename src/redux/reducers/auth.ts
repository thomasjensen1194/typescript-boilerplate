import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'classes/User';

const initialState = { user: null as User | null };

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export default authReducer;
