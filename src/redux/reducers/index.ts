import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
