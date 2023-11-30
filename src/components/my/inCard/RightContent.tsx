import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface RightContentProps extends PropsWithChildren {
  rowGap?: number;
}

const RightContent = ({ rowGap = 4, children }: RightContentProps) => {
  return <RightWrapper rowGap={rowGap}>{children}</RightWrapper>;
};
export default RightContent;

const RightWrapper = styled.div<RightContentProps>`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 480px)  {
    max-width: 376px;
    gap: ${({ rowGap }) => `${rowGap}px 0px`};
  }
  @media screen and (max-width: 479px) {
    width: 100%;
    gap: 4px 0px;
  }
`;
