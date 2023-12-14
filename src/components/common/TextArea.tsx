import { TextareaHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width: string;
  height: string;
  padding: string;
}

export const StyledTextArea = styled.textarea<TextAreaProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.theme.color.grey90};
  color: ${(props) => props.color || props.theme.color.white};
  border-radius: 8px;
  border: 0;
  resize: none;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.color.grey50};
  }
  &:focus {
    outline: 1px solid ${(props) => props.theme.color.blue};
  }
`;
