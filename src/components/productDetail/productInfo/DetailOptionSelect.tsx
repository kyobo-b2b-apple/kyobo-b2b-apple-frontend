/* eslint-disable react/no-unescaped-entities */
import { styled } from 'styled-components';
import InfoText from '../TextStyle';
import Select from 'react-select';

interface OptionProps {
  isDesktop?: boolean;
  productData?: any;
  selectedOptions?: any[];
}

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    height: '46px',
    borderBottom: '1px solid #545454',
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    fontSize: '14px',
    fontweight: '400',
    color: 'white',
    backgroundColor: isFocused || isSelected ? '#2C2C2E' : '#2C2C2E',
    '&:active': {
      backgroundColor: isFocused || isSelected ? '#2C2C2E' : '#2C2C2E',
    },
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: 'white',
  }),

  singleValue: (styles: any) => ({
    ...styles,
    color: 'white',
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: '8px',
  }),
  menuList: (styles: any) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
};

const DetailOptionSelect: React.FC<
  OptionProps & { setSelectedOptions: React.Dispatch<React.SetStateAction<any[]>> }
> = ({ isDesktop, productData, selectedOptions = [], setSelectedOptions = () => {} }) => {
  const extractPrice = (str: string) => {
    const priceRegex = /\((\+\d+,?\d*)원\)/;
    const match = str?.match(priceRegex);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, '').replace(/\+/g, ''), 10);
    }
    return null;
  };

  const options = [
    {
      value: 'accOption1',
      label: productData.result.accOption1,
      price: extractPrice(productData.result.accOption1),
    },
    {
      value: 'accOption2',
      label: productData.result.accOption2,
      price: extractPrice(productData.result.accOption2),
    },
    {
      value: 'accOption3',
      label: productData.result.accOption3,
      price: extractPrice(productData.result.accOption3),
    },
    {
      value: 'accOption4',
      label: productData.result.accOption4,
      price: extractPrice(productData.result.accOption4),
    },
    {
      value: 'acpOption',
      label: productData.result.acpOption,
      price: extractPrice(productData.result.acpOption),
    },
  ];

  return (
    <OptionContainer isDesktop={isDesktop}>
      <InfoText>옵션</InfoText>
      <OptionWrap isDesktop={isDesktop}>
        <Select
          options={options}
          styles={customStyles}
          name="appleCare"
          defaultValue={null}
          isSearchable={false}
          placeholder="추가 상품"
          components={{
            IndicatorSeparator: () => null,
          }}
          onChange={(option) => setSelectedOptions((prev) => [...prev, option])}
        />
      </OptionWrap>
    </OptionContainer>
  );
};

const OptionContainer = styled.div<OptionProps>`
  display: flex;
  flex-direction: ${(props) => (props.isDesktop ? 'row' : 'column')};
  width: 100%;
  height: 84px;
  justify-content: space-between;
  align-items: ${(props) => (props.isDesktop ? 'center' : 'start')};
`;
const OptionWrap = styled.div<OptionProps>`
  width: ${(props) => (props.isDesktop ? '340px' : '100%')};
`;

export default DetailOptionSelect;
