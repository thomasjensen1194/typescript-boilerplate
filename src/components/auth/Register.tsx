import React, { useState } from 'react';
import { Segment, Message } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import { Formik, FormikValues } from 'formik';
import User from 'classes/User';
import Registered from './Registered';

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [registered, setRegistered] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (values: FormikValues) => {
    const { username, password, email, repeatPassword } = values;
    // Validation
    if (!email || !username || !password || !repeatPassword) {
      return setErrorMessage('Du skal opgive alle værdier');
    }
    if (password !== repeatPassword) {
      return setErrorMessage('Kodeord skal være det samme');
    }
    const emailRegex = /[[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailRegex.test(email)) {
      return setErrorMessage('Emailen er ikke en korrekt email');
    }

    try {
      setRegisterLoading(true);
      await User.createUser({ username, password, email });
      setRegistered(true);
    } catch (err) {
      setRegisterLoading(false);
      if (err.message.includes('ER_DUP_ENTRY'))
        setErrorMessage('Brugernavn eller email er allerede registreret');
    }
  };

  if (registered) return <Registered />;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh'
      }}
    >
      <Segment textAlign="center" style={{ width: '400px' }}>
        <h1>Register</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
          }}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ handleChange, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Input
                name="username"
                required
                onChange={handleChange}
                value={values.username}
                icon="user"
                iconPosition="left"
                placeholder="Brugernavn"
              />
              <Form.Input
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                icon="at"
                iconPosition="left"
                placeholder="Email"
              />
              <Form.Input
                name="password"
                value={values.password}
                onChange={handleChange}
                required
                type="password"
                icon="key"
                iconPosition="left"
                placeholder="Kodeord"
              />
              <Form.Input
                name="repeatPassword"
                onChange={handleChange}
                value={values.repeatPassword}
                required
                icon="key"
                iconPosition="left"
                placeholder="Gentag Kodeord"
                type="password"
              />
              <Form.Button loading={registerLoading} disabled={registerLoading} color="green">
                Register
              </Form.Button>
            </Form>
          )}
        </Formik>
        {errorMessage && <Message color="red">{errorMessage}</Message>}
      </Segment>
    </div>
  );
};

export default Register;
