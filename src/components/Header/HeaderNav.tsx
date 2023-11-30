import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Text from '../common/Text';
import Image from '../image/Image';
import Header from './Header';
import Spacer from '../common/Spacer';

import cart from '../../assets/img/ic_cart_desktop.png';
import search from '../../assets/img/ic_search_desktop.png';
import { RxHamburgerMenu } from 'react-icons/rx';
import SearchModal from '../modal/SearchModal';
import { OS, useIsOS } from '../../hooks/useIsOS';
import ContentsLayout from '../../layout/contentsWidthLayout';

interface Category {
  name: string;
  items: string[];
}

interface NavProps {
  categories: Category[];
  onCategoryHover: (category: string | null) => void;
  toggleSidebar: () => void;
  onMouseLeave: () => void;
}

const HeaderNavList: React.FC<NavProps> = ({ categories, onCategoryHover, toggleSidebar, onMouseLeave }) => {
  const isDesktop = useIsOS(OS.DESKTOP);
  const isTablet = useIsOS(OS.TABLET);
  const isMobile = useIsOS(OS.MOBILE);

  const [categoryDropDownVisible, setCategoryDropDownVisible] = useState(false);

  const toggleCategoryDropDown = () => {
    setCategoryDropDownVisible(!categoryDropDownVisible);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleSearchClick = () => {
    setModalOpen(true);
  };

  return (
    <ContentsLayout $type="full" $backgroundColor="#1B1B1B;">
      <HeaderNavContainer>
        <HeaderNavListContainer isMobile={isMobile}>
          {categories.map((categoryItem) => (
            <>
              <Link
                to={categoryItem.name === 'Solutions' ? '/solutions' : `/category?large_category=${categoryItem.name}`}
                key={categoryItem.name}
                onMouseEnter={() => onCategoryHover(categoryItem.name)}
                onClick={onMouseLeave}
              >
                <CategoryText $fontType="Body03" color="grey20">
                  {categoryItem.name}
                </CategoryText>
              </Link>
              <Spacer width="43px" />
            </>
          ))}
        </HeaderNavListContainer>
        <ResponsiveButton onClick={toggleSidebar} isMobile={isMobile}>
          <RxHamburgerMenu />
          <Spacer width={14} />
          카테고리
        </ResponsiveButton>
        <HeaderNavBtnContainer>
          <div onClick={handleSearchClick}>
            <Image src={search} alt="search" width="20px" height="20px" />
          </div>
          <SearchModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <Spacer width="12px" />
          <Link to="/cart">
            <Image src={cart} alt="cart" width="22px" height="20px" />
          </Link>
        </HeaderNavBtnContainer>
      </HeaderNavContainer>
    </ContentsLayout>
  );
};

export default HeaderNavList;

const HeaderNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 868px;
  height: 55px;
  margin: auto;
  padding: 0px 20px;
  position: relative;
`;

const HeaderNavListContainer = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? 'none' : 'flex')};
`;

const HeaderNavBtnContainer = styled.div`
  display: flex;
`;

const ResponsiveButton = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? 'flex' : 'none')};
  background-color: transparent;
  color: ${(props) => props.theme.color.white};
  border: none;
  flex-direction: row;
  cursor: pointer;
`;

const Dropdown = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? 'flex' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DropdownCategory = styled(Link)`
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;

  :hover {
    background-color: #f1f1f1;
  }
`;

const CategoryText = styled(Text)`
  transition: color 0.1s ease-in-out;
  &:hover {
    color: white;
  }
`;
