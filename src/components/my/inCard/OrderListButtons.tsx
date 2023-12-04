import { FC, useState } from 'react';
import styled from 'styled-components';
import CommonButton, { ButtonType } from '../../common/Button';
import { MediumButton03, MediumButton04, MediumButton05 } from '../../../styles/buttonStyle';
import CancleModal from '../../../components/modal/CancleModal';

interface OrderListButtonsProps {
  orderButtonText: string[];
  handleShippingClick: () => void;
  handleReviewClick: () => void;
}

//reviewId는 타입 추가

const OrderListButtons: FC<OrderListButtonsProps> = ({ orderButtonText, handleShippingClick, handleReviewClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ButtonListWrapper>
      <ShippingButton type={ButtonType.Primary} onClick={handleShippingClick}>
        배송조회
      </ShippingButton>

      <GeneralWrapper>
        <GeneralButton type={ButtonType.Secondary} onClick={handleOpenModal}>
          {orderButtonText[0]}
        </GeneralButton>
        <GeneralButton type={ButtonType.Secondary} onClick={handleReviewClick}>
          {orderButtonText[1]}
        </GeneralButton>
      </GeneralWrapper>
      <CancleModal modalOpen={isModalOpen} modalClose={handleCloseModal} onCouponSubmit={() => {}} />
    </ButtonListWrapper>
  );
};
export default OrderListButtons;

const ButtonListWrapper = styled.div`
  display: flex;

  @media screen and (min-width: 480px) {
    gap: 0px 6px;
    margin-top: auto;
  }
  @media screen and (max-width: 479px) {
    gap: 7px 0px;
    flex-direction: column;
  }
`;

const ShippingButton = styled(CommonButton)`
  @media screen and (min-width: 480px) {
    ${MediumButton03}
  }
  @media screen and (max-width: 479px) {
    ${MediumButton05}
  }
`;

const GeneralWrapper = styled.div`
  display: flex;
  gap: 0px 5px;
`;

const GeneralButton = styled(CommonButton)`
  white-space: nowrap;

  @media screen and (min-width: 480px) {
    ${MediumButton04}
  }
  @media screen and (max-width: 479px) {
    ${MediumButton05}
  }
`;
