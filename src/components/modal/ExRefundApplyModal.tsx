import Modal, { ModalType } from './Modal';
import TextBox from '../common/TextBox';
import TextArea from '../common/TextArea';
import { Text } from '../common';
import CommonButton, { ButtonType } from '../common/Button';
import { Spacer } from '../common';
import { useState } from 'react';
import RadioButton from '../common/RadioButton';
import styled from 'styled-components';

interface ExRefundProps {
  setForm: (input: string[]) => void;
  modalOpen: boolean;
  inputString: string[];
  modalClose: () => void;
}

const ExRefundApplyModal: React.FC<ExRefundProps> = ({ setForm, modalOpen, modalClose, inputString }) => {
  const [reason, setReason] = useState('');
  const [cancleType, setCancleType] = useState('교환');

  const handleInputChange = (e) => {
    setReason(e.target.event);
  };

  const handleCancleTypeChange = (value) => {
    setCancleType(value);
  };

  return (
    <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="교환/반품 신청">
      <Spacer height={38} />
      <Text $fontType="H3" color="white">
        교환/반품 상태 선택&#40;필수&#41;
      </Text>
      <Spacer height={10} />
      <RadioContainer>
        <RadioButton value="교환" label="교환" onSelect={handleCancleTypeChange} checked={cancleType === '교환'} />
        <RadioButton value="환불" label="환불" onSelect={handleCancleTypeChange} checked={cancleType === '환불'} />
      </RadioContainer>
      <Spacer height={12} />
      <Text $fontType="H3" color="white">
        사유 입력
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
      <Spacer height={10} />
      <TextBox width="100%" bgColor="grey90">
        {inputString.map((e, idx) => (
          <Text $fontType="Body04" color="grey30" key={idx}>
            {'- ' + e}
          </Text>
        ))}
      </TextBox>
      <Spacer height={12} />
      <CommonButton width={'100%'} type={ButtonType.Secondary} onClick={() => {}}>
        확인
      </CommonButton>
    </Modal>
  );
};

export default ExRefundApplyModal;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
`;
