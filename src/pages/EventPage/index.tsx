import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ContentsLayout from '../../layout/contentsWidthLayout';
import Image from '../../components/image/Image';
import { Text, Spacer, FilterBar, Pagination } from '../../components/common';
import { eventFilters } from '../../constants/filters';
import useMediaFont from '../../hooks/useMediaFont';
import useMediaPX from '../../hooks/useMediaPX';
import { getEventList } from '../../api/eventApi';
import { useNavigate } from 'react-router-dom';
import { EventItem } from '../../interfaces/EventItemProps';

const EventPage = () => {
  const fontType = useMediaFont({ desktop: 'H0', tablet: 'H2', mobile: 'H2' });
  const textSpace = useMediaPX({ desktop: '9px', tablet: '13px', mobile: '13px' });
  const filterSpace = useMediaPX({ desktop: '19px', tablet: '10px', mobile: '10px' });
  const imageSpace = useMediaPX({ desktop: '25px', tablet: '15px', mobile: '7px' });
  const pageSpace = useMediaPX({ desktop: '58px', tablet: '38px', mobile: '28px' });
  const bottomSpace = useMediaPX({ desktop: '138px', tablet: '143px', mobile: '118px' });

  const [filterValue, setFilterValue] = useState('전체');
  const [totalPages, setTotalPages] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<EventItem[]>([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const setSort = (filterValue: string) => {
    console.log(filterValue);
    if (filterValue === '진행중인 이벤트') {
      return false;
    } else if (filterValue === '종료된 이벤트') {
      return true;
    } else {
      return null;
    }
  };

  const getData = useCallback(async (page: number, size: number, closed: boolean | null) => {
    const result = await getEventList(page, size, closed);
    setTotalPages(result.data.result.totalPages);
    setData(result.data.result.content);
  }, []);

  useEffect(() => {
    getData(currentPage, itemsPerPage, setSort(filterValue));
  }, [currentPage, itemsPerPage, filterValue, getData]);

  const handleEventClick = (eventId: number) => {
    navigate(`/banner/${eventId}`);
  };

  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <Spacer height="24px" />
        <Text $fontType={fontType} color="white">
          이벤트
        </Text>
        <Spacer height={textSpace} />
        <FilterBar filters={eventFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
        <Spacer height={filterSpace} />
        <ImgWrapper gap={imageSpace}>
          {data.map((item) => (
            <EventImage key={item.id} onClick={() => handleEventClick(item.id)}>
              <Image src={item.thumbnailImgSrc} alt="event-image" />
            </EventImage>
          ))}
        </ImgWrapper>
        <Spacer height={pageSpace} />
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Spacer height={bottomSpace} />
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default EventPage;

const ImgWrapper = styled.div<{ gap: string | number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

const EventImage = styled.div`
  cursor: pointer;
`;
