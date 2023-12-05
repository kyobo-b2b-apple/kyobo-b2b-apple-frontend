import styled from 'styled-components';
import Image from '../image/Image';
import Text from './Text';

import pagedown from '../../assets/img/floating/ic_float_pagedown.png';
import pageup from '../../assets/img/floating/ic_float_pageup.png';
import { useState } from 'react';

interface SelectProps {
  menuItems: string[];
}

interface ListboxProps {
  isOpen: boolean;
}

interface ListboxOptionProps {
  isLast: boolean;
}

const SelectDropDown: React.FC<SelectProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('취소 사유 선택');

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <Container>
      <ListboxTitleContainer isOpen={isOpen} onClick={handleButtonClick}>
        <Text $fontType="Body05" color="grey20">
          {selected}
        </Text>
        <DownBtn type="submit">
          {isOpen ? (
            <Image src={pageup} alt="up" height="15px" width="15px" />
          ) : (
            <Image src={pagedown} alt="down" height="15px" width="15px" />
          )}
        </DownBtn>
      </ListboxTitleContainer>
      <Listbox isOpen={isOpen}>
        {menuItems.map((e, idx) => (
          <ListboxOption key={idx} isLast={idx === menuItems.length - 1} onClick={() => handleItemClick(e)}>
            <Text $fontType="Body05" color="white">
              {e}
            </Text>
          </ListboxOption>
        ))}
      </Listbox>
    </Container>
  );
};

export default SelectDropDown;

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
  justify-content: center;
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

const DownBtn = styled.button`
  background: none;
`;
