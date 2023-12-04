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
import { useEffect, useState } from 'react';

const OrderCard = ({ item, date, orderCode, reviewId }: OrderCardProps) => {
  const isMobile = useIsOS(OS.MOBILE);
  const navigate = useNavigate();
  const [orderButtonText, setOrder] = useState('취소 요청');
  const [reviewButtonText, setReview] = useState('후기 작성하기');

  const handleShowDetailClick = (orderCode: string) => {
    navigate(`/my-page/order-detail/${orderCode}`);
  };

  const handleShippingClick = (orderCode: string) => {
    navigate(`/my-page/delivery-tracking/${orderCode}`);
  };

  const handleReviewClick = () => {
    navigate('/my-page/product-review');
  };

  useEffect(() => {
    if (reviewId === -1) {
      setOrder('교환,반품 신청');
      setReview('후기 상세보기');
    }
  }, [reviewId]);

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
              orderButtonText={[orderButtonText, reviewButtonText]}
              handleShippingClick={() => handleShippingClick(orderCode)}
              handleReviewClick={handleReviewClick}
            />
          )}
        </RightContent>
      </CardContent>

      {isMobile && (
        <OrderListButtons
          orderButtonText={[orderButtonText, reviewButtonText]}
          handleShippingClick={() => handleShippingClick(orderCode)}
          handleReviewClick={handleReviewClick}
        />
      )}
    </Card>
  );
};
export default OrderCard;
