import React from "react";
import { Segment } from "semantic-ui-react";

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  return (
    <Segment>
      <p>This is the frontpage</p>
    </Segment>
  );
};

export default Frontpage;
