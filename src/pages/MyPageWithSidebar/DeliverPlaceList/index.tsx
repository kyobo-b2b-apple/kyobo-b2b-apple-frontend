import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text, Spacer } from '../../../components/common';
import Image from '../../../components/image/Image';
import CommonButton, { ButtonType } from '../../../components/common/Button';
import MyContainer from '../../../components/my/MyContainer';
import DelicerListModal from '../../../components/modal/DeliverListAddModal';
import homeicon from '../../../assets/Icons/ic_delivery_desktop.png';
import { AiOutlineClose } from 'react-icons/ai';

import { getAddressCards, addAddressCard, deleteAddressCard } from '../../../api/addressApi';

const deliverLOC = [
    { id: 0, name: '우리집', address: '경기도 성남시 분당구 정자동', number: '010-0000-0000' },
    { id: 1, name: '우리집', address: '경기도 성남시 분당구 정자동', number: '010-0000-0000' },
    { id: 2, name: '우리집', address: '경기도 성남시 분당구 정자동', number: '010-0000-0000' },
    { id: 3, name: '우리집', address: '경기도 성남시 분당구 정자동', number: '010-0000-0000' },
    { id: 4, name: '우리집', address: '경기도 성남시 분당구 정자동', number: '010-0000-0000' },
];

interface AddressCard {
    id: number;
    name: string;
    address: string;
    number: string;
}


const DeliverPlaceList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [addressCards, setAddressCards] = useState<AddressCard[]>([]);

    useEffect(() => {
        const fetchAddressCards = async () => {
            const cards = await getAddressCards();
            setAddressCards(cards);
        };

        fetchAddressCards();
    }, []);

    console.log(addressCards);

    const onClickDeleteAddress = async (cardId) => {
        await deleteAddressCard(cardId);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <CouponContainer>
            <MyContainer label='배송지 목록'>
                <AddCouponBar>
                    <CouponStatus>
                        <Text $fontType='H3' color='white'>{deliverLOC[0].name} </Text>
                        <Text $fontType='Caption02' color='grey30'>{deliverLOC[0].address}</Text>
                        <Text $fontType='Caption02' color='grey30'>{deliverLOC[0].number}</Text>
                    </CouponStatus>
                    <CommonButton
                        type={ButtonType.Primary}
                        height='34px'
                        onClick={handleOpenModal}
                    >
                        배송지 수정</CommonButton>
                </AddCouponBar>
                <Spacer height={30} />
                <CouponCardArea>

                    {addressCards?.map((x, idx) => (
                        <CouponCard key={idx}>
                            <Image src={homeicon} alt='home' width='17px' height='17px' />
                            <Text $fontType='H3' color='white'>{x.name} </Text>
                            <Text $fontType='Caption02' color='grey30'>{x.address}</Text>
                            <Text $fontType='Caption02' color='grey30'>{x.number}</Text>
                            <Spacer height={8} />
                            <CloseBtn
                                size={21}

                                onClick={() => onClickDeleteAddress(x.id)}
                            />
                        </CouponCard>
                    ))}
                </CouponCardArea>
                <DelicerListModal modalOpen={isModalOpen} modalClose={handleCloseModal} />
            </MyContainer>
        </CouponContainer>
    );
};

export default DeliverPlaceList;

const CouponContainer = styled.div`
    
`;

const AddCouponBar = styled.div`
    height: 100px;
    width: 100%;

    background-color: ${props => props.theme.color.grey80};
    border-radius: 8px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0px 29px;
`;

const CouponStatus = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: center;
`;

const CouponCardArea = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between;
    row-gap: 15px;

    @media only screen and (max-width: 600px) {
    justify-content: center; 
  }
`;

const CouponCard = styled.div`
    width: 49%;
    background-color: ${props => props.theme.color.grey80};
    padding: 23px;
    border-radius: 8px;
    position: relative;

    @media only screen and (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

const CloseBtn = styled(AiOutlineClose)`
  position: absolute;
  right: 10px;
  top: 10px;
`;