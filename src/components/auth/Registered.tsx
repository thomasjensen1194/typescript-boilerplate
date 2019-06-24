import React, { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";

export interface RegisteredProps extends RouteComponentProps {}

const Registered: React.SFC<RegisteredProps> = ({ history }) => {
  const [countDown, setCountdown] = useState(7);

  useEffect(() => {
    const count = setInterval(() => {
      setCountdown(prevCount => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      history.push("/");
    }, 7000);

    return () => clearInterval(count);
  }, [history]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh"
      }}
    >
      <Message
        color="green"
        style={{ textAlign: "center", maxWidth: "400px", fontSize: "large" }}
      >
        Du er nu registreret. Du bliver nu logget ind, og videresendt til
        forsiden om <b>{countDown} sekunder</b>
      </Message>
    </div>
  );
};

export default Registered;
