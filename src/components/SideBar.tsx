import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Spacer, Text } from './common';
import { OS, useIsOS } from '../hooks/useIsOS';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setSideBarOpen } from '../store/sidebarSlice';

import { SIDEBARMENU } from '../constants/sidebarMenu';
import Image from './image/Image';
import ic_back from '../assets/img/sidebar/ic_back.png';
import ic_benefit from '../assets/img/sidebar/ic_mypagebenefit.png';
import ic_profile from '../assets/img/sidebar/ic_mypageprofile.png';
import ic_shopping from '../assets/img/sidebar/ic_mypageshopping.png';
import ic_activity from '../assets/img/sidebar/ic_mypageactivity.png';

interface SideBarProps {
  isSidebarOpen: boolean;
  onLinkClick?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onLinkClick }) => {
  const dispatch = useDispatch();
  const isDesktop = useIsOS(OS.DESKTOP);
  const location = useLocation();
  // const isSidebarVisible = useSelector((state: RootState) => state.sidebar.isSideBarOpen);

  // console.log(isSidebarVisible);

  const iconMapping = (category) => {
    console.log(category);
    if (category === '쇼핑정보') {
      return ic_shopping;
    }
    if (category === '혜택관리') {
      return ic_benefit;
    }
    if (category === 'MY 정보') {
      return ic_profile;
    }
    if (category === 'MY 활동') {
      return ic_activity;
    }
  };

  return (
    // <SideContainer isShown={isSidebarVisible} isDesktop={isDesktop}>
    <SideContainer isDesktop={isDesktop}>
      <Spacer height={36} />
      <Text $fontType="H1" color="white">
        마이페이지
      </Text>
      <Spacer height={18} />
      {SIDEBARMENU.map((category, idx) => (
        <SideBarMenu key={idx}>
          {isDesktop ? (
            <Text $fontType="H3" color="white">
              {category.categoryName}
            </Text>
          ) : (
            <CategoryContainer>
              <CategoryIcon>
                <Image src={iconMapping(category.categoryName)} width="16" height="17" alt="shopping-icon" />
              </CategoryIcon>
              <Text $fontType="H3" color="white">
                {category.categoryName}
              </Text>
            </CategoryContainer>
          )}

          {category.menus.map((menu) => (
            <Link
              to={menu.path}
              key={menu.name}
              onClick={() => {
                !isDesktop && dispatch(setSideBarOpen(false));
                onLinkClick && onLinkClick();
              }}
            >
              {isDesktop ? (
                <Text
                  $fontType={location.pathname === menu.path ? 'Body04' : 'Body05'}
                  color={location.pathname === menu.path ? 'white' : 'grey20'}
                >
                  {menu.name}
                </Text>
              ) : (
                <MenuContainer>
                  <Text
                    $fontType={location.pathname === menu.path ? 'Body04' : 'Body05'}
                    color={location.pathname === menu.path ? 'white' : 'grey20'}
                  >
                    {menu.name}
                  </Text>
                  <MenuIcon>
                    <Image src={ic_back} width="12" height="12" alt="shopping-icon" />
                  </MenuIcon>
                </MenuContainer>
              )}
            </Link>
          ))}
        </SideBarMenu>
      ))}
    </SideContainer>
  );
};

export default SideBar;

const SideContainer = styled.div<{ isDesktop: boolean }>`
  margin-left: '15%';
  flex-direction: column;
  background-color: #1e1e1e;

  @media screen and (min-width: 480px) and (max-width: 767px) {
    padding: 0px 20px;
    margin-bottom: 50px;
  }
  @media screen and (max-width: 479px) {
    padding: 0px 20px;
    margin-bottom: 30px;
  }
`;

const SideBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  @media screen and (min-width: 768px) {
    gap: 11px;
    margin-bottom: 37px;
  }
  @media screen and (max-width: 767px) {
    gap: 18px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  height: 49px;
  border-radius: 8px;
  padding: 0px 14px;
  background: var(--Gray-80, #2c2c2e);
`;

const CategoryIcon = styled.div`
  display: flex;
  margin-right: 9px;
  padding-bottom: 2px;
`;

const MenuIcon = styled.div`
  margin-left: 4px;
  padding-bottom: 2px;
`;
