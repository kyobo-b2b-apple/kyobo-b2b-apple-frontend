import React from 'react';
import styled from 'styled-components';
import { CardContainer, FlexContainer, FlexItem } from '../../../layout/CardLayout';
import Text from '../../../components/common/Text';
import { InputStyle } from '../../../components/common/Input';
import CommonButton, { ButtonType } from '../../../components/common/Button';
import Dropdown from '../../../components/common/DropDown';
import Spacer from '../../../components/common/Spacer';

import OrderInfo from '../../../components/order/OrderInfo';

interface DeliveryInfoProps {
    onEditButtonClick: () => void;
    orderInfo: {
        couponId: number | null;
        orderName: string;
        orderPhoneNumber: string;
        orderEmail: string;
        couponItems?: string[],
    };
    deliverInfo: {
        recipientName: string;
        phoneNumber: string;
        address: string;
        menuItems?: string[];
        isEditable?: boolean;
    }
}



const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ onEditButtonClick, orderInfo, deliverInfo }) => {

    const { recipientName, phoneNumber, address, menuItems: deliveryMenuItems, isEditable } = deliverInfo;


    return (
        <CardContainer>
            <FlexContainer>
                <FlexItem>
                    <>
                        <Text $fontType='H1' color='white'>배송지 정보</Text>
                        <Spacer height='28px' />
                        <Text $fontType='Body03' color='white'>{recipientName}</Text>
                        <Spacer height='10px' />
                        <Text $fontType='Body05' color='white'>{phoneNumber}</Text>
                        <Text $fontType='Body05' color='white'>{address}</Text>
                        <Spacer height='15px' />
                        <DeliveryInfoContaienr>
                            <Text $fontType='Body01' color='white'>배송메모</Text>
                            <Spacer width='17px' />
                            <DeliveryInfoControlContainer>
                                {isEditable && deliverInfo.menuItems &&
                                    <Dropdown menuItems={deliverInfo.menuItems} width='100%' />
                                }
                                <Spacer height='7px' />
                                <DeliverInputFrom
                                    placeholder={'배송 요청사항'}
                                    width='100%'
                                />
                            </DeliveryInfoControlContainer>
                        </DeliveryInfoContaienr>
                    </>
                </FlexItem>
                <FlexItem>
                    <Text $fontType='H1' color='white'>주문자 정보</Text>
                    <Spacer height='28px' />

                    <EditableInfoContainer>
                        <OrdererInfoTetxContainer>
                            <Text $fontType='Body03' color='white'>{orderInfo.orderName}</Text>
                            <Spacer height='10px' />
                            <Text $fontType='Body05' color='white'>{orderInfo.orderPhoneNumber}</Text>
                            <Text $fontType='Body05' color='white'>{orderInfo.orderEmail}</Text>
                        </OrdererInfoTetxContainer>
                        <EditBtn type={ButtonType.Secondary} onClick={onEditButtonClick}>수정</EditBtn>
                    </EditableInfoContainer>
                    <Spacer height='30px' />
                    <Text $fontType='H1' color='white'>쿠폰</Text>
                    <Spacer height='28px' />
                    <Dropdown menuItems={orderInfo.couponItems || []} width='100%' />
                </FlexItem>
            </FlexContainer>

        </CardContainer>
    );
};

export default DeliveryInfo;


const EditableInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const OrdererInfoTetxContainer = styled.div`
    
`;

const EditBtn = styled(CommonButton)`
    height: 30px;
    width: 100px;
`;

const DeliveryInfoContaienr = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const DeliveryInfoControlContainer = styled.div`
    /* width: 100%; */
    flex-grow: 1;
`;

const DeliverInputFrom = styled(InputStyle)`
    background-color: ${props => props.theme.color.grey70};
    height: 100px;
    
`;