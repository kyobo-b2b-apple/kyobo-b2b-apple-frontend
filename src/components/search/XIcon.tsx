import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import Image from '../image/Image';
import ic_delete from '../../assets/img/search/ic_delete_desktop.png';

export enum XIconType {
  CLOSE = 'close',
  DELETE = 'delete',
}

interface XIconProps {
  type: XIconType;
  onClick: () => void;
}

const XIcon: FC<XIconProps> = ({ type, onClick }) => {
  return (
    <IconWrapper type={type} onClick={onClick}>
      <Image width="27px" height="27px" src={ic_delete} alt="x-icon" />
    </IconWrapper>
  );
};
export default XIcon;

const IconWrapper = styled.div<XIconProps>`
  position: absolute;
  cursor: pointer;
  right: 0px;

  ${(props) =>
    props.type === XIconType.CLOSE &&
    css`
      @media screen and (min-width: 767px) {
        top: 32px;
      }
      @media screen and (max-width: 479px) {
        top: 23px;
      }
    `}

  ${(props) =>
    props.type === XIconType.DELETE &&
    css`
      bottom: 12px;
    `}
`;
