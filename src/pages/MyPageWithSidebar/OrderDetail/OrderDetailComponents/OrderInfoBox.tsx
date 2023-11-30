import styled from 'styled-components';
import { Text } from '../../../../components/common';
import CommonButton, { ButtonType } from '../../../../components/common/Button';
import { SmallButton02 } from '../../../../styles/buttonStyle';
import { useNavigate } from 'react-router-dom';

interface OrderInfoBoxProps {
  orderCode: string;
}

const OrderInfoBox = ({ orderCode }: OrderInfoBoxProps) => {
  const navigate = useNavigate();
  const handleDeliveryClick = () => {
    navigate(`/my-page/delivery-tracking/${orderCode}`);
  };

  return (
    <BoxWrapper>
      <InfoText $fontType="Body03" color="white">
        주문번호
      </InfoText>
      <InfoText $fontType="Body03" color="blue10">
        {orderCode}
      </InfoText>
      <DeliveryButton type={ButtonType.Primary} padding={0} onClick={handleDeliveryClick}>
        배송조회
      </DeliveryButton>
    </BoxWrapper>
  );
};
export default OrderInfoBox;

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.theme.color.grey80};

  @media screen and (min-width: 480px)  {
    padding: 7px 11px 7px 17px;
    gap: 0px 13px;
  }
  @media screen and (max-width: 479px) {
    padding: 7px 10px 7px 13px;
    gap: 0px 14px;
  }
`;

const InfoText = styled(Text)`
  line-height: 13px;
  letter-spacing: -0.7px;
`;

const DeliveryButton = styled(CommonButton)`
  ${SmallButton02};
  margin-left: auto;
`;
