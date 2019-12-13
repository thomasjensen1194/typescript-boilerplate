import React, { useEffect } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Login from './components/auth/Login';
import Frontpage from './components/Frontpage';
import Register from './components/auth/Register';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './components/auth/Logout';
import Layout from 'components/layout/Layout';
import './App.scss';
import User from 'classes/User';
import authReducer from 'redux/reducers/auth';
import { ReduxState } from 'redux/reducers';

export interface AppProps extends RouteComponentProps<any> {
  user?: object;
}

const App: React.FC<AppProps> = ({ history, location }) => {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    if (location.pathname === '/register') return;
    if (!user) {
      if (cookies.user) {
        const user = User.decode(cookies.user);
        dispatch(authReducer.actions.login(user));
      } else {
        history.push('/login');
      }
    }
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
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
