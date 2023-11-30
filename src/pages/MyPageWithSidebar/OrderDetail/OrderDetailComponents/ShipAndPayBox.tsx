import styled from 'styled-components';
import { PropsWithChildren } from 'react';

const ShipAndPayBox = ({ children }: PropsWithChildren) => {
  return <ShipAndPayWrapper>{children}</ShipAndPayWrapper>;
};
export default ShipAndPayBox;

const ShipAndPayWrapper = styled.div`
  display: flex;

  @media screen and (min-width: 480px)  {
    border-radius: 8px;
    background: ${(props) => props.theme.color.grey80};
    padding: 38px 34px 25px 26px;

    & > *:not(:last-child) {
      border-right: 2px solid #555;
      padding-right: 22px;
      margin-right: 22px;
    }
  }

  @media screen and (max-width: 479px) {
    flex-direction: column;
    gap: 15px 0px;
  }
`;
