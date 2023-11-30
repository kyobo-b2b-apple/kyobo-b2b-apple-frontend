import React from 'react';
import LabelWithAmount from '../../pages/PaymentPage/paymentComponents/LabelWithAmount';
import Spacer from '../common/Spacer';
import Text from '../common/Text';

interface PayDetailProps {
    orderAmount: number;
    productAmount: number;
    deliveryFee: number;
    couponDiscount: number;
    couponRate?: number;
    finalAmount: number;
}

const PayDetail: React.FC<PayDetailProps> = ({
    orderAmount,
    productAmount,
    deliveryFee,
    couponDiscount,
    couponRate,
    finalAmount,
}) => {
    return (
        <>
            <Text $fontType='H1' color='white'>결제상세</Text>
            <Spacer height='37px' />
            <LabelWithAmount label='주문금액' amount={orderAmount} />
            <Spacer height='18px' />
            <LabelWithAmount label='상품금액' amount={productAmount} />
            <Spacer height='18px' />
            <LabelWithAmount label='배송비' amount={deliveryFee} />
            <Spacer height='18px' />
            <LabelWithAmount label='쿠폰할인' amount={couponDiscount} discount={couponRate} />
            <Spacer height='45px' />
            <LabelWithAmount label='최종 결제금액' amount={finalAmount} bold={true} />
        </>
    );
};

export default PayDetail;
