import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Text from '../common/Text';

import appleLogo from '../../assets/img/ic_applelogo.png';
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
          <svg
            width="127"
            height="35"
            viewBox="0 0 127 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
          >
            <rect width="127" height="35" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_147_3703" transform="matrix(0.0056243 0 0 0.0204082 -0.00899888 0)" />
              </pattern>
              <image
                id="image0_147_3703"
                width="181"
                height="49"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAAAxCAYAAACccuhnAAAAAXNSR0IArs4c6QAAAH5lWElmTU0AKgAAAAgAAwESAAMAAAABAAEAAAExAAIAAAAiAAAAModpAAQAAAABAAAAVAAAAABBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAALWgAwAEAAAAAQAAADEAAAAA1NQsBwAABJJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDowZTZmMmQ3Zi1lMzZkLWY1NGUtYmM0NC0yN2YzMDZiMDhhODk8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDpl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"
              />
            </defs>
          </svg>

          {isMobile ? <Spacer width="19px" /> : <Spacer width="35px" />}
          <img src={appleLogo} style={{ height: '35px' }} />
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
