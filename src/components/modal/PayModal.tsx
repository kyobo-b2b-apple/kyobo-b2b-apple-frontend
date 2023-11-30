import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal, { ModalType } from './Modal';
import Text from '../common/Text';
import Spacer from '../common/Spacer';
import CommonButton, { ButtonType } from '../common/Button';
import { InputStyle } from '../common/Input';

export interface PayModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    ordererInfo: {
        orderName: string;
        orderPhoneNumber: string;
        orderEmail: string;
    };
    onOrdererInfoChange: (newOrdererInfo) => void;
}

const PayModal: React.FC<PayModalProps> = ({ modalOpen, modalClose, ordererInfo, onOrdererInfoChange }) => {

    const [localOrdererInfo, setLocalOrdererInfo] = useState(ordererInfo);

    useEffect(() => {
        setLocalOrdererInfo(ordererInfo);
    }, [ordererInfo]);

    const handleInputChange = (event) => {
        setLocalOrdererInfo({
            ...localOrdererInfo,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        onOrdererInfoChange(localOrdererInfo);
        modalClose();
    };


    return (
        <>
            <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title='주문자 정보 수정'>
                <Spacer height={38} />
                {Object.entries(localOrdererInfo)
                    .filter(([key]) => ['orderName', 'orderPhoneNumber', 'orderEmail'].includes(key))
                    .map(([key, value]) => (
                        <InputItemContainer key={key}>
                            <Text $fontType="H3" color="white">
                                {key === 'orderName' && '주문자명'}
                                {key === 'orderPhoneNumber' && '휴대폰 번호'}
                                {key === 'orderEmail' && '이메일'}
                            </Text>
                            <Spacer height={10} />
                            <InputStyle
                                name={key}
                                placeholder={`Enter ${key}`}
                                width="100%"
                                value={value}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </InputItemContainer>
                    ))}
                <InputStyle
                    placeholder='주문자 정보와 관련된 안내사항이 들어갑니다.'
                    width='100%'
                    height='80px'
                />
                <Spacer height={22} />
                <CommonButton width={'100%'} type={ButtonType.Primary} onClick={() => handleSubmit()}>
                    변경하기
                </CommonButton>
            </Modal>
        </>
    );
};

export default PayModal;

const InputItemContainer = styled.div`

`;