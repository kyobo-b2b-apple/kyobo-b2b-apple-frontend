import React from 'react';
import styled from 'styled-components';

interface PagiNationProps {
  totalPages: number;
  handlePageClick: (page: number) => void;
}

const PagiNation: React.FC<PagiNationProps> = ({ totalPages, handlePageClick }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PageNationWrap>
      {pageNumbers.map((number) => (
        <PageNumber key={number} onClick={() => handlePageClick(number)}>
          {number}
        </PageNumber>
      ))}
    </PageNationWrap>
  );
};

const PageNationWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const PageNumber = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

export default PagiNation;
