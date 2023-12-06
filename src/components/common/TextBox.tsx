import styled from 'styled-components';
import Text from './Text';

interface TextBoxProps {
  width?: string;
  height?: string;
  inputString: string[];
}

interface StyledTextBoxProps {
  width?: string;
  height?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ inputString, width, height }) => {
  return (
    <StyledTextBox width={width} height={height}>
      <StyledList className="dashed">
        {inputString.map((e, idx) => (
          <li key={idx}>{e}</li>
        ))}
      </StyledList>
    </StyledTextBox>
  );
};

export default TextBox;

const StyledTextBox = styled.div<StyledTextBoxProps>`
  width: ${(props) => (props.width ? props.width : '320px')};
  height: ${(props) => (props.height ? props.height : '126px')};
  background-color: ${(props) => props.theme.color.grey90};
  overflow: auto;
  padding: 13px 16px;
  border-radius: 8px;
`;

const StyledList = styled.ul`
  margin: 0;

  &.dashed {
    list-style-type: none;

    > li {
      text-indent: -5px;
      color: ${(props) => props.theme.color.grey50};

      &:before {
        content: '- ';
        text-indent: -5px;
      }
    }
  }
`;
