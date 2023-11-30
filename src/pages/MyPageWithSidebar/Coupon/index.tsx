import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllCoupons, addCoupon } from '../../../api/couponApi';
import { Text, Spacer } from '../../../components/common';
import CouponModal from '../../../components/modal/CouponModal';
import CommonButton, { ButtonType } from '../../../components/common/Button';
import MyContainer from '../../../components/my/MyContainer';

// const card = [
//     { id: 0, dc: 3, expire: '2023.07.01 ~ 2024.07.01' },
//     { id: 1, dc: 3, expire: '2023.07.01 ~ 2024.07.01' },
//     { id: 2, dc: 3, expire: '2023.07.01 ~ 2024.07.01' },
//     { id: 3, dc: 3, expire: '2023.07.01 ~ 2024.07.01' },
//     { id: 4, dc: 3, expire: '2023.07.01 ~ 2024.07.01' },
// ];

interface Coupon {
  id: number;
  name: string;
  code: string;
  discountRate: number;
  startDate: string;
  endDate: string;
  discountConditions: string[];
}

const CouponPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const couponCnt = coupons?.length || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      setCoupons(data);
    };
    fetchCoupons();
  }, []);

  const handleCouponSubmit = async (couponCode) => {
    try {
      await addCoupon(couponCode);
      const data = await getAllCoupons();
      setCoupons(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MyContainer label="쿠폰">
      <AddCouponBar>
        <CouponStatus>
          <Text $fontType="Body05" color="white">
            사용가능한 쿠폰
          </Text>
          <Text $fontType="Body01" color="white">
            {couponCnt}장
          </Text>
        </CouponStatus>
        <CommonButton type={ButtonType.Primary} height="34px" onClick={handleOpenModal}>
          <Text $fontType="Body04" color="white">
            쿠폰등록
          </Text>
        </CommonButton>
      </AddCouponBar>
      <Spacer height={30} />
      <CouponCardArea>
        {coupons?.map((coupon) => (
          <CouponCard key={coupon.id}>
            <Text $fontType="H3" color="white">
              {coupon.discountRate}% DC
            </Text>
            <Text $fontType="H3" color="white">
              {coupon.startDate} ~ {coupon.endDate}
            </Text>
            <Spacer height={8} />
            {coupon.discountConditions.map((condition, idx) => (
              <Text key={idx} $fontType="Caption02" color="grey30">
                {condition}
              </Text>
            ))}
          </CouponCard>
        ))}
      </CouponCardArea>
      <CouponModal modalOpen={isModalOpen} modalClose={handleCloseModal} onCouponSubmit={handleCouponSubmit} />
    </MyContainer>
  );
};

export default CouponPage;

const AddCouponBar = styled.div`
  height: 100px;
  width: 100%;

  background-color: ${(props) => props.theme.color.grey80};
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0px 29px;
`;

const CouponStatus = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const CouponCardArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 15px;

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const CouponCard = styled.div`
  width: 49%;
  background-color: ${(props) => props.theme.color.grey80};
  padding: 23px;
  border-radius: 8px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 15px;
  }
`;
