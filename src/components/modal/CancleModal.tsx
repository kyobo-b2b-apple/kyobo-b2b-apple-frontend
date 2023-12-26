import React, { useState, useRef, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import Modal, { ModalType } from './Modal';
import Text from '../common/Text';
import Spacer from '../common/Spacer';
import CommonButton, { ButtonType } from '../common/Button';
import { InputStyle } from '../common/Input';
import SelectDropDown from '../../components/common/SelectDropDown';
import { StyledTextArea } from '../../components/common/TextArea';
import TextBox from '../common/TextBox';
import { cancleProductAPi } from '../../api/cancleModalApi';
import { useNavigate } from 'react-router-dom';

export interface CouponModalProps {
  modalOpen: boolean;
  modalClose: () => void;
  onCancleSubmit: (cancleReason: string[]) => void;
  orderId: number;
}

const CouponModal: React.FC<CouponModalProps> = ({ modalOpen, modalClose, onCancleSubmit, orderId }) => {
  const [reasonTitle, setReasonTitle] = useState<string>('');
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  //여기서 api 호출할거니까

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (reasonRef.current) {
      if (reasonRef.current.value === '') {
        alert('취소 사유를 선택해주십시오.');
      } else {
        onCancleSubmit([reasonTitle, reasonRef.current.value]);

        try {
          const response = await cancleProductAPi(orderId, {
            cancelReason: reasonTitle,
            content: reasonRef.current.value,
          });
          if (response.status === 200) {
            modalClose();

            setTimeout(() => {
              if (confirm('취소 신청이 완료되었습니다. 취소 내역 상세로 이동하시겠습니까?')) {
                navigate('/my-page/refund-history');
              }
            }, 0);
          }
        } catch (error: any) {
          console.log('오류가 발생하여 취소에 실패했습니다. 다시 시도해주십시오.');
          alert('오류가 발생하여 취소에 실패했습니다. 다시 시도해주십시오.');
          setReasonTitle('');
          modalClose();
          if (error.response && error.response.status === 400) {
            //400오류 발생시
          } else {
            //서버 오류 발생
            console.log(error);
          }
        }
      }
    }
  };

  return (
    <>
      <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="취소 요청">
        <form onSubmit={handleSubmit}>
          <Spacer height={38} />
          <InputItemContainer>
            <Text $fontType="H3" color="white">
              취소 사유
            </Text>
            <Spacer height={10} />
            <SelectDropDown
              menuItems={['단순변심', '배송지연', '주문실수', '서비스 불만족']}
              setTitle={setReasonTitle}
              selectTitle="취소 사유 선택"
            />
            <InputStyle type="hidden" value={reasonTitle} />
            <Spacer height={12} />
            <Text $fontType="H3" color="white">
              상세 사유 (선택)
            </Text>
            <Spacer height={10} />
            <StyledTextArea
              name="cancle"
              placeholder="상세 사유를 입력해주세요.(최대 300자)"
              width="100%"
              height="162px"
              padding="13px"
              maxLength={300}
              ref={reasonRef}
            />
          </InputItemContainer>
          <Spacer height={10} />
          <TextBox width="100%" bgColor="grey90">
            <Text $fontType="Body04" color="grey30">
              - 취소관련 안내사항
            </Text>
          </TextBox>
          <Spacer height={89} />
          <CommonButton width={'100%'} type={ButtonType.Secondary} htmlType="submit">
            확인
          </CommonButton>
        </form>
      </Modal>
    </>
  );
};

export default CouponModal;

const InputItemContainer = styled.div``;
