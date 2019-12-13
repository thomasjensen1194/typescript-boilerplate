import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import User from 'classes/User';

export interface LogoutProps extends RouteComponentProps {}

const Logout: React.FC<LogoutProps> = ({ history }) => {
  useEffect(() => {
    const logout = async () => {
      await User.logout();
      history.push('/login');
    };
    logout();
  }, [history]);

  return null;
};

export default Logout;
