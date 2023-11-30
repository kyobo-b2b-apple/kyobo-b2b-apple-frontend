import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../common';

interface ShowDetailProps {
  onClick: () => void;
}

const ShowDetailButton: FC<ShowDetailProps> = ({ onClick }) => {
  return (
    <ShowDetailWrapper onClick={onClick}>
      <Text $fontType="Caption01" color="white">
        상세보기
      </Text>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M4.5 2.5L8 6L4.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </ShowDetailWrapper>
  );
};
export default ShowDetailButton;

const ShowDetailWrapper = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: auto;
`;
