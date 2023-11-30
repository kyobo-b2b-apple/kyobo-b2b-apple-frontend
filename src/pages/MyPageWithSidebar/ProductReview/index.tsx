import { useState, useCallback, useEffect } from 'react';
import { Pagination } from '../../../components/common';
import InfoTextBox from '../../../components/my/InfoTextBox';
import OrderByYearList from '../../../components/my/OrderByYearList';
import CardList from '../../../components/my/CardList';
import MyContainer from '../../../components/my/MyContainer';
import ReviewCard from '../../../components/my/cards/ReviewCard';
import { getMyReview, MyReviewProps } from '../../../api/myReviewApi';
import { ReviewItemProps } from '../../../interfaces/reviewItemProps';
import formatDate from '../../../utils/formatDate';

const ProductReview = () => {
  const infoText = '- 상품별 후기 내역을 확인할 수 있습니다.\n- 구매 후 14일 이내로 후기를 작성할 수 있습니다.';
  const [totalPages, setTotalPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('최근 6개월');
  const itemsPerPage = 5;
  const [reviewList, setReviewList] = useState<ReviewItemProps[]>([]);

  const getData = useCallback(async (myInquiryProps: MyReviewProps) => {
    const result = await getMyReview(myInquiryProps);
    setTotalPages(result.data.result.totalPages);
    setReviewList(result.data.result.content);
  }, []);

  useEffect(() => {
    const year = selectedYear === '최근 6개월' ? 'last-6-months' : selectedYear;
    const myInquiryProps: MyReviewProps = {
      page: currentPage,
      size: itemsPerPage,
      year: year,
    };
    getData(myInquiryProps);
  }, [currentPage, selectedYear, getData]);

  return (
    <MyContainer label="나의 상품후기">
      <InfoTextBox infoText={infoText} />
      <OrderByYearList selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      <CardList>
        {reviewList.map((content) => (
          <ReviewCard
            key={content.orderId}
            orderId={content.orderId}
            review={content.review}
            item={content.orderItems[0]}
            date={formatDate(content.createdAt)}
          />
        ))}
      </CardList>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </MyContainer>
  );
};
export default ProductReview;
