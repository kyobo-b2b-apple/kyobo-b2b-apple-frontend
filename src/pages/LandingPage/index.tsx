import { Dispatch, SetStateAction } from 'react';
import ItemList from '../../components/ItemList';
import styled from 'styled-components';
import event from '../../assets/img/event.png';
import ContentsLayout from '../../layout/contentsWidthLayout';
import Spacer from '../../components/common/Spacer';
import ImageSwiper from '../../components/ImageSwiper';
import ImageSlider from '../../components/ImageSlider';
import NewImageSlider from '../../components/NewImgaeSlider';
import banner from '../../assets/img/banner.png';
import { useEffect, useState } from 'react';
import { landingApi } from '../../api/LandingApi';
import ItemProps from '../../interfaces/itemProps';
import { useNavigate } from 'react-router-dom';
import useMediaPX from '../../hooks/useMediaPX';

const LandingPage = () => {
  const [macItems, setMacItems] = useState<ItemProps[]>([]);
  const [ipadItems, setIpadItems] = useState<ItemProps[]>([]);
  const [accItems, setAccItems] = useState<ItemProps[]>([]);
  const bottomSpace = useMediaPX({ desktop: '194px', tablet: '107px', mobile: '82px' });

  const setItems = (category: string, size: number, setter: Dispatch<SetStateAction<ItemProps[]>>) => {
    landingApi(category, size)
      .then((data) =>
        setter(
          data.result.content.map((item: { id: string; thumbnails: string[]; description: string; price: any }) => ({
            id: item.id,
            thumbnails: item.thumbnails,
            description: item.description,
            price: item.price,
          })),
        ),
      )
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    setItems('Mac', 3, setMacItems);
    setItems('iPad', 6, setIpadItems);
    setItems('ACC', 3, setAccItems);
  }, []);
  const eventImg1 = event;
  const eventImg2 = event;


  const images = [
    'https://yong-server.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2023-09-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+7.58.10.png',
    'https://yong-server.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2023-09-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+7.58.25.png',
    'https://yong-server.s3.ap-northeast-2.amazonaws.com/banner.png'
  ];


  const navigate = useNavigate();
  const handleEventClick = (eventId: number) => {
    navigate(`/banner/${eventId}`);
  };

  return (
    <>
      <ContentsLayout $type="full">

        {/* <ImageSlider images={images} /> */}
        {/* <ImageSwiper items={images} /> */}
        <NewImageSlider images={images} />

        <ContentsLayout $type="responsive">
          <Spacer height="32px" />
          <ItemList type="landing" label="Mac 추천상품" items={macItems} />

          <EventImg src={eventImg1} onClick={() => handleEventClick(1)} />
          <Spacer height="32px" />
          <ItemList type="landing" label="iPad 추천상품" items={ipadItems} />
          <EventImg src={eventImg2} onClick={() => handleEventClick(1)} />
          <Spacer height="32px" />
          <ItemList type="landing" label="ACC 추천상품" items={accItems} />
          <Spacer height={bottomSpace} />
        </ContentsLayout>
      </ContentsLayout>
    </>
  );
};
const EventImg = styled.img`
  width: 100%;
  margin-top: 30px;
  @media (max-width: 868px) {
    height: auto;
  }
`;

export default LandingPage;
