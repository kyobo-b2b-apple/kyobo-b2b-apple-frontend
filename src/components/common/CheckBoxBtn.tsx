import React from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/Icons/CheckBox.svg';
import CheckBoxNull from '../../assets/Icons/CheckBoxNull.svg';

interface CheckBoxBtnProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

export const CheckBoxBtn: React.FC<CheckBoxBtnProps> = ({ checked, ...rest }) => {
  return <StyledCheckBox {...rest} type="checkbox" checked={checked} />;
};

const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })<{ size?: number }>`
  appearance: none;
  border-radius: 6px;
  cursor: pointer;
  width: ${(props) => (props.size ? props.size + 'px' : '21px')};
  height: ${(props) => (props.size ? props.size + 'px' : '21px')};
  background: url(${CheckBoxNull});
  background-size: cover;
  background-position: center;

  &:checked {
    border-color: ${(props) => props.theme.color.blue};
    background: url(${CheckBox});
    background-size: cover;
    background-position: center;
  }
`;
