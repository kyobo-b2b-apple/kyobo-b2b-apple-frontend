import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import CommonButton, { ButtonType } from '../../common/Button';
import { MediumButton03, MediumButton04, MediumButton05 } from '../../../styles/buttonStyle';
import CancleModal from '../../../components/modal/CancleModal';
import ExRefundApplyModal from '../../modal/ExRefundApplyModal';
import ExRefundInfoModal from '../../modal/ExRefundInfoModal';

interface OrderListButtonsProps {
  orderState: string;
  handleShippingClick: () => void;
  handleReviewClick: () => void;
}

//reviewId는 타입 추가

enum BtnString {
  ORDER_RECEIVED = '주문 수락',
  PREPARE_PRODUCT = '배송준비중',
  DELIVERY_START = '배송시작',
  IN_TRANSIT = '배송중',
  DELIVERY_COMPLETED = '배달완료',
}

enum FirstBtnString {
  ORDER_RECEIVED = '취소 요청',
  PREPARE_PRODUCT = '취소 요청',
  DELIVERY_START = '교환/환불 신청',
  IN_TRANSIT = '교환/환불 신청',
  DELIVERY_COMPLETED = '교환/환불 신청',
}

const OrderListButtons: FC<OrderListButtonsProps> = ({ orderState, handleShippingClick, handleReviewClick }) => {
  const [isCancleOpen, setIsCancleOpen] = useState(false);
  const [isRefundInfoOpen, setIsRefundInfoOpen] = useState(false);
  const [isRefundApplyOpen, setIsRefundApplyOpen] = useState(false);

  const [form, setForm] = useState(['', '']);

  useEffect(() => {
    // console.log(form);
  }, [form]);

  const handleCancleOpenModal = () => {
    setIsCancleOpen(true);
  };

  const handleRefundInfoOpenModal = () => {
    setIsRefundInfoOpen(true);
  };

  const handleCloseModal = () => {
    if (isCancleOpen) {
      setIsCancleOpen(false);
    } else if (isRefundInfoOpen) {
      setIsRefundInfoOpen(false);
    } else if (isRefundApplyOpen) {
      setIsRefundApplyOpen(false);
    }
  };

  const handleRefundInfpCloseModal = () => {
    setIsRefundInfoOpen(false);
    setIsRefundApplyOpen(true);
  };

  return (
    <ButtonListWrapper>
      <ShippingButton type={ButtonType.Primary} onClick={handleShippingClick}>
        배송조회
      </ShippingButton>

      <GeneralWrapper>
        <GeneralButton
          type={ButtonType.Secondary}
          onClick={FirstBtnString[orderState] === '취소 요청' ? handleCancleOpenModal : handleRefundInfoOpenModal}
        >
          {FirstBtnString[orderState]}
        </GeneralButton>
        <GeneralButton type={ButtonType.Secondary} onClick={handleReviewClick}>
          후기 작성하기
        </GeneralButton>
      </GeneralWrapper>
      <ExRefundApplyModal
        modalOpen={isRefundApplyOpen}
        modalClose={handleCloseModal}
        setForm={setForm}
        inputString={['dd']}
      />
      <ExRefundInfoModal
        modalOpen={isRefundInfoOpen}
        modalClose={handleCloseModal}
        inputString={['dd']}
        onSubmit={handleRefundInfpCloseModal}
      />
      <CancleModal modalOpen={isCancleOpen} modalClose={handleCloseModal} onCancleSubmit={setForm} />
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
