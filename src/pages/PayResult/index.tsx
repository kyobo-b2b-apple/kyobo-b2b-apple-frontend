import React from 'react';
import styled from 'styled-components';
import ContentsLayout from '../../layout/contentsWidthLayout';
import { CardContainer, FlexContainer, FlexItem } from '../../layout/CardLayout';

import Spacer from '../../components/common/Spacer';
import Text from '../../components/common/Text';
import CommonButton, { ButtonType } from '../../components/common/Button';

import PayDetail from '../../components/order/PayDetail';
import OrderInfo from '../../components/order/OrderInfo';


const PayResult = () => {

    const is = true;

    return (
        <>
            {is ?
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
                                <Text $fontType='Body04' color='blue10'>12341234</Text>
                            </OrderNumText>
                            <CommonButton type={ButtonType.Ghost}>상세보기</CommonButton>
                        </OderNumContainer>
                        <FlexContainer>
                            <FlexItem>
                                <OrderInfo
                                    recipientName='김이름'
                                    phoneNumber='010-6800-2088'
                                    address='(01812) 서울특별시 마포구 공덕동 242'
                                />
                            </FlexItem>
                            <FlexItem>
                                <PayDetail
                                    orderAmount={687001}
                                    productAmount={687001}
                                    deliveryFee={0}
                                    couponDiscount={15000}
                                    couponRate={3}
                                    finalAmount={672001}
                                />
                            </FlexItem>
                        </FlexContainer>
                    </CardContainer>
                    <Spacer height={25} />
                    <ButtonContainer>
                        <CommonButton type={ButtonType.Secondary} width='30%'>쇼핑 홈 가기</CommonButton>
                        <Spacer width={15} />
                        <CommonButton type={ButtonType.Primary} width='30%'>구매하기</CommonButton>
                    </ButtonContainer>
                </ContentsLayout >
                :
                <ContentsLayout>
                    <Spacer height={30} />
                    <Text $fontType='H1' color='white'>주문/결제</Text>
                    <Spacer height={9} />
                    <Text $fontType='H3' color='white'>결제가 실패했습니다.</Text>
                    <Spacer height={21} />
                    <CardContainer>
                        <Text $fontType='Body03' color='white'>- 주문내역과 결제수단을 확인 후 재시도 해보시길 바랍니다.</Text>
                        <Text $fontType='Body03' color='white'>- 지속적으로 결제가 이루어지지 않는 경우 고객센터로 문의하시길 바랍니다. (02-708-6700)</Text>
                    </CardContainer>
                    <Spacer height={23} />
                    <ButtonContainer>
                        <CommonButton type={ButtonType.Primary} width='30%'>구매하기</CommonButton>
                    </ButtonContainer>

                </ContentsLayout >
            }
        </>
    );
};

export default PayResult;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const OderNumContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.color.grey70};
    border-radius: 8px;

    padding: 7px 15px;
`;

const OrderNumText = styled.div`
    display: flex;
    flex-direction: row;
`;