import { useState, useCallback, useEffect } from 'react';
import { Pagination } from '../../../components/common';
import InfoTextBox from '../../../components/my/InfoTextBox';
import OrderByYearList from '../../../components/my/OrderByYearList';
import CardList from '../../../components/my/CardList';
import MyContainer from '../../../components/my/MyContainer';
import InquiryCard from '../../../components/my/cards/InquiryCard';
import { MyInquiryProps, getMyInquiry } from '../../../api/myInquiryApi';
import { InquiryItemProps } from '../../../interfaces/inquryItemProps';

const ProductInquiry = () => {
  const infoText = '- 상품별 문의 내역을 확인할 수 있습니다.\n- 상품에 문의 답변이 달릴 시 SMS으로 안내드립니다.';
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('최근 6개월');
  const itemsPerPage = 5;
  const [inquiryList, setInquiryList] = useState<InquiryItemProps[]>([]);

  const getData = useCallback(async (myInquiryProps: MyInquiryProps) => {
    const result = await getMyInquiry(myInquiryProps);
    setTotalPages(result.data.result.totalPages);
    console.log(result.data.result.content);
    setInquiryList(result.data.result.content);
  }, []);

  useEffect(() => {
    const year = selectedYear === '최근 6개월' ? 'last-6-months' : selectedYear;
    const myInquiryProps: MyInquiryProps = {
      page: currentPage,
      size: itemsPerPage,
      year: year,
    };
    getData(myInquiryProps);
  }, [currentPage, selectedYear, getData]);

  return (
    <MyContainer label="나의 상품문의">
      <InfoTextBox infoText={infoText} />
      <OrderByYearList selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      <CardList>{inquiryList?.map((item) => <InquiryCard key={item.id} item={item} />)}</CardList>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </MyContainer>
  );
};
export default ProductInquiry;
