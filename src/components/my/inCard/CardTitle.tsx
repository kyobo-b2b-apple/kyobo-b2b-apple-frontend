import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../common';
import useMediaFont from '../../../hooks/useMediaFont';

interface CardTitleProps extends PropsWithChildren {
  label?: string;
  isBlock?: boolean;
}

const CardTitle = ({ label, children, isBlock }: CardTitleProps) => {
  const fontType = useMediaFont({ desktop: 'H3', tablet: 'H3', mobile: 'Body03' });
  return (
    <TitleWrapper isBlock={isBlock}>
      {label && (
        <Text $fontType={fontType} color="white">
          {label}
        </Text>
      )}
      {children}
    </TitleWrapper>
  );
};
export default CardTitle;

const TitleWrapper = styled.div<{ isBlock?: boolean }>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.isBlock &&
    css`
      @media screen and (max-width: 479px) {
        display: block;
      }
    `}
`;
