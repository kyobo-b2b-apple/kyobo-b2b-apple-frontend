import React from 'react';
import styled from 'styled-components';
import { Tag, ColorType, ShapeType } from '../common/Tag';
import { CategoryBarProps } from '../../interfaces/categoryProps';
import { useNavigate } from 'react-router-dom';

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, categoryValue, setCategoryValue, largeCategory }) => {
  const colorType = (item: string) => (item === categoryValue ? ColorType.GHOST : ColorType.PRIMARY);
  const navigate = useNavigate();

  const handleCategoryClick = (smallCategory: string) => {
    setCategoryValue(smallCategory);
    navigate(`/category?large_category=${largeCategory}&small_category=${smallCategory}`);
  };

  return (
    <ProductCategoryWrapper>
      {categories.map((item, index) => (
        <ProductTag
          key={index}
          shape={ShapeType.RECTANGLE}
          color={colorType(item.name)}
          onClick={() => handleCategoryClick(item.name)}
        >
          {item.name}
        </ProductTag>
      ))}
    </ProductCategoryWrapper>
  );
};
export default CategoryBar;

const ProductCategoryWrapper = styled.div`
  @media screen and (min-width: 480px)  {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    max-width: 868px;
    gap: 9px 8px;
  }

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
