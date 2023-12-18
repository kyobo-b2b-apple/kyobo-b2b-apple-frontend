import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import theme from '../../styles/theme';

interface TextBoxProps extends PropsWithChildren {
  width?: string;
  height?: string;
  bgColor?: keyof typeof theme.color | string;
}

interface StyledTextBoxProps {
  width?: string;
  height?: string;
  color?: keyof typeof theme.color | string;
}

const TextBox = (props: TextBoxProps) => {
  const { children, width, height, bgColor } = props;

  return (
    <StyledTextBox width={width} height={height} color={bgColor}>
      {children}
    </StyledTextBox>
  );
};

export default TextBox;

const StyledTextBox = styled.div.attrs<StyledTextBoxProps>((props) => props)`
  width: ${(props) => (props.width ? props.width : '320px')};
  height: ${(props) => (props.height ? props.height : '126px')};
  background-color: ${(props) => (props.color ? theme.color[props.color] : theme.color.black)};
  overflow: auto;
  padding: 13px 16px;
  border-radius: 8px;
`;
