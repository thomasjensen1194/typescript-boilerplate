import React, { useEffect } from "react";
import "./App.css";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import Login from "./components/auth/Login";
import Frontpage from "./components/Frontpage";
import Header from "./components/layout/Header";
import "semantic-ui-css/semantic.min.css";

export interface AppProps extends RouteComponentProps<any> {
  user?: object;
}

const App: React.FC<AppProps> = ({ user, history, location }) => {
  useEffect(() => {
    if (!user) history.push("/login");
  }, [location.pathname, history, user]);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Frontpage} />
      </Switch>
    </div>
  );
};

export default withRouter<AppProps>(App);
