import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/actions/types";

export interface LogoutProps extends RouteComponentProps {}

const Logout: React.FC<LogoutProps> = ({ history }) => {
  const [, , removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  useEffect(() => {
    removeCookie("user");
    dispatch(LOGOUT());
    history.push("/login");
  }, [dispatch, history, removeCookie]);

  return null;
};

export default Logout;
