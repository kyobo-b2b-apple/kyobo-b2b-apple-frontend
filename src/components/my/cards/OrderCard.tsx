import { useIsOS, OS } from '../../../hooks/useIsOS';
import { useNavigate } from 'react-router-dom';
import PriceAndCount from '../inCard/PriceAndCount';
import ProductNameText from '../inCard/ProductNameText';
import OptionText from '../inCard/OptionText';
import Card from '../inCard/Card';
import ShowDetailButton from '../inCard/ShowDetailButton';
import OrderListButtons from '../inCard/OrderListButtons';
import CardTitle from '../inCard/CardTitle';
import CardContent from '../inCard/CardContent';
import LeftContentImage from '../inCard/LeftContentImage';
import RightContent from '../inCard/RightContent';
import { OrderCardProps } from '../../../interfaces/orderItemProps';

const OrderCard = ({ item, date, orderCode, orderState, orderId }: OrderCardProps) => {
  const isMobile = useIsOS(OS.MOBILE);
  const navigate = useNavigate();

  const handleShowDetailClick = (orderCode: string) => {
    navigate(`/my-page/order-detail/${orderCode}`);
  };

  const handleShippingClick = (orderCode: string) => {
    navigate(`/my-page/delivery-tracking/${orderCode}`);
  };

  const handleReviewClick = () => {
    navigate('/my-page/product-review');
  };

  return (
    <Card>
      <CardTitle label={date + ' 주문'}>
        <ShowDetailButton onClick={() => handleShowDetailClick(orderCode)} />
      </CardTitle>
      <CardContent>
        <LeftContentImage src={item.product.thumbnails[0]} />
        <RightContent>
          <ProductNameText productName={item.product.description} />
          <PriceAndCount price={item.totalPrice} count={item.quantity} />
          <OptionText text={`옵션 : ${item.product.acpOption}`} />
          {!isMobile && (
            <OrderListButtons
              orderState={orderState}
              handleShippingClick={() => handleShippingClick(orderCode)}
              handleReviewClick={handleReviewClick}
              orderId={orderId}
            />
          )}
        </RightContent>
      </CardContent>

      {isMobile && (
        <OrderListButtons
          orderState={orderState}
          handleShippingClick={() => handleShippingClick(orderCode)}
          handleReviewClick={handleReviewClick}
          orderId={orderId}
        />
      )}
    </Card>
  );
};
export default OrderCard;
