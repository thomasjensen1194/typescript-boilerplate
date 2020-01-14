import React, { useState } from 'react';
import { Segment, Form, Divider, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { Formik, FormikValues } from 'formik';
import User from 'classes/User';
import { Button } from 'semantic-ui-react';

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (values: FormikValues) => {
    const { username, password, email } = values;
    if (!username || !password) {
      return setErrorMessage('Please provide all fields');
    }

    try {
      setLoginLoading(true);
      await User.login({ username, password, email });
      history.push('/');
    } catch (err) {
      setLoginLoading(false);
      return setErrorMessage('User not found');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh'
      }}
    >
      <Segment style={{ width: '400px' }} textAlign="center">
        <Formik
          onSubmit={(values) => handleLogin(values)}
          initialValues={{
            username: '',
            password: '',
            email: ''
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={() => handleSubmit()}>
              <Form.Input
                name="username"
                value={values.username}
                onChange={(e) => handleChange(e)}
                required
                icon="user"
                iconPosition="left"
                placeholder="Brugernavn"
              />
              <Form.Input
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e)}
                required
                icon="key"
                iconPosition="left"
                type="password"
                placeholder="Password"
              />
              <Form.Button
                loading={loginLoading}
                disabled={loginLoading}
                type="submit"
                fluid
                color="blue"
              >
                Login
              </Form.Button>
              <Divider hidden />
            </Form>
          )}
        </Formik>
        <Button size="small" basic onClick={() => history.push('/register')}>
          Register
        </Button>
        {errorMessage && <Message color="red">{errorMessage}</Message>}
      </Segment>
    </div>
  );
};

export default Login;
