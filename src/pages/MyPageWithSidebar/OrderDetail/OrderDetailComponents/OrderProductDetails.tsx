import styled from 'styled-components';
import { Text, Spacer } from '../../../../components/common';
import useMediaPX from '../../../../hooks/useMediaPX';
import ProductDetail from './ProductDetail';
import { OrderItemProps } from '../../../../interfaces/orderItemProps';

interface OrderProductDetailsProps {
  label: string;
  orderItems: OrderItemProps[];
}

const OrderProductDetails = ({ label, orderItems }: OrderProductDetailsProps) => {
  const orderDetailSpace = useMediaPX({ desktop: '20px', tablet: '20px', mobile: '24px' });

  return (
    <ProductDetailsWrapper>
      <Text $fontType="Body03" color="white">
        {label}
      </Text>
      <Spacer height={orderDetailSpace} />
      <DetailsWrapper>
        {orderItems?.map((item) => {
          return <ProductDetail key={item.id} item={item.product} />;
        })}
      </DetailsWrapper>
    </ProductDetailsWrapper>
  );
};
export default OrderProductDetails;

const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 19px 16px 23px 17px;
  border-radius: 8px;
  background: ${(props) => props.theme.color.grey80};
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 480px)  {
    gap: 23px 0px;

    & > *:not(:last-child) {
      border-bottom: 1px solid #656565;
      padding-bottom: 23px;
    }
  }
  @media screen and (max-width: 479px) {
    gap: 14px 0px;

    & > *:not(:last-child) {
      border-bottom: 1px solid #656565;
      padding-bottom: 14px;
    }
  }
`;
