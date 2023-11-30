import styled from 'styled-components';
import { useIsOS, OS } from '../../hooks/useIsOS';
import { useDispatch } from 'react-redux';
import { setSideBarOpen } from '../../store/sidebarSlice';
import { Text } from '../common';
import { setMobileSideState } from '../../store/mobileSidebarSlice';

interface TitleProps {
  label: string;
}

const ContainerTitle = ({ label }: TitleProps) => {
  const isDesktop = useIsOS(OS.DESKTOP);
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(setSideBarOpen(true));
  };

  return (
    <TitleWrapper onClick={() => dispatch(setMobileSideState(true))} >
      {!isDesktop && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill="none"
          onClick={handleBackClick}
        >
          <path
            d="M18.75 22.166L10 13.9993L18.75 5.83268"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <Text $fontType="H1" color="white">
        {label}
      </Text>
    </TitleWrapper>
  );
};
export default ContainerTitle;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 5px;
`;
