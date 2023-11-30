import React from 'react';
import styled from 'styled-components';
import ContentsLayout from '../../../layout/contentsWidthLayout';
import { CardContainer, FlexContainer, FlexItem } from '../../../layout/CardLayout';

import Spacer from '../../../components/common/Spacer';
import Text from '../../../components/common/Text';
import CommonButton, { ButtonType } from '../../../components/common/Button';


const PayResultFail = () => {

    return (
        <>
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
        </>
    );
};

export default PayResultFail;

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