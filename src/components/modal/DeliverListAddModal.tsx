import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalType } from './Modal';
import { Text, Spacer } from '../common';
import Image from '../image/Image';
import CommonButton, { ButtonType } from '../common/Button';
import { InputStyle } from '../common/Input';

// import KakaoPostCode from '../../api/KakaoPostCode';
import DaumPostcode from 'react-daum-postcode';
import { addAddressCard } from '../../api/addressApi';



interface ModalProps {
    modalOpen: boolean;
    modalClose: () => void;
}

const DelicerListModal: React.FC<ModalProps> = ({ modalOpen, modalClose }) => {

    const [address, setAddress] = useState<{
        address: string;
        zonecode: string;
    } | null>(null);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');



    const [openPostcode, setOpenPostcode] = useState<boolean>(false);

    const handle = {

        clickButton: () => {
            if (address) {
                setAddress(null);
            } else {
                setOpenPostcode(current => !current);
            }
        },

        selectAddress: (data: any) => {
            console.log(`
                    주소: ${data.address},
                    우편번호: ${data.zonecode}
                `);
            setAddress({
                address: data.address,
                zonecode: data.zonecode,
            });
            setOpenPostcode(false);
        },
    };

    const handleAddAddressCard = async () => {
        console.log(address, name, phoneNumber);
        if (address && name && phoneNumber) {
            await addAddressCard({
                address: address.address,
                addressDetail: address.zonecode,
                name,
                phoneNumber,
            });
            modalClose();
        }
    };


    return (
        <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title='배송지 추가'>
            <Spacer height={38} />
            <InputItemContainer >
                <Text $fontType="H3" color="white">
                    이름
                </Text>
                <Spacer height={10} />
                <InputStyle width="100%" onChange={(e) => setName(e.target.value)} />

            </InputItemContainer>
            <Spacer height={13} />
            <InputItemContainer >
                <Text $fontType="H3" color="white">
                    휴대폰 번호
                </Text>
                <Spacer height={10} />
                <InputStyle width="100%" onChange={(e) => setPhoneNumber(e.target.value)} />
            </InputItemContainer>
            <Spacer height={13} />
            <InputItemContainer >
                <Text $fontType="H3" color="white">
                    주소
                </Text>
                <Spacer height={10} />
                {address &&
                    <>
                        <InputStyle width="100%" defaultValue={address.address} />
                        <Spacer height={10} />
                        <InputStyle width="100%" defaultValue={address.zonecode} />
                    </>
                }
                <Spacer height={10} />
                <CommonButton
                    type={ButtonType.Ghost}
                    width='100%'
                    onClick={handle.clickButton}
                >
                    {address ? '주소 재입력' : '+주소추가'}
                </CommonButton>

            </InputItemContainer>
            {openPostcode &&
                <KakaoPostCode>
                    <DaumPostcode
                        onComplete={handle.selectAddress}
                        autoClose={false}
                        defaultQuery='판교역로 235'
                    />
                </KakaoPostCode>
            }
            <Spacer height={54} />
            <CommonButton
                type={ButtonType.Primary}
                width='100%'
                onClick={handleAddAddressCard}
            >
                등록하기
            </CommonButton>

        </Modal>
    );
};

export default DelicerListModal;

const InputItemContainer = styled.div`

`;

const KakaoPostCode = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
`;