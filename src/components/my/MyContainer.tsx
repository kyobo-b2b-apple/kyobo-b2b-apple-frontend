import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Spacer } from '../common';
import ContainerTitle from './ContainerTitle';

interface MyContainerProps extends PropsWithChildren {
  label: string;
}

const MyContainer: FC<MyContainerProps> = ({ label, children }) => {
  return (
    <Container>
      <ContainerTitle label={label} />
      <Spacer height="19px" />
      {children}
    </Container>
  );
};
export default MyContainer;

const Container = styled.div`
   @media screen and (min-width: 768px) {
    border-left: 1px solid #656565;
    max-width: 661px;
    padding: 36px 0px 110px 23px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    padding: 36px 20px 113px 20px;
  }
  @media screen and (max-width: 479px) {
    padding: 36px 20px 118px 20px;
  }
`;
