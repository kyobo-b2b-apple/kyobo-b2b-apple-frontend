import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Image from '../image/Image';
import Text from './Text';

import down from '../../assets/img/ic_float_pagedown.png';

interface DropDownProps {
  menuItems: string[];
  width: string;
  backgroundColor?: string;
  textDecoration?: string;
  buttonPadding?: string;
}

interface DropdownContentProps {
  isOpen: boolean;
  width?: string;
}

const Dropdown: React.FC<DropDownProps> = ({ menuItems, width, backgroundColor, buttonPadding }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleButtonClick} isOpen={isOpen}>
        <DropdownButtonTextContainer>
          <Text $fontType='Body04' color='white'>{selectedItem}</Text>
          <Image src={down} alt='down' height='15px' width='15px' />
        </DropdownButtonTextContainer>
      </DropdownButton>
      <DropdownContent isOpen={isOpen} width={width}>
        {menuItems.map((item, index) => (
          <DropdownItem key={index} onClick={() => handleItemClick(item)}>
            <Text $fontType='Body05' color='white'>{item}</Text>
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  
`;

const DropdownButton = styled.button<{ isOpen: boolean; }>`
  background-color: ${props => props.theme.color.grey70};
  cursor: pointer;
  border-radius: ${({ isOpen }) => isOpen ? '8px 8px 0 0' : '8px'};
  width: 100%;
  padding: 16px 13px;

`;

const DropdownButtonTextContainer = styled.div<{ buttonPadding?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: '13px 16px';
`;

const DropdownContent = styled.div<DropdownContentProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: ${props => props.theme.color.grey70};
  min-width: ${({ width }) => width || '160px'};
  border-radius: ${({ isOpen }) => isOpen ? '0 0 8px 8px' : '8px'};
  z-index: 1;
  
`;

const DropdownItem = styled.div<{ buttonPadding?: string }>`
  padding: 13px 16px;
  border-top: 1px solid ${props => props.theme.color.grey30};
  
  cursor: pointer;
  &:hover {
    
  }
`;