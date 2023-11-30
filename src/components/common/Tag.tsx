import React from 'react';
import styled, { css } from 'styled-components';
import { PropsWithChildren } from 'react';
import { Body01Style, Body04Style, Body05Style } from '../../styles/typographyStyles';

export enum ShapeType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
}
export enum ColorType {
  PRIMARY = 'primary',
  GHOST = 'ghost',
}

export interface TagProps extends PropsWithChildren {
  shape?: ShapeType;
  color?: ColorType;
  onClick?: () => void;
  width?: number;
  height?: number;
  fontType?: keyof typeof import('../../styles/theme').default.text;
}

export const Tag: React.FC<TagProps> = ({
  children,
  shape = ShapeType.RECTANGLE,
  color = ColorType.PRIMARY,
  ...rest
}) => {
  return (
    <TagWrapper shape={shape} color={color} {...rest}>
      <TagText shape={shape} color={color} {...rest}>
        {children}
      </TagText>
    </TagWrapper>
  );
};

const RectangleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
`;

const CircleStyle = css`
  display: inline-block;
  padding: 10px 15px;
  border-radius: 17px;
  cursor: pointer;
`;

const TagWrapper = styled.div<TagProps>`
  ${(props) => (props.shape === ShapeType.RECTANGLE ? RectangleStyle : CircleStyle)};

  ${(props) =>
    props.shape === ShapeType.RECTANGLE &&
    css`
      @media screen and (min-width: 768px) {
        width: ${props.width ? `${props.width}px` : '211px'};
        height: ${props.height ? `${props.height}px` : '51px'};
      }
      @media screen and (max-width: 767px) {
        width: ${props.width ? `${props.width}px` : '175px'};
        height: ${props.height ? `${props.height}px` : '51px'};
      }
      @media screen and (max-width: 479px) {
        width: ${props.width ? `${props.width}px` : '100px'};
        height: ${props.height ? `${props.height}px` : '42px'};
      }
    `}

  ${(props) =>
    props.color === ColorType.PRIMARY
      ? css`
          background: ${(props) => props.theme.color.grey70};
        `
      : css`
          background: rgba(69, 137, 255, 0.2);
          border: ${(props) => `1px solid ${props.theme.color.blue}`};
        `}
`;

const RectangleText = css`
  @media screen and (min-width: 768px) {
    ${Body01Style}
  }
  @media screen and (max-width: 767px) {
    ${Body04Style}
    letter-spacing: -0.7px;
  }
`;

const CircleText = css`
  ${Body05Style}
  line-height: 12.5px;
  letter-spacing: -0.7px;
`;

const TagText = styled.div<TagProps>`
  white-space: nowrap;
  ${({ fontType, shape, theme }) =>
    fontType
      ? css`
          font-size: ${theme.text[fontType]?.size};
          font-weight: ${theme.text[fontType]?.weight};
        `
      : css`
          ${shape === ShapeType.RECTANGLE ? RectangleText : CircleText};
        `};

  ${({ color, theme }) =>
    color === ColorType.PRIMARY
      ? css`
          color: ${theme.color.grey20};
        `
      : css`
          color: ${theme.color.blue10};
        `};
`;
