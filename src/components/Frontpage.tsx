import React from 'react';
import { LargeText, CenterText } from 'styles/text';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  return (
    <CenterText>
      <LargeText>This is the frontpage</LargeText>
    </CenterText>
  );
};

export default Frontpage;
