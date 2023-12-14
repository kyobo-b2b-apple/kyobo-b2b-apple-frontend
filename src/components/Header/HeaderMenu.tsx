import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Text from '../common/Text';

import Image from '../image/Image';
import kicoLogo from '../../assets/Logo/KicoMallLogo.svg';
import Spacer from '../common/Spacer';
import { OS, useIsOS } from '../../hooks/useIsOS';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/loginSlice';
import ContentsLayout from '../../layout/contentsWidthLayout';

const HeaderMenu = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const isDesktop = useIsOS(OS.DESKTOP);
  const isTablet = useIsOS(OS.TABLET);
  const isMobile = useIsOS(OS.MOBILE);

  return (
    <ContentsLayout $type="full" $backgroundColor="#181818">
      <HeaderMenuContainer isTablet={isTablet} isMobile={isMobile}>
        <LinkContainer isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}>
          <LinkBtn to="/reward" className="nav-link">
            <Text $fontType="Body03" color="white">
              보상판매
            </Text>
          </LinkBtn>
          <LinkBtn to="/inquiry" className="nav-link">
            <Text $fontType="Body03" color="white">
              기업문의
            </Text>
          </LinkBtn>
        </LinkContainer>
        <LogoContainer className="logo-container" to="/">
          <img src={kicoLogo} />
          {isMobile ? <Spacer width="19px" /> : <Spacer width="35px" />}
        </LogoContainer>

        <LinkContainer className="link-container" isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile}>
          {isLoggedIn ? (
            <>
              <LogoutBtn
                onClick={() => {
                  dispatch(logout());
                }}
                className="logout-link"
              >
                <Text $fontType="Body03" color="white">
                  로그아웃
                </Text>
              </LogoutBtn>
              <LinkBtn to="/join" className="nav-link">
                <Text $fontType="Body03" color="white">
                  회원가입
                </Text>
              </LinkBtn>
            </>
          ) : (
            <>
              <LinkBtn to="/login" className="login-link">
                <Text $fontType="Body03" color="white">
                  로그인
                </Text>
              </LinkBtn>
              <LinkBtn to="/join" className="nav-link">
                <Text $fontType="Body03" color="white">
                  회원가입
                </Text>
              </LinkBtn>
            </>
          )}
        </LinkContainer>
      </HeaderMenuContainer>
    </ContentsLayout>
  );
};

export default HeaderMenu;

const HeaderMenuContainer = styled.div<{ isTablet: boolean; isMobile: boolean }>`
  max-width: 868px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
  height: 73px;

  ${({ isTablet, isMobile }) =>
    (isTablet || isMobile) &&
    `
    .logo-container {
   
      
    }
  `}

  ${({ isMobile }) =>
    isMobile &&
    `
    .nav-link {
      display: none;
    }
    .login-link {
      display: none;
    }
    .login-link{
      display: block;
    }
  `}
`;

const LinkContainer = styled.div<{ isDesktop: boolean; isTablet: boolean; isMobile: boolean }>`
  display: flex;
  gap: ${({ isDesktop, isTablet }) => {
    if (isDesktop) {
      return '23px';
    } else {
      return '10px';
    }
  }};
`;
const LinkBtn = styled(Link)`
  color: ${(props) => props.theme.color.white};
`;

const LogoContainer = styled(Link)`
  display: flex;
  width: 50px;
  align-items: flex-end;

  justify-content: center;
  flex: 1;
`;

const LogoutBtn = styled.button`
  color: ${(props) => props.theme.color.white};
  background: none;
  padding: 0;
`;
