import React, { useState } from 'react';
import styled from 'styled-components';
import Spacer from './common/Spacer';
import Text from './common/Text';
import Counter from './common/Counter';
import { formatNumber } from '../utils/formatNumber';

type Option = {
    name: string;
    price: number;
};


const CardWithCounter = ({ option, padding, ridAvailable, onRemove }: {
    option: Option;
    padding?: string;
    ridAvailable?: boolean;
    onRemove?: () => void;
}) => {

    const { name, price } = option;

    const [cardCount, setCartCount] = useState(0);

    const handleCounterChange = (newCount: number) => {
        setCartCount(newCount);
    };

    return (
        <>
            <Spacer height={14} />
            <OptionCardItem padding={padding}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text $fontType='Body04' color='white'>{name}</Text>

                    {ridAvailable &&
                        <RidOptionBtn onClick={onRemove}>&times;</RidOptionBtn>
                    }
                </div>
                <OptionCardItemCounterWithPrice>
                    <Counter iconWidth={100} onCountChange={handleCounterChange} />
                    <Text $fontType='H3' color='white'>{formatNumber(price)} 원</Text>
                </OptionCardItemCounterWithPrice>
            </OptionCardItem>
        </>
    );
};

export default CardWithCounter;

const OptionCardItem = styled.div<{ padding?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${props => props.theme.color.grey70};
    height: 113px;
    border-radius: 9px;
    padding: ${(props) => props.padding || '27px 14px 17px 15px'};
    position: relative;
`;

const OptionCardItemCounterWithPrice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;


const RidOptionBtn = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => props.theme.color.grey20};
    font-size: 20px;
    position: absolute;
    right: 14px;
    top: 14px;
`;