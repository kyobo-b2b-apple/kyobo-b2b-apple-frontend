import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import ContentsWidthLayout from '../../layout/contentsWidthLayout';
import CommonButton, { ButtonType } from '../../components/common/Button';
import Image from '../../components/image/Image';
import { Text, Spacer } from '../../components/common';
import { SmallButton01 } from '../../styles/buttonStyle';
import useMediaFont from '../../hooks/useMediaFont';
import useMediaPX from '../../hooks/useMediaPX';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventDetail } from '../../api/eventApi';
import { EventItem } from '../../interfaces/EventItemProps';

interface DetailImage {
  id: number;
  imgSrc: string;
  order: number;
}

interface BannerItem extends EventItem {
  detailImages: DetailImage[];
}

const BannerPage = () => {
  const fontType = useMediaFont({ desktop: 'H0', tablet: 'H2', mobile: 'H2' });
  const topSpace = useMediaPX({ desktop: '9px', tablet: '13px', mobile: '13px' });
  const titleSpace = useMediaPX({ desktop: '15px', tablet: '13px', mobile: '8px' });
  const bottomSpace = useMediaPX({ desktop: '115px', tablet: '121px', mobile: '48px' });
  const imageSpace = useMediaPX({ desktop: '19px', tablet: '10px', mobile: '10px' });
  const [data, setData] = useState<BannerItem>();
  const [formattedDate, setFormattedDate] = useState('');
  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleEventListClick = () => {
    navigate('/event');
  };

  const formatDate = (dateArr: number[]) => {
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    return `${year % 100}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  };

  const getData = useCallback(async (eventId) => {
    const result = await getEventDetail(eventId);
    setData(result.data.result);
    setFormattedDate(formatDate(result.data.result.createdAt));
  }, []);

  useEffect(() => {
    getData(parseInt(eventId || ''));
  }, [eventId, getData]);

  return (
    <ContentsWidthLayout $type="full">
      <ContentsWidthLayout $type="responsive">
        <Spacer height="24px" />
        <TopWrapper>
          <Text $fontType={fontType} color="white">
            이벤트
          </Text>
          <BannerListButton type={ButtonType.Primary} padding="0" onClick={handleEventListClick}>
            목록보기
          </BannerListButton>
        </TopWrapper>
        <Spacer height={topSpace} />

        <TitleWrapper>
          <Text $fontType="Body03" color="white">
            제목
          </Text>
          <Spacer width={titleSpace} />
          <Text $fontType="Body04" color="white">
            {data?.name}
          </Text>
          <DateText $fontType="Body04" color="grey30">
            {formattedDate}
          </DateText>
        </TitleWrapper>

        <Spacer height={imageSpace} />
        {data?.detailImages.map((item) => <Image key={item.id} src={item.imgSrc} alt="banner-image" />)}
        <Spacer height={bottomSpace} />
      </ContentsWidthLayout>
    </ContentsWidthLayout>
  );
};
export default BannerPage;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 51px;
  padding: 16px;
  border-radius: 8px;
  background: #2c2c2c;
  display: flex;
  align-items: center;
`;

const DateText = styled(Text)`
  margin-left: auto;
`;

const BannerListButton = styled(CommonButton)`
  ${SmallButton01}
  background: ${(props) => props.theme.color.blue};
  margin-left: auto;
`;
