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
  modalClose: () => void;
  onCancleSubmit: (cancleReason: string[]) => void;
  orderId: number;
}

const CancleModalForm: React.FC<CouponModalProps> = ({ modalClose, onCancleSubmit, orderId }) => {
  const [reasonTitle, setReasonTitle] = useState<string>('');
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<boolean>(false);

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
          setReasonTitle('');
          setApiError(true); //여기서 에러 발생했음을 설정
        }
      }
    }
  };

  //ErrorBoundary 감지를 위해서 Error를 직접 날림
  useEffect(() => {
    if (apiError) {
      throw new Error('api요청 실패');
    }
  }, [apiError]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Spacer height={38} />
        <div>
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
        </div>
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
    </>
  );
};

export default CancleModalForm;
