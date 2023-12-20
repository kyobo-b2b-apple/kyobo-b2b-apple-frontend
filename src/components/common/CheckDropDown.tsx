import React, { useState } from 'react';
import styled from 'styled-components';
import Image from '../image/Image';
import Text from './Text';
import pagedown from '../../assets/img/floating/ic_float_pagedown.png';
import pageup from '../../assets/img/floating/ic_float_pageup.png';
import { CheckBoxBtn } from './CheckBoxBtn';

interface CheckDropDownProps {
  menuItems: ItemsContent[];
  title: string;
  setItems: (items: number[]) => void;
}

interface ListboxProps {
  isOpen: boolean;
}

interface ListboxOptionProps {
  isLast: boolean;
}

export interface ItemsContent {
  id: number;
  description: string;
}

const Dropdown: React.FC<CheckDropDownProps> = ({ menuItems, title, setItems, ...rest }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkItems, setCheckedItem] = useState<number[]>([]);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItem((prev) => [...prev, id]);
    } else {
      setCheckedItem(checkItems.filter((e) => e !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray: number[] = menuItems.map((el) => el.id);
      setCheckedItem(idArray);
    } else {
      setCheckedItem([]);
    }
  };

  return (
    <Container>
      <ListboxTitleContainer isOpen={isOpen} onClick={handleButtonClick}>
        <Text $fontType="Body05" color="grey20">
          {checkItems.length === 0 ? title : `${checkItems.length}개의 상품 선택됨`}
        </Text>
        <DownBtn onClick={handleButtonClick}>
          {isOpen ? (
            <Image src={pageup} alt="up" height="15px" width="15px" />
          ) : (
            <Image src={pagedown} alt="down" height="15px" width="15px" />
          )}
        </DownBtn>
      </ListboxTitleContainer>
      <Listbox isOpen={isOpen}>
        <DropdownItem>
          <CheckBoxBtn
            name="selectall"
            onChange={(e) => {
              handleAllCheck(e.target.checked);
            }}
            checked={checkItems.length === menuItems.length ? true : false}
          />
          <Text $fontType="Body05" color="white">
            전체선택
          </Text>
        </DropdownItem>
        {menuItems.map((data, idx) => (
          <ListboxOption key={data.id} isLast={idx === menuItems.length - 1}>
            <CheckBoxBtn
              name="selectItem"
              onChange={(e) => handleItemClick(e.target.checked, data.id)}
              checked={checkItems.includes(data.id) ? true : false}
            />
            <Text $fontType="Body05" color="white">
              {data.description}
            </Text>
          </ListboxOption>
        ))}
      </Listbox>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Listbox = styled.div<ListboxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  height: 46px;
  position: absolute;
  width: 100%;
`;

const ListboxOption = styled.div<ListboxOptionProps>`
  display: flex;
  padding: 13px 16px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.color.grey60};
  background-color: ${(props) => props.theme.color.grey90};
  height: 46px;
  border-radius: ${({ isLast }) => (isLast ? '0 0 8px 8px' : '0')};

  &:hover {
    background-color: ${(props) => props.theme.color.grey60};
  }
`;

const ListboxTitleContainer = styled.div<ListboxProps>`
  background-color: ${(props) => props.theme.color.grey80};
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0px 0px' : '8px')};
  cursor: pointer;
`;

const DownBtn = styled.div`
  background: none;
`;

const DropdownItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  padding: 13px 16px;
  border-top: 1px solid ${(props) => props.theme.color.grey60};
  background-color: ${(props) => props.theme.color.grey90};
  height: 46px;

  &:hover {
    background-color: ${(props) => props.theme.color.grey60};
  }
`;
