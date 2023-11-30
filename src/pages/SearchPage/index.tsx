import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import ContentsLayout from '../../layout/contentsWidthLayout';
import SearchBar from '../../components/search/SearchBar';
import { Spacer, Text, FilterBar, FilterBarMobile, MediaLayout } from '../../components/common';
import { productFilters } from '../../constants/filters';
import { useLocation, useNavigate } from 'react-router-dom';
import NoResultMessage from '../../components/search/NoResultMessage';
import XIcon from '../../components/search/XIcon';
import { XIconType } from '../../components/search/XIcon';
import useMediaPX from '../../hooks/useMediaPX';
import { getSearchResult } from '../../api/searchApi';
import SearchProps from '../../interfaces/searchProps';
import SearchContent from '../../components/search/SearchContent';
import ItemProps from '../../interfaces/itemProps';

const SearchPage = () => {
  const topSpace = useMediaPX({ desktop: '28px', tablet: '28px', mobile: '18px' });
  const searchBarSpace = useMediaPX({ desktop: '17px', tablet: '17px', mobile: '29px' });
  const textSpace = useMediaPX({ desktop: '11px', tablet: '11px', mobile: '8px' });
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [filterValue, setFilterValue] = useState('추천순');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ItemProps[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const itemsPerPage = 12;

  const handleDeleteClick = () => {
    setSearchTerm('');
    navigate('/search?keyword=');
  };

  const getSearchParamsFromURL = (search: string) => {
    return new URLSearchParams(search).get('keyword') || '';
  };

  const getData = useCallback(async (searchProps: SearchProps) => {
    const result = await getSearchResult(searchProps);
    setData(result.data.result.content);
    setProductCount(result.data.result.totalElements);
    setTotalPages(result.data.result.totalPages);
  }, []);

  useEffect(() => {
    const searchParams = getSearchParamsFromURL(location.search);
    const searchProps = {
      page: currentPage,
      size: itemsPerPage,
      keyword: searchParams,
      sortBy: sortBy,
    };
    setSearchTerm(searchParams);
    getData(searchProps);
  }, [location.search, currentPage, searchTerm, sortBy, getData]);

  useEffect(() => {
    const filterItem = productFilters.find((item) => item.name === filterValue);
    setSortBy(filterItem?.value || 'popularity');
    setCurrentPage(1);
  }, [filterValue]);

  useEffect(() => {
    setFilterValue('추천순');
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <Spacer height={topSpace} />
        <SearchWrapper>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <XIcon type={XIconType.DELETE} onClick={handleDeleteClick} />
        </SearchWrapper>
        <Spacer height={searchBarSpace} />

        <Text $fontType="Body04" color="white">
          총 <CountText color="blue">{productCount}</CountText>개의 상품
        </Text>
        <Spacer height={textSpace} />

        <MediaLayout
          DesktopComponent={
            <FilterBar filters={productFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
          }
          TabletComponent={
            <FilterBar filters={productFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
          }
          MobileComponent={
            <FilterBarMobile filters={productFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
          }
        />
        {productCount && searchTerm !== '' ? (
          <SearchContent
            data={data}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <NoResultMessage />
        )}
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default SearchPage;

const CountText = styled.span`
  color: ${(props) => props.theme.color.blue10};
`;

const SearchWrapper = styled.div`
  position: relative;
`;
