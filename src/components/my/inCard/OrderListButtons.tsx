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
  orderId: number;
}

enum FirstBtnText {
  ORDER_RECEIVED = '취소 요청',
  PREPARE_PRODUCT = '취소 요청',
  DELIVERY_START = '교환/환불 신청',
  IN_TRANSIT = '교환/환불 신청',
  DELIVERY_COMPLETED = '교환/환불 신청',
}

const OrderListButtons: FC<OrderListButtonsProps> = ({
  orderId,
  orderState,
  handleShippingClick,
  handleReviewClick,
}) => {
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
  const handleCancleCloseModal = () => {
    setIsCancleOpen(false);
  };

  const handleRefundInfoOpenModal = () => {
    setIsRefundInfoOpen(true);
  };

  const handleRefundInfoCloseModal = () => {
    setIsRefundInfoOpen(false);
  };

  const handleRefundInfoSubmitModal = () => {
    setIsRefundInfoOpen(false);
    setIsRefundApplyOpen(true);
  };

  const handleRefundApplyCloseModal = () => {
    setIsRefundApplyOpen(false);
  };

  return (
    <ButtonListWrapper>
      <ShippingButton type={ButtonType.Primary} onClick={handleShippingClick}>
        배송조회
      </ShippingButton>

      <GeneralWrapper>
        <GeneralButton
          type={ButtonType.Secondary}
          onClick={FirstBtnText[orderState] === '취소 요청' ? handleCancleOpenModal : handleRefundInfoOpenModal}
        >
          {FirstBtnText[orderState]}
        </GeneralButton>
        <GeneralButton type={ButtonType.Secondary} onClick={handleReviewClick}>
          후기 작성하기
        </GeneralButton>
      </GeneralWrapper>
      {FirstBtnText[orderState] === '취소 요청' ? (
        <CancleModal
          modalOpen={isCancleOpen}
          modalClose={handleCancleCloseModal}
          onCancleSubmit={setForm}
          orderId={orderId}
        />
      ) : (
        <>
          <ExRefundApplyModal
            modalOpen={isRefundApplyOpen}
            modalClose={handleRefundApplyCloseModal}
            setForm={setForm}
            inputString={['dd']}
          />
          <ExRefundInfoModal
            modalOpen={isRefundInfoOpen}
            modalClose={handleRefundInfoCloseModal}
            onSubmit={handleRefundInfoSubmitModal}
            inputString={['dd']}
          />
        </>
      )}
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
