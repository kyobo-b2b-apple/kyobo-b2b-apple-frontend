import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/common/Text';
import Spacer from '../../../components/common/Spacer';
import { formatNumber } from '../../../utils/formatNumber';

type FontType = 'H0' | 'H1' | 'H2' | 'H3' | 'Body01' | 'Body02' | 'Body03' | 'Body04' | 'Body05' | 'Caption01' | 'Caption02' | 'Caption03';

interface LabelWithAmountProps {
    label: string;
    amount?: number;
    discount?: number;
    bold?: boolean;
    description?: string
}

const LabelWithAmount: React.FC<LabelWithAmountProps> = ({ label, amount, discount, bold, description }) => {
    return (
        <LabelWithAmountItem>
            <LabelContainer>
                <Text $fontType='Body01' color='white'>{label} </Text>
                {discount &&
                    <>
                        <Spacer width='10px' />
                        <Text $fontType='Body01' color='blue30'>{discount}%할인</Text>
                    </>
                }
            </LabelContainer>
            {amount ?
                <Text $fontType={bold ? 'H2' : 'Body02'} color='white'>{formatNumber(amount)}원</Text>
                :
                <Text $fontType={bold ? 'H2' : 'Body02'} color='white'>{description}</Text>
            }

        </LabelWithAmountItem>
    );
};

export default LabelWithAmount;

const LabelWithAmountItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`;