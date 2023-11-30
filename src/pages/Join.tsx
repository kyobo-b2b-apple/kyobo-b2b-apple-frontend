import { FC } from 'react';
import React from 'react';

import styled from 'styled-components';
import JoinMain from '../components/join/JoinMain';

interface JoinProps {}

const Join: FC<JoinProps> = () => {
  return (
    <JoinWrap>
      <JoinMain />
    </JoinWrap>
  );
};

const JoinWrap = styled.div`
  display: flex;
`;

export default Join;
