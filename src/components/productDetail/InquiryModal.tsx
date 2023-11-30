import { styled } from 'styled-components';
import { Spacer, Text } from '../common';
import CommonButton, { ButtonType } from '../common/Button';
import { useState } from 'react';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import Modal, { ModalType } from '../modal/Modal';
import { postInquiry } from '../../api/productInquiryApi';

interface InquiryProps {
  onClose: () => void;
  onSubmitInquiry: (review: string) => void;
  editMode: boolean;
  initialInquiry: string;
  productId: string;
}

const InquiryModal: React.FC<InquiryProps> = ({ productId, onClose, onSubmitInquiry, editMode, initialInquiry }) => {
  const [inquiry, setInquiry] = useState(editMode ? initialInquiry : '');
  const onSubmit = () => {
    onSubmitInquiry(inquiry);
  };
  return (
    <Modal isModalOpen type={ModalType.POPUP} onClose={onClose}>
      <Text $fontType="H0" color="white">
        상품문의
      </Text>
      <Content>
        <Text $fontType="H3" color="white">
          문의내용
        </Text>
        <InputInquiry
          value={inquiry}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInquiry(e.target.value)}
          placeholder="문의내용을 입력해주세요. (최대 100자)"
          maxLength={100}
        />
        <ReviewInfo>
          -후기와 관련된 안내사항이 들어갑니다.
          <br />
          -후기와 관련된 안내사항이 들어갑니다.
          <br />
          -후기와 관련된 안내사항이 들어갑니다.
        </ReviewInfo>
        <PrivateCheckedWrap>
          <PrivateChecked />
          <Text $fontType="Body05" color="white">
            비공개
          </Text>
        </PrivateCheckedWrap>
      </Content>
      <Spacer height={'71px'} />
      <CommonButton width={'100%'} type={ButtonType.Primary} onClick={onSubmit}>
        등록하기
      </CommonButton>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 38px;
`;

const InputInquiry = styled.textarea`
  background-color: ${(props) => props.theme.color.grey80};
  height: 162px;
  color: ${(props) => props.theme.color.white};
  padding: 15px 17px;
  border: 0;
  border-radius: 8px;
  resize: none;
  outline: none;
  &:focus {
    border: none;
  }
`;

const ReviewInfo = styled.div`
  background-color: ${(props) => props.theme.color.grey80};
  white-space: pre-line;
  color: ${(props) => props.theme.color.grey30};
  padding: 16px 21px;
`;
const PrivateCheckedWrap = styled.label`
  display: flex;
  gap: 8px;
`;
const PrivateChecked = styled(CheckBoxBtn)`
  margin: 0;
`;

export default InquiryModal;
