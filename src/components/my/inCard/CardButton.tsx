import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import CommonButton, { ButtonType } from '../../common/Button';
import { MediumButton03, MediumButton05 } from '../../../styles/buttonStyle';

interface CardButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

const CardButton = ({ children, onClick }: CardButtonProps) => {
  return (
    <PrimaryButton type={ButtonType.Primary} onClick={onClick}>
      {children}
    </PrimaryButton>
  );
};
export default CardButton;

const PrimaryButton = styled(CommonButton)`
  margin-top: auto;
  white-space: nowrap;
  @media screen and (min-width: 480px)  {
    ${MediumButton03}
  }
  @media screen and (max-width: 479px) {
    ${MediumButton05}
  }
`;
