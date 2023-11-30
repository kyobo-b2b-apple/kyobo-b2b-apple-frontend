import React from 'react';
import styled from 'styled-components';
import { Spacer, Text } from '../common';
import Image from '../image/Image';
import ic_search_error from '../../assets/img/search/ic_searcherror_desktop.png';
import useMediaPX from '../../hooks/useMediaPX';

const NoResultMesage = () => {
  const topSpace = useMediaPX({ desktop: '60px', tablet: '60px', mobile: '89px' });
  const bottomSpace = useMediaPX({ desktop: '362px', tablet: '574px', mobile: '280px' });

  return (
    <NoProductWrapper>
      <Spacer height={topSpace} />
      <Image width="41px" height="41px" src={ic_search_error} alt="no-product-icon" />
      <Spacer height="22px" />
      <Text $fontType="Body02" color="grey20">
        해당 상품이 존재하지 않습니다.
        <br /> 검색어를 다시 입력해보세요.
      </Text>
      <Spacer height={bottomSpace} />
    </NoProductWrapper>
  );
};
export default NoResultMesage;

const NoProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
