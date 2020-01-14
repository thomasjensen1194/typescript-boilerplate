import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Frontpage from './components/Frontpage';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Layout from 'components/layout/Layout';
import User from 'classes/User';
import './App.scss';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await User.fetch();
      setFetching(false);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          {fetching && <p>Loading...</p>}
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Frontpage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
