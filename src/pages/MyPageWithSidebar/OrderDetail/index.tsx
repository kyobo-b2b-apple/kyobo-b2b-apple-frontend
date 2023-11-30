import { useCallback, useEffect, useState } from 'react';
import MyContainer from '../../../components/my/MyContainer';
import OrderInfoBox from './OrderDetailComponents/OrderInfoBox';
import { Spacer } from '../../../components/common';
import DeliveryInfoTexts from './OrderDetailComponents/DeliveryInfoTexts';
import ShipMemo from './OrderDetailComponents/ShipMemo';
import PayPriceText from './OrderDetailComponents/PayPriceText';
import ShipAndPayBox from './OrderDetailComponents/ShipAndPayBox';
import BoxContent from './OrderDetailComponents/BoxContent';
import useMediaPX from '../../../hooks/useMediaPX';
import OrderProductDetails from './OrderDetailComponents/OrderProductDetails';
import { getOrderDetail } from '../../../api/orderApi';
import { useParams } from 'react-router-dom';
import { ShipmentProps } from '../../../interfaces/shipmentProps';
import { OrderItemListProps, OrderItemProps } from '../../../interfaces/orderItemProps';

const OrderDetail = () => {
  const labelSpace = useMediaPX({ desktop: '21px', tablet: '21px', mobile: '19px' });
  const infoSpace = useMediaPX({ desktop: '24px', tablet: '18px', mobile: '19px' });
  const bottomSpace = useMediaPX({ desktop: '83px', tablet: '87px', mobile: '51px' });
  const { orderId } = useParams();
  const [shipment, setShipment] = useState<ShipmentProps>();
  const [data, setData] = useState<OrderItemListProps>();
  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);

  const getData = useCallback(async (orderId: string) => {
    const result = await getOrderDetail(orderId);
    setData(result.data.result);
    setShipment(result.data.result.shipment);
    setOrderItems(result.data.result.orderItems);
  }, []);

  useEffect(() => {
    if (orderId) {
      getData(orderId);
    }
  }, [orderId, getData]);

  const finalPrice = () => {
    if (data) {
      return data.orderAmount - data.discountAmount;
    } else {
      return 0;
    }
  };

  return (
    <MyContainer label="주문 상세보기">
      <OrderInfoBox orderCode={data?.orderCode || ''} />
      <Spacer height="15px" />
      <OrderProductDetails label="주문 상품 내역" orderItems={orderItems} />
      <Spacer height="15px" />

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

        <BoxContent label="결제 상세">
          <Spacer height={labelSpace} />
          <PayPriceText label="주문금액" value={data?.orderAmount || 0} />
          <PayPriceText label="상품금액" value={data?.productAmount || 0} />
          <PayPriceText label="배송비" value={data?.deliveryFee || 0} />
          <PayPriceText label="쿠폰할인" value={data?.discountAmount || 0} />
          <PayPriceText label="최종 결제금액" value={finalPrice()} isFinal={true} />
        </BoxContent>
      </ShipAndPayBox>
      <Spacer height={bottomSpace} />
    </MyContainer>
  );
};
export default OrderDetail;
