import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface CardContentProps extends PropsWithChildren {
  columnGap?: number;
}

const CardContent = ({ children, columnGap = 17 }: CardContentProps) => {
  return <ContentWrapper columnGap={columnGap}>{children}</ContentWrapper>;
};
export default CardContent;

const ContentWrapper = styled.div<CardContentProps>`
  display: flex;

  @media screen and (min-width: 480px)  {
    gap: ${({ columnGap }) => `0px ${columnGap}px`};
  }
  @media screen and (max-width: 479px) {
    gap: 0px 6px;
  }
`;
