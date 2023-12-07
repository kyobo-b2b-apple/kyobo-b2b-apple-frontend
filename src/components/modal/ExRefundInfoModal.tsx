import Modal, { ModalType } from './Modal';
import TextBox from '../common/TextBox';
import CommonButton, { ButtonType } from '../common/Button';
import Text from '../../components/common/Text';
import { Spacer } from '../common';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import styled from 'styled-components';
import { useState } from 'react';

interface RefundProps {
  modalOpen: boolean;
  inputString: string[];
  onSubmit: () => void;
  modalClose: () => void;
}

const ExRefundInfoModal: React.FC<RefundProps> = ({ modalOpen, inputString, modalClose, onSubmit }) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="교환/반품 안내">
      <Spacer height={38} />
      <Text $fontType="H3" color="white">
        공통 안내사항
      </Text>
      <Spacer height={10} />
      <TextBox width="100%" inputString={inputString}></TextBox>
      <Spacer height={12} />
      <Text $fontType="H3" color="white">
        애플 안내사항
      </Text>
      <Spacer height={10} />
      <TextBox width="100%" inputString={inputString}></TextBox>
      <Spacer height={12} />
      <Text $fontType="H3" color="white">
        교환,반품이 불가능한 경우
      </Text>
      <Spacer height={10} />
      <TextBox width="100%" inputString={inputString}></TextBox>
      <Spacer height={12} />
      <CheckBoxBtnContainer>
        <CheckBoxBtn
          onClick={() => {
            setIsCheck(!isCheck);
          }}
        />
        <Text $fontType="Body03" color="white">
          해당 안내사항에 대한 약관 및 규정에 동의합니다.
        </Text>
      </CheckBoxBtnContainer>
      <Spacer height={10} />
      <CommonButton
        width={'100%'}
        type={isCheck ? ButtonType.Primary : ButtonType.Secondary}
        onClick={() => onSubmit()}
      >
        확인
      </CommonButton>
    </Modal>
  );
};

export default ExRefundInfoModal;

const CheckBoxBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
