import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentsLayout from '../../../layout/contentsWidthLayout';
import { CardContainer, FlexContainer, FlexItem } from '../../../layout/CardLayout';

import Spacer from '../../../components/common/Spacer';
import Text from '../../../components/common/Text';
import CommonButton, { ButtonType } from '../../../components/common/Button';

import PayDetail from '../../../components/order/PayDetail';
import OrderInfo from '../../../components/order/OrderInfo';

import { getPayResultByCode } from '../../../api/kakaoPay';
import { useDispatch } from 'react-redux';
import { clearCartItems } from '../../../store/cartSlice';

type OrderDataType = {
    address: string;
    addressDetail: string;
    deliveryFee: number;
    discountAmount: number;
    discountRate: number;
    id: number;
    memo: string;
    orderAmount: number;
    orderCode?: string;
    productAmount: number;
    recipientName: string;
    recipientPhoneNumber?: string;
};


const PayResultSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [orderData, setOrderData] = useState<OrderDataType | null>(null);


    const orderCode = query.get('orderCode');

    useEffect(() => {
        const fetchPayResult = async () => {
            const res = await getPayResultByCode(orderCode);

            if (res.code === 200) {
                dispatch(clearCartItems());
            }

            setOrderData(res.result);
        };

        fetchPayResult();
    }, [orderCode, dispatch]);

    const navigateHome = () => {
        navigate('/');
    };

    return (
        <>
            {orderData ?
                < ContentsLayout >
                    <Spacer height={30} />
                    <Text $fontType='H1' color='white'>주문/결제</Text>
                    <Spacer height={9} />
                    <Text $fontType='H3' color='white'>주문이 정상적으로 완료되었습니다.</Text>
                    <Spacer height={21} />
                    <CardContainer>
                        <OderNumContainer>
                            <OrderNumText>
                                <Text $fontType='Body03' color='white'>주문번호</Text>
                                <Spacer width={14} />
                                <Text $fontType='Body04' color='blue10'>{orderData?.id}</Text>
                            </OrderNumText>
                            <CommonButton type={ButtonType.Ghost}>상세보기</CommonButton>
                        </OderNumContainer>
                        <Spacer height={30} />
                        <FlexContainer>
                            <FlexItem>
                                <OrderInfo
                                    recipientName={orderData?.recipientName}
                                    phoneNumber={String(orderData?.recipientPhoneNumber)}
                                    address={orderData?.address}
                                />
                            </FlexItem>
                            <FlexItem>
                                <PayDetail
                                    orderAmount={orderData?.orderAmount}
                                    productAmount={orderData?.productAmount}
                                    deliveryFee={orderData?.deliveryFee}
                                    couponDiscount={orderData?.discountAmount}
                                    couponRate={orderData?.discountRate}
                                    finalAmount={orderData?.orderAmount}
                                />
                            </FlexItem>
                        </FlexContainer>
                    </CardContainer>
                    <Spacer height={25} />
                    <ButtonContainer>
                        <CommonButton type={ButtonType.Secondary} width='30%'>구매 내역 보기</CommonButton>
                        <Spacer width={15} />
                        <CommonButton type={ButtonType.Primary} width='30%' onClick={navigateHome}>쇼핑 홈 가기</CommonButton>
                    </ButtonContainer>
                    <Spacer height={136} />
                </ContentsLayout >

                :
                <div>LOADING...</div>
            }

        </>
    );
};

export default PayResultSuccess;

const ButtonContainer = styled.div`
        display: flex;
        justify-content: center;
    `;

const OderNumContainer = styled.div`
        display: flex;
        width: 95%;
        justify-content: space-between;
        align-items: center;
        background-color: ${props => props.theme.color.grey70};
        border-radius: 8px;
        margin: 0 auto;
        padding: 7px 15px;
    `;

const OrderNumText = styled.div`
        display: flex;
        flex-direction: row;
    `;