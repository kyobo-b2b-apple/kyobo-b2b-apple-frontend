import React from 'react';
import styled, { css } from 'styled-components';

interface CustomTextProps {
  $fontType: keyof typeof import('../../styles/theme').default.text;
  children: any;
  color?: keyof typeof import('../../styles/theme').default.color | string;
  textDecoration?: string;
  lineHeight?: string;
}

const Text = styled.p.attrs<CustomTextProps>((props) => props)`
  ${({ theme, $fontType, color, textDecoration, lineHeight }) => css`
    font-size: ${theme.text[$fontType].size};
    font-weight: ${theme.text[$fontType].weight};
    color: ${color ? theme.color[color] : theme.color.black};
    text-decoration: ${textDecoration || 'none'};
    line-height: ${lineHeight || 'normal'};
  `}
` as React.FC<CustomTextProps>;

export default Text;
