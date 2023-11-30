import { useIsOS, OS } from '../../../hooks/useIsOS';
import PriceAndCount from '../inCard/PriceAndCount';
import ProductNameText from '../inCard/ProductNameText';
import OptionText from '../inCard/OptionText';
import Card from '../inCard/Card';
import OrderNumberText from '../inCard/OrderNumberText';
import CardButton from '../inCard/CardButton';
import CardTitle from '../inCard/CardTitle';
import CardContent from '../inCard/CardContent';
import LeftContentImage from '../inCard/LeftContentImage';
import RightContent from '../inCard/RightContent';
import { OrderCardProps } from '../../../interfaces/orderItemProps';

const RefundCard = ({ item, date, orderCode }: OrderCardProps) => {
  const isMobile = useIsOS(OS.MOBILE);

  return (
    <Card>
      <CardTitle label={date + ' 취소완료'} isBlock={true}>
        <OrderNumberText orderNumber={orderCode} />
      </CardTitle>
      <CardContent>
        <LeftContentImage src={item.product.thumbnails[0]} />
        <RightContent>
          <ProductNameText productName={item.product.description} />
          <PriceAndCount price={item.totalPrice} count={item.quantity} />
          <OptionText text={`옵션 : ${item.product.acpOption}`} />
          {!isMobile && <CardButton>상세보기</CardButton>}
        </RightContent>
      </CardContent>
      {isMobile && <CardButton>상세보기</CardButton>}
    </Card>
  );
};
export default RefundCard;
