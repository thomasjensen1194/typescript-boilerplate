import React, { useEffect } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import Login from "./components/auth/Login";
import Frontpage from "./components/Frontpage";
import Register from "./components/auth/Register";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/actions/auth";
import Logout from "./components/auth/Logout";
import Registered from "components/auth/Registered";
import Layout from "components/layout/Layout";
import "./App.scss";

export interface AppProps extends RouteComponentProps<any> {
  user?: object;
}

const App: React.FC<AppProps> = ({ history, location }) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    if (location.pathname === "/register") return;
    if (!user) {
      if (cookies.user) {
        dispatch(login(cookies.user));
      } else {
        history.push("/login");
      }
    }
  }, [location.pathname, history, user, cookies.user, dispatch]);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/registered" component={Registered} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Frontpage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default withRouter(App);
