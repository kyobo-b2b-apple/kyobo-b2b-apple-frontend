import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalType } from './Modal';
import Text from '../common/Text';
import Spacer from '../common/Spacer';
import CommonButton, { ButtonType } from '../common/Button';
import { InputStyle } from '../common/Input';

export interface CouponModalProps {
  modalOpen: boolean;
  modalClose: () => void;
  onCouponSubmit: (couponCode: string) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ modalOpen, modalClose, onCouponSubmit }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleInputChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleSubmit = () => {
    onCouponSubmit(couponCode);
    modalClose();
  };

  return (
    <>
      <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="취소 요청">
        <Spacer height={38} />
        <InputItemContainer>
          <Text $fontType="H3" color="white">
            취소 사유
          </Text>
          <Spacer height={10} />

          <Spacer height={12} />
          <Text $fontType="H3" color="white">
            상세 사유 &#40;선택&#41;
          </Text>
          <Spacer height={10} />
          <InputStyle
            name="coupon"
            placeholder="상세 사유를 입력해주세요.(최대 300자)"
            width="100%"
            height={'162px'}
            value={couponCode}
            onChange={(e) => handleInputChange(e)}
          />
        </InputItemContainer>
        <Spacer height={89} />
        <CommonButton width={'100%'} type={ButtonType.Secondary} onClick={() => handleSubmit()}>
          확인
        </CommonButton>
      </Modal>
    </>
  );
};

export default CouponModal;

const InputItemContainer = styled.div``;
