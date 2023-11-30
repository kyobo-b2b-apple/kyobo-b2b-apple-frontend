import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

const ImageSwiper = ({ items, type = 100 }) => {
  const navigate = useNavigate();
  const handleBannerClick = (id) => {
    navigate(`/banner/${id}`);
  };

  return (
    <SwiperWrapper>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ height: '100%', width: '100%' }}
      >
        {items.map((item, index) => (
          <StyledSwiperSlide key={index} onClick={() => handleBannerClick(item.id || 1)}>
            <SwipeImgWrap type={type}>
              <SwiperImg src={item.thumbnailImgSrc || item} alt={`slide-${index + 1}`} />
            </SwipeImgWrap>
          </StyledSwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
};

export default ImageSwiper;

const SwiperWrapper = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.color.black};

  .swiper-button-next {
    top: 50%;
    right: 2%;
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.color.white};
  }
  .swiper-button-prev {
    top: 50%;
    left: 2%;
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.color.white};
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const SwipeImgWrap = styled.div`
  @media screen and (min-width: 768px) {
    width: ${(props) => props.type}%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const SwiperImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;
