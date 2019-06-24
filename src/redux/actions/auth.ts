import { LOGIN as loginAction } from "./types";
import jwtDecode from "jwt-decode";

export const login = (jwt: string) => async (dispatch: Function) => {
  try {
    const decoded = jwtDecode(jwt);
    dispatch(loginAction({ user: decoded }));
  } catch (err) {
    console.log(err);
  }
};
