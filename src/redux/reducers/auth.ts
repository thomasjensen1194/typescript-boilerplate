import { createReducer } from "redux-starter-kit";
import * as types from "../actions/types";

export interface authState {
  user?: { username: string; id: number; email: string; iat: number } | null;
}

const initialState: authState = { user: null };

const authReducer = createReducer(initialState, {
  [types.LOGIN.type]: (state, action) => {
    state.user = action.payload.user;
  },
  [types.LOGOUT.type]: (state, action) => {
    state.user = null;
  }
});

export default authReducer;
