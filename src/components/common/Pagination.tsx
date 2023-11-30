import React from 'react';
import styled from 'styled-components';
import { SetStateAction, Dispatch } from 'react';
import { PaginationItem } from '@mui/material';
import PaginationComponent from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface PageProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPages, currentPage, setCurrentPage }: PageProps) => {
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <PageWrapper>
      <Stack spacing={2}>
        <PaginationComponent
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          sx={{
            color: 'white',
          }}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                '&.Mui-selected': {
                  color: 'white',
                },
                fontSize: 17,
                color: '#b0b0b0',
              }}
            />
          )}
        />
      </Stack>
    </PageWrapper>
  );
};
export default Pagination;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
