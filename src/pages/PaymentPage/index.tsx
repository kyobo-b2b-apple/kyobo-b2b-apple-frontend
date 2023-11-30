import React, { useEffect, useState } from 'react';
import ContentsLayout from '../../layout/contentsWidthLayout';
import Spacer from '../../components/common/Spacer';
import Text from '../../components/common/Text';
import CommonButton, { ButtonType } from '../../components/common/Button';
import OrderProductCardList from './paymentComponents/OrderProductCardList';
import DeliveryInfo from './paymentComponents/DeliveryInfo';
import PayMethod from './paymentComponents/PayMethod';
import PayModal from '../../components/modal/PayModal';

import { formatNumber } from '../../utils/formatNumber';
import { handleOrderSubmit } from '../../api/kakaoPay';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

const coupons = [
    {
        id: 0,
        name: '3%',
        code: 'string',
        discountRate: 0,
        startDate: '2023-08-28',
        endDate: '2023-08-28',
        discountConditions: []
    },
    {
        id: 1,
        name: '5%',
        code: 'string',
        discountRate: 0,
        startDate: '2023-08-28',
        endDate: '2023-08-28',
        discountConditions: []
    },
];


const PaymentPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const products = useSelector((state: RootState) => state.cart);
    const totalPrice = calcTotalPrice(products);

    console.log('cart', products);

    const [orderUserInfo, setOrderUserInfo] = useState({
        couponId: null,
        orderName: '김이름',
        orderPhoneNumber: '01068002088',
        orderEmail: 'asd@asd.com',
        mean: '배송요청사항',
        memo: '배송요청사항',
        couponItems: coupons.map(coupon => `${coupon.name} 유효기간 : ${coupon.startDate} ~ ${coupon.endDate}`),
    });

    const [deliverInfo, setDeliverInfo] = useState({
        recipientName: '김받는사람',
        phoneNumber: '01012345678',
        address: '(12345) 서울시 어딘가로 123',
        menuItems: ['배송 요청사항을 선택해주세요.', '배송전에 미리 연락바랍니다.', '부재시 경비실에 맡겨주세요'],
        isEditable: true,
    });

    useEffect(() => {
        console.log(products, orderUserInfo);
    }, [orderUserInfo, products]);



    const handleUpdateUser = (newUserInfo) => {
        setOrderUserInfo(newUserInfo);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    function calcTotalPrice(products) {
        return products.reduce((total, product) => {
            return total + product.totalPrice;
        }, 0);
    }


    return (
        <ContentsLayout>
            <Spacer height='20px' />
            <Text $fontType='H0' color='white'>주문/결제 </Text>
            <Spacer height='16px' />
            <OrderProductCardList data={products} />
            <Spacer height='24px' />
            <DeliveryInfo onEditButtonClick={handleOpenModal} orderInfo={orderUserInfo} deliverInfo={deliverInfo} />
            <Spacer height='24px' />
            <PayMethod totalPrice={totalPrice} />
            <Spacer height='24px' />
            <CommonButton
                width={'100%'}
                type={ButtonType.Primary}
                onClick={() => handleOrderSubmit(products.map(productItem => productItem), orderUserInfo)}
            >
                {formatNumber(totalPrice)}원 결제
            </CommonButton>
            <PayModal modalOpen={isModalOpen} modalClose={handleCloseModal} ordererInfo={orderUserInfo} onOrdererInfoChange={handleUpdateUser} />
        </ContentsLayout>
    );
};

export default PaymentPage;