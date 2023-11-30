import CommonButton, { ButtonType } from './Button';
import { styled } from 'styled-components';
import { useState } from 'react';
import CheckedRadio from '../../assets/Icons/CheckedRadio.svg';
import NullRadio from '../../assets/Icons/NullRadio.svg';
interface RadioButtonProps {
  label?: string;
  value?: string;
  onSelect?: (value: string) => void;
  checked: boolean;
}
const RadioButton: React.FC<RadioButtonProps> = ({ label, value, onSelect, checked }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    if (onSelect) {
      onSelect(e.target.value);
    }
  };
  return (
    <CommonButtonRadio type={checked ? ButtonType.Ghost : ButtonType.Secondary}>
      <RadioBtn type="radio" value={value} checked={checked} onChange={handleRadioChange} />
      {label}
    </CommonButtonRadio>
  );
};
const RadioBtn = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  cursor: pointer;
  width: 21px;
  height: 21px;
  background-image: url(${NullRadio});
  &:checked {
    background-image: url(${CheckedRadio});
  }
  background-size: cover;
  background-position: center;
`;
const CommonButtonRadio = styled(CommonButton)`
  justify-content: flex-start;
  width: 100%;
`;
export default RadioButton;
