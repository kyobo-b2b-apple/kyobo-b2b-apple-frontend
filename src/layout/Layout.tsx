import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComponent from '../components/Header/Header';
import FooterComponent from '../components/Footer';
import { FOOTER_HIDDEN_PAGE_URL } from '../constants/footerHiddenUrl';
import FloatingButton from '../components/common/FloatingButton';
import { HEADER_HIDDEN_PAGE_URL } from '../constants/headerHiddenUrl';
import Login from '../pages/loginPage/Login';

const Layout: React.FC = () => {
    const [hideFooter, setHideFooter] = useState(false);
    const [hideHeaderWrapper, setHideHeaderWrapper] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (FOOTER_HIDDEN_PAGE_URL.includes(location.pathname)) {
            setHideFooter(true);
        } else {
            setHideFooter(false);
        }

    }, [location]);



    return (
        <Container>
            {!hideFooter && (
                <>
                    <HeaderWrapper>
                        <HeaderComponent />
                    </HeaderWrapper>
                    <FloatingButton />

                </>
            )}
            <OutletWrapper>
                <Outlet />
            </OutletWrapper>
            {!hideFooter && (
                <FooterWrapper>
                    <FooterComponent />
                </FooterWrapper>
            )}
        </Container>
    );
};

export default Layout;

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'outlet'
    'footer';
  grid-template-rows: auto 1fr auto;
  height: 100%;
  width: 100vw;
`;

const HeaderWrapper = styled.header`
  grid-area: header;
  width: 100vw;
  background-color: ${(props) => props.theme.color.black};
`;

const OutletWrapper = styled.div`
  grid-area: outlet;
  width: 100%;
  margin: auto;
  background-color: ${(props) => props.theme.color.bgColor};
`;

const FooterWrapper = styled.footer`
  grid-area: footer;
  width: 100vw;
  background-color: ${(props) => props.theme.color.black};
`;
