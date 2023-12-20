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
  modalClose: () => void;
  onSubmit: () => void;
}

const ExRefundInfoModal: React.FC<RefundProps> = ({ modalOpen, inputString, modalClose, onSubmit }) => {
  const [isCheck, setIsCheck] = useState(false);
  const infoTitle = ['공통 안내사항', '애플 안내사항', '교환,반품이 불가능한 경우'];

  const checkBoxClick = () => {
    setIsCheck((prev) => !prev);
  };

  const onClick = () => {
    if (!isCheck) {
      return alert('동의가 필요합니다.');
    }

    modalClose();
    setIsCheck(false);

    onSubmit();
  };

  return (
    <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="교환/반품 안내">
      <Spacer height={38} />
      {infoTitle.map((title, idx) => (
        <>
          <Text key={idx} $fontType="H3" color="white">
            {title}
          </Text>
          <Spacer height={10} />
          <TextBox width="100%" bgColor="grey90">
            {inputString.map((e, idx) => (
              <Text $fontType="Body04" color="grey30" key={idx}>
                {'- ' + e}
              </Text>
            ))}
          </TextBox>
          <Spacer height={12} />
        </>
      ))}
      <CheckBoxBtnContainer>
        <CheckBoxBtn onClick={checkBoxClick} />
        <Text $fontType="Body04" color="white">
          해당 안내사항에 대한 약관 및 규정에 동의합니다.
        </Text>
      </CheckBoxBtnContainer>
      <Spacer height={10} />
      <CommonButton width={'100%'} type={isCheck ? ButtonType.Primary : ButtonType.Secondary} onClick={onClick}>
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
