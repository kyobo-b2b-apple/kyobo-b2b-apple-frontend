import React from 'react';
import styled from 'styled-components';
import Spacer from '../common/Spacer';
import { InputStyle } from '../common/Input';
import Text from '../common/Text';
import Dropdown from '../common/DropDown';

interface OrderInfoProps {
    recipientName: string;
    phoneNumber: string;
    address: string;
    menuItems?: string[];
    isEditable?: boolean;
}

const OrderInfo: React.FC<OrderInfoProps> = ({
    recipientName,
    phoneNumber,
    address,
    menuItems,
    isEditable
}) => {
    return (
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
                    {isEditable && menuItems &&
                        <Dropdown menuItems={menuItems} width='100%' />
                    }
                    <Spacer height='7px' />
                    <DeliverInputFrom
                        placeholder={'배송 요청사항'}
                        width='100%'
                    />
                </DeliveryInfoControlContainer>
            </DeliveryInfoContaienr>
        </>
    );
};

export default OrderInfo;

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