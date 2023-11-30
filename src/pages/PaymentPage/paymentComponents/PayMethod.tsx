import React, { useState } from 'react';
import styled from 'styled-components';
import { CardContainer, FlexContainer, FlexItem } from '../../../layout/CardLayout';
import Text from '../../../components/common/Text';
import Image from '../../../components/image/Image';
import Spacer from '../../../components/common/Spacer';
import PayDetail from '../../../components/order/PayDetail';

import radioUnSelected from '../../../assets/Icons/ic_radiobtn_g_desktop.png';
import radioSelected from '../../../assets/Icons/ic_radiobtn_w_desktop.png';
import kakao from '../../../assets/img/img_kakaopay_desktop.png';

interface PayInfoProps {
    totalPrice: number;
}

const PayMethod: React.FC<PayInfoProps> = ({ totalPrice }) => {

    const [selectedOption, setSelectedOption] = useState('option1');

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <CardContainer>
            <FlexContainer>
                <FlexItem>
                    <Text $fontType='H1' color='white'>결제수단</Text>
                    <Spacer height='27px' />
                    <div>
                        <input
                            style={{ display: 'none' }}
                            type='radio'
                            id='option1'
                            value='option1'
                            name='payment'
                            checked={selectedOption === 'option1'}
                            onChange={handleChange}
                        />
                        <label htmlFor='option1'>
                            <RadioLabelTextContainer>
                                <Image
                                    src={selectedOption === 'option1' ? radioSelected : radioUnSelected}
                                    alt='Option 1'
                                    width='15px'
                                    height='15px'
                                />
                                <Spacer width='6px' />
                                <Text $fontType='Body04' color='white'>카카오 페이 결제</Text>
                            </RadioLabelTextContainer>
                            {selectedOption === 'option1' &&
                                <KakaoPayImg src={kakao} alt='kakao' width='70%' />
                            }
                        </label>
                    </div>
                    <Spacer height='26px' />
                    <div>
                        <input
                            style={{ display: 'none' }}
                            type='radio'
                            id='option2'
                            value='option2'
                            name='payment'
                            checked={selectedOption === 'option2'}
                            onChange={handleChange}
                        />
                        <label htmlFor='option2'>
                            <RadioLabelTextContainer>
                                <Image
                                    src={selectedOption === 'option2' ? radioSelected : radioUnSelected}
                                    alt='Option 2'
                                    width='15px'
                                    height='15px'
                                />
                                <Spacer width='6px' />
                                <Text $fontType='Body04' color='white'>카드결제</Text>
                            </RadioLabelTextContainer>
                        </label>
                    </div>
                    <Spacer height='14px' />
                    <div>
                        <input
                            style={{ display: 'none' }}
                            type='radio'
                            id='option3'
                            value='option3'
                            name='payment'
                            checked={selectedOption === 'option3'}
                            onChange={handleChange}
                        />
                        <label htmlFor='option3'>
                            <RadioLabelTextContainer>
                                <Image
                                    src={selectedOption === 'option3' ? radioSelected : radioUnSelected}
                                    alt='Option 3'
                                    width='15px'
                                    height='15px'
                                />
                                <Spacer width='6px' />
                                <Text $fontType='Body04' color='white'>무통장 입금</Text>
                            </RadioLabelTextContainer>
                        </label>
                    </div>
                </FlexItem>

                <FlexItem>
                    <PayDetail
                        orderAmount={totalPrice + 2500}
                        productAmount={totalPrice}
                        deliveryFee={2500}
                        couponDiscount={0}

                        finalAmount={totalPrice + 2500}
                    />
                </FlexItem>
            </FlexContainer>
        </CardContainer>
    );
};

export default PayMethod;

const RadioLabelTextContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const KakaoPayImg = styled(Image)`
    margin-left: 20px;
`;