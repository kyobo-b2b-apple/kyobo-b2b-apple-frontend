import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width: string;
  height: string;
  padding: string;
}

const TextArea: React.FC<TextAreaProps> = ({ width, height, ...rest }) => {
  return <StyledTextArea width={width} height={height} {...rest}></StyledTextArea>;
};

export default TextArea;

const StyledTextArea = styled.textarea<TextAreaProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.theme.color.grey90};
  color: ${(props) => props.theme.color.white};
  border-radius: 8px;
  border: 0;
  resize: none;
  font-family: inherit;
  font-size: inherit;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.color.grey50};
  }
  &:focus {
    outline: 1px solid ${(props) => props.theme.color.blue};
  }
`;
