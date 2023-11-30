import styled from 'styled-components';
import { Pagination } from '../common';
import ItemList from '../ItemList';
import ItemProps from '../../interfaces/itemProps';
import { PageProps } from '../common/Pagination';

interface SearchContentProps extends PageProps {
  data: ItemProps[];
}

const SearchContent = ({ data, totalPages, currentPage, setCurrentPage }: SearchContentProps) => {
  return (
    <ContentWrapper>
      <ItemList type="category" items={data} />
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </ContentWrapper>
  );
};
export default SearchContent;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

   @media screen and (min-width: 768px) {
    padding: 33px 0px 123px 0px;
    gap: 86px 0px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    padding: 33px 0px 83px 0px;
    gap: 83px 0px;
  }
  @media screen and (max-width: 479px) {
    padding: 15px 0px 87px 0px;
    gap: 56px 0px;
  }
`;
