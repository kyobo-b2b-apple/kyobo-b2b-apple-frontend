import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';
import React from 'react';
import ErrorMessageComponents from './ErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFailure?: boolean;
  placeholder?: string;
  ErrorMessage?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  color?:string;
}
const StyledInput = styled.input<{
  isFailure?: boolean;
  width?: number | string;
  height?: number | string;
  color?:string;
}>`
  background: ${(props) => props.theme.color.grey80};
  box-sizing: border-box;
  border-radius: 8px;
  border: 0;
  width: ${(props) => (props.width ? `${props.width}` : '297px')};
  height: ${(props) => (props.height ? `${props.height}` : '48px')};
  padding: 13px 16px;
  color: ${(props) => props.color || props.theme.color.white};
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.color.grey50};
  }
  &:focus {
    outline: ${({ isFailure, theme }) =>
      isFailure ? `1px solid ${theme.color.red30}` : `1px solid ${theme.color.blue}`};
  }
`;

export const InputStyle = React.forwardRef<HTMLInputElement, InputProps>(
  ({color, isFailure, placeholder, ErrorMessage, width, height, ...props }, ref) => {
    return (
      <>
        <StyledInput
          width={width}
          height={height}
          isFailure={isFailure}
          placeholder={placeholder}
          ref={ref}
          {...props}
          color={color}
        />
        {ErrorMessage && <ErrorMessageComponents>{ErrorMessage}</ErrorMessageComponents>}
      </>
    );
  },
);
