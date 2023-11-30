import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Text from './Text';
import Image from '../image/Image';
import Spacer from './Spacer';

import minus_b from '../../assets/Icons/ic_minus_b_desktop .png';
import minus_g from '../../assets/Icons/ic_minus_g_desktop .png';
import plus_b from '../../assets/Icons/ic_plus_b_desktop .png';
import plus_g from '../../assets/Icons/ic_plus_g_desktop .png';

interface CounterProps {
    iconWidth?: number;
    onCountChange: (newCount: number) => void;
}

const MIN_COUNT = 1;
const MAX_COUNT = 100;


const Counter: React.FC<CounterProps> = ({ iconWidth, onCountChange }) => {

    const [count, setCount] = useState(MIN_COUNT);

    useEffect(() => {
        if (onCountChange) {
            onCountChange(count);
        }
    }, [count, onCountChange]);


    const increment = () => {
        if (count >= MAX_COUNT) { return; }
        setCount(count + 1);
    };

    const decrement = () => {
        if (count <= MIN_COUNT) { return; }
        setCount(count - 1);
    };

    return (
        <CounterContainer iconWidth={iconWidth}>
            <CounterBtn onClick={decrement}>
                <Image src={count === MIN_COUNT ? minus_g : minus_b} alt='minus' width='24px' />
            </CounterBtn>
            <Spacer width={5} />
            <NumberField>
                <Text $fontType='Body05' color='grey10'>{count}</Text>
            </NumberField>
            <Spacer width={5} />
            <CounterBtn onClick={increment}>
                <Image src={count === MAX_COUNT ? plus_g : plus_b} alt='plus' width='24px' />
            </CounterBtn>
        </CounterContainer>
    );
};

export default Counter;

const CounterContainer = styled.div<{ iconWidth?: number }>`
  display: flex;
  width: ${(props) => (props.iconWidth ? props.iconWidth + 'px' : 'auto')};
`;

const NumberField = styled.div`
    background-color: ${props => props.theme.color.grey70};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CounterBtn = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
`;
