import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../common';

interface OrderNumberProps {
  orderNumber: string;
}

const OrderNumberText: FC<OrderNumberProps> = ({ orderNumber }) => {
  return (
    <Wrapper>
      <Text $fontType="Body05" color="grey30">
        주문번호: {orderNumber}
      </Text>
    </Wrapper>
  );
};
export default OrderNumberText;

const Wrapper = styled.div`
  @media screen and (min-width: 480px)  {
    display: flex;
    margin-left: auto;
  }
  @media screen and (max-width: 479px) {
    margin-top: 5px;
  }
`;
