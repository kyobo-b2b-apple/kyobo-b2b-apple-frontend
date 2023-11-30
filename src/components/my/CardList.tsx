import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const CardList = ({ children }: PropsWithChildren) => {
  return <CardListWrapper>{children}</CardListWrapper>;
};
export default CardList;

const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0px;
  margin-top: 18px;

   @media screen and (min-width: 768px) {
    margin-bottom: 60px;
  }
  @media screen and (min-width: 479px) and (max-width: 767px) {
    margin-bottom: 54px;
  }
  @media screen and (max-width: 479px) {
    margin-bottom: 40px;
  }
`;
