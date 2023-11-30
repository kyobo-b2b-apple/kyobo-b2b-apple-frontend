import React, { FC, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Image from '../image/Image';
import ic_search from '../../assets/img/search/ic_search_desktop.png';
import { useNavigate } from 'react-router-dom';
import { H2Style, H3Style } from '../../styles/typographyStyles';
import useMediaFont from '../../hooks/useMediaFont';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isModal?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const SearchBar: FC<SearchProps> = ({ searchTerm, setSearchTerm, isModal, setModalOpen }) => {
  const inputFontType = useMediaFont({ desktop: 'H2', tablet: 'H2', mobile: 'H3' });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchTerm;
    }
  }, [searchTerm]);

  const handleSearchClick = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      setSearchTerm(inputValue);
      navigate(`/search?keyword=${encodeURIComponent(inputValue)}`);

      if (isModal && setModalOpen) {
        setModalOpen(false);
      }
    }
  };

  const handleOnkeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <SearchInputWrapper>
      <SearchIcon onClick={handleSearchClick}>
        <Image width="34px" height="34px" src={ic_search} alt="search-icon" />
      </SearchIcon>
      <Input
        ref={inputRef}
        placeholder="어떤 상품을 찾으시나요?"
        fontSize={inputFontType}
        onKeyDown={(e) => handleOnkeyPress(e)}
        defaultValue={searchTerm}
      />
    </SearchInputWrapper>
  );
};
export default SearchBar;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${(props) => props.theme.color.grey40};

  &:focus-within {
    border-bottom-color: ${(props) => props.theme.color.white};
  }
`;

const Input = styled.input<{ fontSize: string }>`
  width: 100%;
  height: 45px;
  border: 0;
  color: ${(props) => props.theme.color.white};
  background-color: inherit;

  &::placeholder {
    color: ${(props) => props.theme.color.grey50};
  }
  &:focus {
    outline: none;
  }
  @media screen and (min-width: 768px) {
    ${H2Style}
    padding: 15px 12px;
  }
  @media screen and (max-width: 479px) {
    ${H3Style}
    padding: 15px 10px;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
`;
