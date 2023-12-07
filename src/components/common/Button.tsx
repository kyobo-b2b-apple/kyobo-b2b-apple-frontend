import React from 'react';
import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

export enum ButtonType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  Ghost = 'GHOST',
}

interface ButtonProps extends PropsWithChildren<{}> {
  onClick?: () => void;
  type: ButtonType;
  htmlType?: 'submit' | 'reset' | 'button';
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  as?: string;
}
const CommonBtnStyle = css<{ width?: string | number; height?: string | number; padding?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}` : 'auto')};
  height: ${(props) => (props.height ? `${props.height}` : 'auto')};
  padding: ${(props) => (typeof props.padding === 'number' ? `${props.padding}px` : props.padding || '13px 16px')};
`;
const PrimaryBtn = styled.button<{ width?: string | number }>`
  ${CommonBtnStyle}
  background: ${(props) => props.theme.color.blue};
  color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.blue};
`;

const SecondaryBtn = styled.button<{ width?: string | number }>`
  ${CommonBtnStyle}
  background: ${(props) => props.theme.color.grey70};
  color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.grey50};
`;
const GhostBtn = styled.button<{ width?: string | number }>`
  ${CommonBtnStyle}
  background: rgba(69, 137, 255, 0.20);
  color: ${(props) => props.theme.color.blue};
  border: 1px solid ${(props) => props.theme.color.blue10};
`;

const CommonButton: React.FC<ButtonProps> = ({ children, onClick, type, htmlType = 'button', ...rest }) => {
  const buttons = {
    [ButtonType.Primary]: PrimaryBtn,
    [ButtonType.Secondary]: SecondaryBtn,
    [ButtonType.Ghost]: GhostBtn,
  };
  const ButtonComponent = buttons[type];
  return (
    <ButtonComponent onClick={onClick} {...rest}>
      {children}
    </ButtonComponent>
  );
};

export default CommonButton;
