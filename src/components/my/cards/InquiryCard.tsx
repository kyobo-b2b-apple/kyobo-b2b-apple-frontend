import { useIsOS, OS } from '../../../hooks/useIsOS';
import ProductNameText from '../inCard/ProductNameText';
import Card from '../inCard/Card';
import CardButton from '../inCard/CardButton';
import { useNavigate } from 'react-router-dom';
import CardTitle from '../inCard/CardTitle';
import CardContent from '../inCard/CardContent';
import LeftContentImage from '../inCard/LeftContentImage';
import RightContent from '../inCard/RightContent';
import formatDate from '../../../utils/formatDate';
import LineClampText from '../inCard/LineClampText';
import { InquiryItemProps } from '../../../interfaces/inquryItemProps';

interface InquiryCardProps {
  item: InquiryItemProps;
}

function InquiryCard({ item }: InquiryCardProps) {
  const isMobile = useIsOS(OS.MOBILE);
  const navigate = useNavigate();

  const handleDetailClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const setInquiryStatus = (status: string) => {
    if (status === 'COMPLETE') {
      return '답변완료';
    }
    if (status === 'PENDING') {
      return '접수중';
    }
  };

  const titleLabel = formatDate(item.createdAt) + ' ' + setInquiryStatus(item.inquiryStatus);

  return (
    <Card>
      <CardTitle label={titleLabel} />
      <CardContent>
        <LeftContentImage src={item.product.thumbnails[0]} />
        <RightContent>
          <ProductNameText productName={item.product.description} />
          <LineClampText text={item.content} />
          {!isMobile && <CardButton onClick={() => handleDetailClick(item.product.id)}>상세보기</CardButton>}
        </RightContent>
      </CardContent>
      {isMobile && <CardButton onClick={() => handleDetailClick(item.product.id)}>상세보기</CardButton>}
    </Card>
  );
}
export default InquiryCard;
