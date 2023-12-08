import Modal, { ModalType } from './Modal';
import TextBox from '../common/TextBox';
import TextArea from '../common/TextArea';
import { Text } from '../common';
import CommonButton, { ButtonType } from '../common/Button';
import { Spacer } from '../common';
import { useRef, useState } from 'react';
import RadioButton from '../common/RadioButton';
import styled from 'styled-components';

interface ExRefundProps {
  setForm: (input: string[]) => void;
  modalOpen: boolean;
  inputString: string[];
  modalClose: () => void;
}

enum ClaimStatus {
  EXCHANGE = '교환',
  REFUND = '환불',
}

const ExRefundApplyModal: React.FC<ExRefundProps> = ({ setForm, modalOpen, modalClose, inputString }) => {
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  const [reason, setReason] = useState<string>();
  const [cancleType, setCancleType] = useState(ClaimStatus.EXCHANGE);

  const onClick = () => {
    if (reasonRef.current) {
      if (reasonRef.current.value === '') {
        alert(cancleType + ' 사유를 입력해주십시오.');
      } else {
        setForm([cancleType, reasonRef.current.value]);
        setReason('');
        modalClose();

        setTimeout(() => {
          if (confirm(cancleType + ' 신청이 완료되었습니다. 교환 내역 상세로 이동하시겠습니까?')) {
            console.log('이동로직 구현');
          }
        }, 0);
      }
    }
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
        <RadioButton
          value={ClaimStatus.EXCHANGE}
          label={ClaimStatus.EXCHANGE}
          onSelect={handleCancleTypeChange}
          checked={cancleType === '교환'}
        />
        <RadioButton
          value={ClaimStatus.REFUND}
          label={ClaimStatus.REFUND}
          onSelect={handleCancleTypeChange}
          checked={cancleType === '환불'}
        />
      </RadioContainer>
      <Spacer height={12} />
      <Text $fontType="H3" color="white">
        사유 입력
      </Text>
      <Spacer height={10} />
      <TextArea
        name="exRefund"
        placeholder="상세 사유를 입력해주세요.(최대 300자)"
        width="100%"
        height="162px"
        padding="13px"
        maxLength={300}
        ref={reasonRef}
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
      <CommonButton width={'100%'} type={ButtonType.Secondary} onClick={onClick}>
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
