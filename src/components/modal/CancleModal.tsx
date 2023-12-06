import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalType } from './Modal';
import Text from '../common/Text';
import Spacer from '../common/Spacer';
import CommonButton, { ButtonType } from '../common/Button';
import { InputStyle } from '../common/Input';
import SelectDropDown from '../../components/common/SelectDropDown';
import TextArea from '../../components/common/TextArea';

export interface CouponModalProps {
  modalOpen: boolean;
  modalClose: () => void;
  onCancleSubmit: (cancleReason: string[]) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ modalOpen, modalClose, onCancleSubmit }) => {
  const [reason, setReason] = useState('');
  const [reasonTitle, setReasonTitle] = useState('');

  const handleInputChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => {
    onCancleSubmit([reason, reasonTitle]);

    const answer = confirm(reason + ':' + reasonTitle);

    if (answer) {
      modalClose();
    }
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
          <SelectDropDown menuItems={['단순변심', '배송지연', '주문실수', '서비스 불만족']} setTitle={setReasonTitle} />
          <Spacer height={12} />
          <Text $fontType="H3" color="white">
            상세 사유 &#40;선택&#41;
          </Text>
          <Spacer height={10} />
          <TextArea
            name="cancle"
            placeholder="상세 사유를 입력해주세요.(최대 300자)"
            width="100%"
            height="162px"
            padding="13px"
            value={reason}
            onChange={(e) => handleInputChange(e)}
            maxLength={300}
          />
        </InputItemContainer>
        <Spacer height={10} />
        <InputStyle name="cancle" placeholder="-취소과 관련된 안내사항이 들어갑니다." width="100%" readOnly={true} />
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
