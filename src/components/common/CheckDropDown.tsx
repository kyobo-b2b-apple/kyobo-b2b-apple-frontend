import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from '../image/Image';
import Text from './Text';
import pagedown from '../../assets/img/floating/ic_float_pagedown.png';
import pageup from '../../assets/img/floating/ic_float_pageup.png';
import { CheckBoxBtn } from './CheckBoxBtn';
import { useFormContext } from 'react-hook-form';

interface CheckDropDownProps {
  menuItems: ItemsContent[];
  title: string;
  setItems: (items: number[]) => void;
}

interface ListboxProps {
  isOpen: boolean;
}

export interface ItemsContent {
  id: number;
  description: string;
}

const Dropdown: React.FC<CheckDropDownProps> = ({ menuItems, title, setItems, ...rest }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkItems, setCheckedItem] = useState(new Set());
  const numChecked = checkItems.size;
  const { setValue } = useFormContext();

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  //체크박스 개별 선택 로직 함수
  const updateSet = (set, id) => {
    const updatedSet = new Set(set);

    if (updatedSet.has(id)) {
      updatedSet.delete(id);
    } else {
      updatedSet.add(id);
    }

    return updatedSet;
  };

  useEffect(() => {
    setValue('items', Array.from(checkItems));
  }, [checkItems, setValue]);

  //체크박스 개별 선택
  const handleCheckChange = (e: React.FormEvent<HTMLInputElement>, id: number) => {
    setCheckedItem((prevSet) => updateSet(prevSet, id));
  };

  // 체크박스 전체 선택
  const handleAllCheck = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      const allChecked = new Set(menuItems.map(({ id }) => id));
      setCheckedItem(allChecked);
    } else {
      setCheckedItem(new Set());
    }
  };

  return (
    <Container>
      <ListboxTitleContainer isOpen={isOpen} onClick={handleButtonClick}>
        <Text $fontType="Body05" color="grey20">
          {numChecked ? `${numChecked}개 선택됨` : title}
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
        <ListboxOption>
          <CheckBoxBtn onChange={handleAllCheck} checked={numChecked === menuItems.length} />
          <Text $fontType="Body05" color="white">
            전체선택
          </Text>
        </ListboxOption>
        {menuItems.map((data, idx) => (
          <ListboxOption key={data.id}>
            <CheckBoxBtn
              key={data.id}
              onChange={(e) => handleCheckChange(e, data.id)}
              checked={checkItems.has(data.id)}
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

const ListboxOption = styled.div`
  display: flex;
  padding: 13px 16px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.color.grey60};
  background-color: ${(props) => props.theme.color.grey80};
  height: 46px;

  &:hover {
    background-color: ${(props) => props.theme.color.grey60};
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
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
