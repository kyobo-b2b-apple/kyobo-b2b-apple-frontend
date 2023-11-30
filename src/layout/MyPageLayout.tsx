import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OS, useIsOS } from '../hooks/useIsOS';

import ContentsLayout from './contentsWidthLayout';
import SideBar from '../components/SideBar';
import { RootState } from '../store/index';
import { setMobileSideState } from '../store/mobileSidebarSlice';




const MyPageLayout = () => {
  const dispatch = useDispatch();
  const isDesktop = useIsOS(OS.DESKTOP);
  // const [mobileSideState, setMobileSideState] = useState(true);
  const mobileSideState = useSelector((state: RootState) => state.mobileSidebar.isMobileSideBarOpen);


  console.log(mobileSideState, 'sssssssssssssss');

  return (
    <SidebarLayout $type="responsive" mediaType={isDesktop}>
      {isDesktop ? (
        <>
          <SideBar isSidebarOpen={isDesktop} />
          <Outlet />
        </>
      ) : mobileSideState ? (
        <SideBar
          isSidebarOpen={mobileSideState}
          onLinkClick={() => dispatch(setMobileSideState(false))}
        />
      ) : (
        <Outlet />
      )}
    </SidebarLayout>
  );
};

export default MyPageLayout;

const SidebarLayout = styled(ContentsLayout) <{ mediaType: boolean }>`
  display: grid;

  grid-template-columns: ${(props) => (props.mediaType ? '1fr 3fr' : '1fr')};
  position: relative;
  margin: ${(props) => (props.mediaType ? '' : '0')};
`;
