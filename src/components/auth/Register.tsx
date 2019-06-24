import React, { useState } from "react";
import { Segment, Message } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { client } from "../../config/apolloClient";
import { CREATE_USER } from "../../queries/auth";
import { User } from "../../types/auth";
import { useDispatch } from "react-redux";
import { login } from "redux/actions/auth";
import { RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

export interface RegisterProps extends RouteComponentProps {}

const Register: React.FC<RegisterProps> = ({ history }) => {
  const [, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    repeatPassword: ""
  });
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name: keyof User | string, value: string) => {
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleRegister = async () => {
    // Validation
    if (
      !user.email ||
      !user.username ||
      !user.password ||
      !user.repeatPassword
    ) {
      return setErrorMessage("Du skal opgive alle værdier");
    }
    if (user.password !== user.repeatPassword) {
      return setErrorMessage("Kodeord skal være det samme");
    }
    const emailRegex = /[[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailRegex.test(user.email)) {
      return setErrorMessage("Emailen er ikke en korrekt email");
    }

    try {
      const { data: token } = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          username: user.username,
          password: user.password,
          email: user.email
        }
      });

      setCookie("user", token.createUser);
      await dispatch(login(token.createUser));
      history.push("/registered");
    } catch (err) {
      if (err.message.includes("ER_DUP_ENTRY"))
        setErrorMessage("Brugernavn eller email er allerede registreret");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh"
      }}
    >
      <Segment textAlign="center" style={{ width: "400px" }}>
        <h1>Register</h1>
        <Form onSubmit={handleRegister}>
          <Form.Input
            required
            onChange={(e, { name, value }) => handleChange(name, value)}
            value={user.username}
            icon="user"
            iconPosition="left"
            placeholder="Brugernavn"
            name="username"
          />
          <Form.Input
            required
            onChange={(e, { name, value }) => handleChange(name, value)}
            name="email"
            icon="at"
            iconPosition="left"
            placeholder="Email"
          />
          <Form.Input
            required
            onChange={(e, { name, value }) => handleChange(name, value)}
            name="password"
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Kodeord"
          />
          <Form.Input
            required
            onChange={(e, { name, value }) => handleChange(name, value)}
            icon="key"
            iconPosition="left"
            placeholder="Gentag Kodeord"
            name="repeatPassword"
            type="password"
          />
          <Form.Button color="green" type="submit">
            Register
          </Form.Button>
          {errorMessage && <Message color="red">{errorMessage}</Message>}
        </Form>
      </Segment>
    </div>
  );
};

export default Register;
