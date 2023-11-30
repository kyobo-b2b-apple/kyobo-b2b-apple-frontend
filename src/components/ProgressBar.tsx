import React from 'react';
import styled from 'styled-components';
import { Spacer, Text } from './common';
import Image from './image/Image';

import button from '../assets/Icons/ic_circle_24px_desktop.png';
import b_button from '../assets/Icons/ic_circle_b_24px_desktop.png';
import theme from '../styles/theme';


type CircleComponentProps = React.HTMLAttributes<HTMLDivElement> & {
    active: boolean;
};

interface DotProps {
    label: string;
    state: boolean
}


// TODO 가상 선택자 사용해서 맨 끝의 튀어나온 선 자르기
const ProgressElement: React.FC<DotProps> = ({ label, state }) => {
    return (
        <StepWrapper>
            {state ? (
                <Image src={b_button} alt="b_btn" width='24px' height='24px' />
            ) : (
                <Image src={button} alt="btn" width='24px' height='24px' />
            )}
            <Spacer height={10} />
            <Text $fontType='Body05' color={state ? 'blue10' : 'white'}>
                {label}
            </Text>
        </StepWrapper>
    );
};

const ProgressBar = ({
    currentStep,
    totalSteps
}: {
    currentStep: number;
    totalSteps: number;
}) => {

    const DELIVERY_STATUS = ['결제완료', '상품준비중', '배송시작', '배송중', '배송완료'];


    return (
        <ProgressBarContainer>
            <Line />
            {DELIVERY_STATUS.map((status, index) => (
                <ProgressElement key={index} label={status} state={currentStep === index + 1} />
            ))}
        </ProgressBarContainer>
    );
};

export default ProgressBar;



const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  
    
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #ccc;
  top: 12px;
  
  z-index: 1;
`;
