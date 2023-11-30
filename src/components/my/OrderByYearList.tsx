import { FC, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import orderByYearFilters from '../../constants/orderByYearFilters';
import { Tag, ShapeType, ColorType } from '../common/Tag';

interface YearListProps {
  selectedYear: string;
  setSelectedYear: Dispatch<SetStateAction<string>>;
}

const OrderByYearList: FC<YearListProps> = ({ selectedYear, setSelectedYear }) => {
  const colorType = (year: string) => (year === selectedYear ? ColorType.GHOST : ColorType.PRIMARY);

  return (
    <YearListWrapper>
      {orderByYearFilters.map((item, index) => (
        <ProductTag
          key={index}
          shape={ShapeType.CIRCLE}
          color={colorType(item.name)}
          onClick={() => setSelectedYear(item.name)}
        >
          {item.name}
        </ProductTag>
      ))}
    </YearListWrapper>
  );
};
export default OrderByYearList;

const YearListWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 9px;

  @media screen and (max-width: 479px) {
    display: flex;
    width: 100%;
    overflow: scroll hidden;
    gap: 0px 6px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ProductTag = styled(Tag)`
  @media screen and (max-width: 479px) {
    display: flex;
    flex: 0 0 auto;
  }
`;
