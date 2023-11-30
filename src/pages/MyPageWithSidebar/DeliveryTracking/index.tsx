import { useEffect, useCallback, useState } from 'react';
import { Spacer, Text } from '../../../components/common';
import styled from 'styled-components';
import ProgressBar from '../../../components/ProgressBar';
import { CardContainer } from '../../../layout/CardLayout';
import DeliveryStateList from './deliveryTrackingComponents/DeliverStateLIst';
import MyContainer from '../../../components/my/MyContainer';
import { getShipmentDetail } from '../../../api/orderApi';
import { useParams } from 'react-router-dom';
import useMediaFont from '../../../hooks/useMediaFont';
import ShipAndPayBox from '../OrderDetail/OrderDetailComponents/ShipAndPayBox';
import BoxContent from '../OrderDetail/OrderDetailComponents/BoxContent';
import useMediaPX from '../../../hooks/useMediaPX';
import DeliveryInfoTexts from '../OrderDetail/OrderDetailComponents/DeliveryInfoTexts';
import ShipMemo from '../OrderDetail/OrderDetailComponents/ShipMemo';
import { ShipmentProps } from '../../../interfaces/shipmentProps';
import PayPriceText from '../OrderDetail/OrderDetailComponents/PayPriceText';
import formatOrderState from '../../../utils/formatOrderState';

const DeliveryTracking = () => {
  const { orderCode } = useParams();
  const statusFont = useMediaFont({ desktop: 'H2', tablet: 'H2', mobile: 'H3' });
  const labelSpace = useMediaPX({ desktop: '21px', tablet: '21px', mobile: '19px' });
  const infoSpace = useMediaPX({ desktop: '24px', tablet: '18px', mobile: '19px' });

  const [shipment, setShipment] = useState<ShipmentProps>();
  const [orderState, setOrderState] = useState('');

  const getData = useCallback(async (orderId: string) => {
    const result = await getShipmentDetail(orderId);
    setShipment(result.data.result.shipment);
    setOrderState(result.data.result.orderState);
  }, []);

  useEffect(() => {
    if (orderCode) {
      getData(orderCode);
    }
  }, [orderCode, getData]);

  return (
    <MyContainer label="배송조회">
      <DeliveryCardContainer>
        <Text $fontType={statusFont} color="white">
          현재 배송현황
        </Text>
        <Spacer height={22} />
        <ProgressBar currentStep={formatOrderState(orderState)} totalSteps={3} />
      </DeliveryCardContainer>
      <Spacer height={10} />
      <ShipAndPayBox>
        <BoxContent label="배송지 정보">
          <Spacer height={labelSpace} />
          <DeliveryInfoTexts
            name={shipment?.recipientName || ''}
            phone={shipment?.recipientPhoneNumber || ''}
            address={shipment?.address || ''}
            addressDetail={shipment?.addressDetail || ''}
          />
          <Spacer height={infoSpace} />
          <ShipMemo text={shipment?.memo || ''} />
        </BoxContent>
        <BoxContent label="배송 정보">
          <Spacer height={labelSpace} />
          <PayPriceText label="택배사" text={shipment?.shippingCompanyName} />
          <PayPriceText label="전화번호" text={shipment?.recipientPhoneNumber} />
          {shipment?.invoiceNumber && <PayPriceText label="송장번호" text={shipment.invoiceNumber} />}
        </BoxContent>
      </ShipAndPayBox>
      <Spacer height={15} />
      <DelivertStateContainer>
        <DeliveryStateList data={shipment?.deliveryStatusList || []} />
      </DelivertStateContainer>
    </MyContainer>
  );
};

export default DeliveryTracking;

const DeliveryCardContainer = styled(CardContainer)`
  padding: 26px 31px 47px;
`;

const DelivertStateContainer = styled(CardContainer)`
  padding: 0px;
  overflow: hidden;
`;
