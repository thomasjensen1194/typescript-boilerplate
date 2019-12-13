import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CenterText, LargeText } from 'styles/text';

export interface RegisteredProps {}

const Registered: React.SFC<RegisteredProps> = () => {
  const [countDown, setCountdown] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const count = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      history.push('/');
    }, 5000);

    return () => clearInterval(count);
  }, [history]);

  return (
    <CenterText>
      <LargeText>
        Du er nu registreret. Du bliver nu logget ind, og videresendt til forsiden om{' '}
        <b>{countDown} sekunder</b>
      </LargeText>
    </CenterText>
  );
};

export default Registered;
