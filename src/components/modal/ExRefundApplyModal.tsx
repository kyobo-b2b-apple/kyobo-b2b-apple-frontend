import Modal, { ModalType } from './Modal';
import TextBox from '../common/TextBox';
import TextArea from '../common/TextArea';
import { Text } from '../common';
import CommonButton, { ButtonType } from '../common/Button';
import { Spacer } from '../common';
import { useRef, useState } from 'react';
import RadioButton from '../common/RadioButton';
import styled from 'styled-components';
import SelectDropDown from '../common/SelectDropDown';

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
  const [cancleType, setCancleType] = useState(ClaimStatus.EXCHANGE);

  const handleCancleTypeChange = (value) => {
    setCancleType(value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log('wkrehd');
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(formData.get('exRefund'));
    formData.append('cancleType', cancleType);
    const data = Object.fromEntries(formData);
    console.log('data', data);

    modalClose();
  }

  return (
    <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="교환/반품 신청">
      <form onSubmit={handleSubmit}>
        <Spacer height={38} />
        <InputContainer>
          <div>
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
          </div>
          <div>
            <Text $fontType="H3" color="white">
              사유 입력(필수)
            </Text>
            <Spacer height={10} />
            {/* <SelectDropDown menuItems, setTitle, selectTitle={"상품을 선택해주세요."}/> */}
          </div>
          <div>
            <Text $fontType="H3" color="white">
              사유 입력(필수)
            </Text>
            <Spacer height={10} />
            <TextArea
              name="exRefund"
              placeholder="상세 사유를 입력해주세요.(최대 300자)"
              width="100%"
              height="162px"
              padding="13px"
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
          </div>
          <CommonButton width={'100%'} htmlType="submit" type={ButtonType.Secondary}>
            확인
          </CommonButton>
        </InputContainer>
      </form>
    </Modal>
  );
};

export default ExRefundApplyModal;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-bottom: 98px;
`;
