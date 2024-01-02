import { useState, useCallback, useEffect } from 'react';
import { Pagination } from '../../../components/common';
import InfoTextBox from '../../../components/my/InfoTextBox';
import OrderByYearList from '../../../components/my/OrderByYearList';
import CardList from '../../../components/my/CardList';
import MyContainer from '../../../components/my/MyContainer';
import RefundCard from '../../../components/my/cards/RefundCard';
import { OrderListProps, getOrderList } from '../../../api/orderApi';
import { OrderItemListProps } from '../../../interfaces/orderItemProps';
import formatDate from '../../../utils/formatDate';
import exRefundData from '../../../constants/exRefundData';

const RefundHistory = () => {
  const infoText =
    '-취소/반품/교환 신청한 내역을 확인할 수 있습니다.\n-하단 상품목록에 없는 상품은 1:1문의 또는 고객센터(1577-0000)로 문의주세요.';
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('최근 6개월');
  const itemsPerPage = 5;
  const accessToken = localStorage.getItem('accessToken');
  const [orderContent, setOrderContent] = useState<OrderItemListProps[]>([]);

  const getData = useCallback(async ({ page, size, csOnly, year, accessToken }: OrderListProps) => {
    const result = await getOrderList({ page, size, csOnly, year, accessToken });
    setTotalPages(result.data.result.totalPages);
    setOrderContent(result.data.result.content);
  }, []);

  useEffect(() => {
    const year = selectedYear === '최근 6개월' ? 'last-6-months' : selectedYear;
    const orderListProps: OrderListProps = {
      page: currentPage,
      size: itemsPerPage,
      csOnly: true,
      year: year,
      accessToken: accessToken || '',
    };
    getData(orderListProps);
  }, [currentPage, selectedYear, accessToken, getData]);

  useEffect(() => {
    if (orderContent.length === 0) {
      setOrderContent(exRefundData);
      setTotalPages(1);
    }
  }, [orderContent]);

  return (
    <MyContainer label="취소/반품/교환/환불내역">
      <InfoTextBox infoText={infoText} />
      <OrderByYearList selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      <CardList>
        {orderContent?.map((content) => (
          <RefundCard
            key={content.id}
            item={content.orderItems[0]}
            date={formatDate(content.createdAt)}
            orderCode={content.orderCode}
          />
        ))}
      </CardList>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </MyContainer>
  );
};
export default RefundHistory;
