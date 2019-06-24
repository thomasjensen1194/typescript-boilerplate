import React, { useState } from "react";
import { Segment, Form, Divider, Message } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { LOGIN } from "queries/auth";
import { login } from "redux/actions/auth";
import { client } from "config/apolloClient";
import { User } from "types/auth";

export interface LoginProps extends RouteComponentProps<any> {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [, setCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!user.username || !user.password) {
      return setErrorMessage("Please provide all fields");
    }
    try {
      const { data: jwt } = await client.mutate({
        mutation: LOGIN,
        variables: {
          username: user.username,
          password: user.password,
          email: user.email
        }
      });
      setCookie("user", jwt.login);
      await dispatch(login(jwt.login));
      history.push("/");
    } catch (err) {
      return setErrorMessage("User not found");
    }
  };

  const handleChange = (name: keyof User, value: string) => {
    setUser(prevUser => ({ ...prevUser, [name]: value }));
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
      <Segment style={{ width: "400px" }} textAlign="center">
        <Form onSubmit={handleLogin}>
          <Form.Input
            required
            icon="user"
            iconPosition="left"
            placeholder="Brugernavn"
            name="username"
            value={user.username}
            onChange={(e, { name, value }) => handleChange(name, value)}
          />
          <Form.Input
            required
            icon="key"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={(e, { name, value }) => handleChange(name, value)}
          />
          <Form.Button type="submit" fluid color="blue">
            Login
          </Form.Button>
          <Divider hidden />
          <Form.Button
            onClick={() => history.push("/register")}
            size="small"
            basic
          >
            Register
          </Form.Button>
        </Form>
        {errorMessage && <Message color="red">{errorMessage}</Message>}
      </Segment>
    </div>
  );
};

export default Login;
