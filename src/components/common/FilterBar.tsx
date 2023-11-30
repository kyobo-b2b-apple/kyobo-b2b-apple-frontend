import React from 'react';
import styled from 'styled-components';
import filterCheck from '../../assets/img/ic_filter_check.png';
import Text from '../common/Text';
import { FilterBarProps } from '../../interfaces/filterProps';
import { OS, useIsOS } from '../../hooks/useIsOS';

const FilterBar: React.FC<FilterBarProps> = ({ filters, filterValue, setFilterValue }) => {
  const isDesktop = useIsOS(OS.DESKTOP);
  return (
    <FilterWrapper isDesktop={isDesktop}>
      {filters.map((item, index) => (
        <Filter
          key={index}
          onClick={() => {
            setFilterValue(item.name);
          }}
        >
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
    </FilterWrapper>
  );
};
export default FilterBar;

const FilterWrapper = styled.div<{ isDesktop: boolean }>`
  display: flex;
  padding: ${(props) => (props.isDesktop ? '16px 23px' : '16px 15px')};
  width: 100%;
  height: 51px;
  border-radius: 8px;
  background: #2c2c2c;
  gap: 0px 29px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0px 5px;
`;

const FilterText = styled(Text) <{ selected: boolean }>`
  color: ${(props) => (props.selected ? props.theme.color.blue10 : props.theme.color.grey20)};
  font-weight: ${(props) => props.selected && '500'};
  letter-spacing: -0.14px;
`;

const CheckIcon = styled.div`
  display: flex;
  padding-bottom: 5px;
`;
