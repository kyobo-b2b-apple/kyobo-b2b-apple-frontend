import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Card = ({ children }: PropsWithChildren) => {
  return <CardWrapper>{children}</CardWrapper>;
};
export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: ${(props) => props.theme.color.grey80};

   @media screen and (min-width: 768px) {
    padding: 20px 13px 24px 20px;
    gap: 13px 0px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    padding: 20px 16px 24px 20px;
    gap: 13px 0px;
  }
  @media screen and (max-width: 479px) {
    padding: 22px 12px 17px 15px;
    gap: 18px 0px;
  }
`;
