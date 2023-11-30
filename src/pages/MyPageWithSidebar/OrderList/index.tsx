import { useState, useCallback, useEffect } from 'react';
import { Pagination } from '../../../components/common';
import OrderByYearList from '../../../components/my/OrderByYearList';
import CardList from '../../../components/my/CardList';
import MyContainer from '../../../components/my/MyContainer';
import OrderCard from '../../../components/my/cards/OrderCard';
import { getOrderList } from '../../../api/orderApi';
import { OrderListProps } from '../../../api/orderApi';
import { OrderItemListProps } from '../../../interfaces/orderItemProps';
import formatDate from '../../../utils/formatDate';

const OrderList = () => {
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
      csOnly: false,
      year: year,
      accessToken: accessToken || '',
    };
    getData(orderListProps);
  }, [currentPage, selectedYear, accessToken, getData]);

  return (
    <MyContainer label="주문목록/배송조회">
      <OrderByYearList selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      <CardList>
        {orderContent?.map((content) => (
          <OrderCard
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
export default OrderList;
