import styled from 'styled-components';
import cart from '../../assets/img/floating/ic_float_cart.png';
import heart from '../../assets/img/floating/ic_float_heart.png';
import pagedown from '../../assets/img/floating/ic_float_pagedown.png';
import pageup from '../../assets/img/floating/ic_float_pageup.png';
import mypage from '../../assets/img/floating/Mypage.png';
import Image from '../image/Image';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import scrollToBottom from '../../utils/scrollToBottom';
import scrollToTop from '../../utils/scrollToTop';

const FloatingButton = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const handleMypageClick = () => {
    if (isLoggedIn) {
      navigate('/my-page/order-list');
    } else {
      navigate('/login');
    }
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/my-page/cart');
    } else {
      navigate('/login');
    }
  };

  const handleHeartClick = () => {
    if (isLoggedIn) {
      navigate('/my-page/wish-list');
    } else {
      navigate('/login');
    }
  };

  const handlePageupClick = () => {
    scrollToTop();
  };

  const handlePagedownClick = () => {
    scrollToBottom();
  };

  return (
    <FloatingContainer>
      <IconWrap onClick={handleMypageClick}>
        <Image src={mypage} alt="mypage-icon" />
      </IconWrap>
      <IconWrap onClick={handleCartClick}>
        <Image src={cart} width="20" height="18" alt="cart-icon" />
      </IconWrap>
      <IconWrap onClick={handleHeartClick}>
        <Image src={heart} width="16" height="16" alt="heart-icon" />
      </IconWrap>
      <IconWrap onClick={handlePageupClick}>
        <Image src={pageup} width="21" height="20" alt="pageup-icon" />
      </IconWrap>
      <IconWrap onClick={handlePagedownClick}>
        <Image src={pagedown} width="21" height="20" alt="pagedown-icon" />
      </IconWrap>
    </FloatingContainer>
  );
};
export default FloatingButton;

const FloatingContainer = styled.div`
  width: 55px;
  height: 182px;
  border-radius: 32.5px;
  background: #010101;
  box-shadow: 0px 4px 4px 6px rgba(53, 53, 53, 0.05);
  padding: 27px 6px 28px 6px;

  position: fixed;
  z-index: 999;
  margin-left: auto;

  @media screen and (min-width: 768px) {
    bottom: 330px; // 3
    right: 80px; // 109
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    bottom: 400px; // 30
    right: 30px;
  }
  @media screen and (max-width: 479px) {
    display: none;
  }
`;
const IconWrap = styled.div`
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #2c2c2c;
  }
`;
