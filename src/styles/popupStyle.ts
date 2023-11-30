import { css } from 'styled-components';

export const PopupWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContentStyle = css`
  @media (min-width: 480px) {
    padding: 43px 47px 56px 47px;
    border-radius: 33px;
    width: 558px;
  }

  @media (max-width: 479px) {
    padding: 47px 20px 27px 20px;
    width: 100%;
    height: 100%;
  }
`;
