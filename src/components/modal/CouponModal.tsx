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
            <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title='쿠폰 등록'>
                <Spacer height={38} />
                <InputItemContainer>
                    <Text $fontType="H3" color="white">쿠폰 코드</Text>
                    <Spacer height={10} />
                    <InputStyle
                        name='coupon'
                        placeholder='쿠폰번호 12자리를 입력해 주세요'
                        width="100%"
                        value={couponCode}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <Spacer height={12} />
                    <InputStyle
                        name='coupon'
                        placeholder='-쿠폰과 관련된 안내사항이 들어갑니다.'
                        width="100%"
                        value={couponCode}
                        readOnly={true}
                    />
                </InputItemContainer>
                <Spacer height={89} />
                <CommonButton width={'100%'} type={ButtonType.Primary} onClick={() => handleSubmit()}>
                    등록하기
                </CommonButton>
            </Modal>
        </>
    );
};

export default CouponModal;

const InputItemContainer = styled.div`

`;
