import React, { useState } from 'react';
import styled from 'styled-components';
import filterCheck from '../../assets/img/ic_filter_check.png';
import Text from '../common/Text';
import ic_dropdown from '../../assets/img/ic_dropdown_22px_desktop.png';
import ic_dropdown_up from '../../assets/img/ic_up_22px_desktop.png';
import { FilterBarProps } from '../../interfaces/filterProps';

const FilterBarMobile: React.FC<FilterBarProps> = ({ filters, filterValue, setFilterValue }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleDropdownClick = () => {
    setIsClicked(!isClicked);
  };

  const handleFilterClick = (value: string) => {
    setFilterValue(value);
    setIsClicked(false);
  };

  return (
    <FilterBarWrapper>
      <SelectedFilter onClick={handleDropdownClick} isClicked={isClicked}>
        <Text $fontType="Body05" color="white">
          {filterValue}
        </Text>
        <DownIcon>
          {isClicked ? (
            <img src={ic_dropdown_up} width={22} height={22} alt="closeIcon" />
          ) : (
            <img src={ic_dropdown} width={22} height={22} alt="openIcon" />
          )}
        </DownIcon>
      </SelectedFilter>
      <DropDownWrapper isClicked={isClicked}>
        {filters.map((item, index) => (
          <Filter key={index} onClick={() => handleFilterClick(item.name)}>
            {item.name === filterValue && (
              <CheckIcon>
                <img src={filterCheck} width={12} height={9} alt="checkIcon" />
              </CheckIcon>
            )}
            <FilterText $fontType="Body05" selected={item.name === filterValue}>
              {item.name}
            </FilterText>
          </Filter>
        ))}
      </DropDownWrapper>
    </FilterBarWrapper>
  );
};
export default FilterBarMobile;

const FilterBarWrapper = styled.div`
  position: relative;
`;

const SelectedFilter = styled.div<{ isClicked?: boolean }>`
  display: flex;
  align-items: center;
  padding: 13px 16px;
  width: 100%;
  height: 46px;
  background: ${(props) => props.theme.color.grey80};
  border-radius: ${(props) => (props.isClicked ? '8px 8px 0px 0px' : '8px')};
  cursor: pointer;
`;

const FilterText = styled(Text)<{ selected: boolean }>`
  color: ${(props) => (props.selected ? props.theme.color.blue10 : props.theme.color.white)};
  letter-spacing: -0.14px;
`;

const Filter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px;
  padding: 13px 36px;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.color.grey60};
  background: ${(props) => props.theme.color.grey80};
  &:last-child {
    border-radius: 0px 0px 8px 8px;
  }
  &:hover ${FilterText} {
    color: ${(props) => props.theme.color.blue10};
  }
`;

const CheckIcon = styled.div`
  display: flex;
  position: absolute;
  left: 15px;
  top: 16px;
`;

const DownIcon = styled.div`
  display: flex;
  margin-left: auto;
`;

const DropDownWrapper = styled.div<{ isClicked: boolean }>`
  position: absolute;
  width: 100%;
  opacity: ${(props) => (props.isClicked ? '1' : '0')};
  transform: translateY(${(props) => (props.isClicked ? '0' : '-10px')});
  transition:
    opacity 0.15s ease-in-out,
    transform 0.15s ease-in-out;
`;
