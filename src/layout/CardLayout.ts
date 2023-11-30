import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.grey80};
  padding: 31px 3px;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const FlexItem = styled.div`
  flex: 1;

  padding: 0px 28px;

  &:last-child {
    border-left: 1px solid #fff;
  }
`;
