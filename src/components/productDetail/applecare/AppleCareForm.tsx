/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import InfoText from '../TextStyle';
import { Spacer, Text } from '../../common';
import { InputStyle } from '../../common/Input';
import AppleCareCount from './AppleCareCount';
import { useEffect, useState } from 'react';

interface DeviceProps {
  isDesktop?: boolean;
  productData?: any;
  selectedOptions?: any[];
  counts?: { [key: string]: number };
  handlePlus?: (item: string) => void;
  handleMinus?: (item: string) => void;
  setAppleCareName?: (value: string) => void;
  appleCareName?: string;
  setAppleCareEmail?: (value: string) => void;
  appleCareEmail?: string;
}

const AppleCareForm: React.FC<DeviceProps> = ({
  counts,
  handlePlus,
  handleMinus,
  isDesktop,
  productData,
  selectedOptions,
  appleCareName,
  setAppleCareName,
  appleCareEmail,
  setAppleCareEmail,
}) => {
  return (
    <AppleCareFormContainer>
      <AppleCareInfoWrap>
        <Text $fontType="Body03" color="white">
          Apple Care+ 등록정보
        </Text>
        <Text $fontType="Body05" color="grey40">
          (Apple Care+ 옵션 선택 시 해당정보 필수입력)
        </Text>
      </AppleCareInfoWrap>
      <AppleCareFormWrap>
        <AppleCareInput isDesktop={isDesktop}>
          <InfoWrap isDesktop={isDesktop}>
            <InfoText>Apple Care+ 이름 (or 기업명)</InfoText>
          </InfoWrap>
          <StyledInput
            placeholder="성함 혹은 기업명 입력 (필수)"
            isDesktop={isDesktop}
            width={'100%'}
            value={appleCareName}
            onChange={(e) => setAppleCareName && setAppleCareName(e.target.value)}
          />
        </AppleCareInput>
        <AppleCareInput isDesktop={isDesktop}>
          <InfoWrap isDesktop={isDesktop}>
            <InfoText>Apple Care+ 이메일</InfoText>
          </InfoWrap>
          <StyledInput
            placeholder="이메일 입력 (필수)"
            isDesktop={isDesktop}
            width={'100%'}
            value={appleCareEmail}
            onChange={(e) => setAppleCareEmail && setAppleCareEmail(e.target.value)}
          />
        </AppleCareInput>
      </AppleCareFormWrap>
      <AppleCareCount
        selectedOptions={selectedOptions}
        productData={productData}
        counts={counts || {}}
        handlePlus={handlePlus!}
        handleMinus={handleMinus!}
      />
      <Spacer height={'23px'} />
    </AppleCareFormContainer>
  );
};
const AppleCareFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppleCareInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const AppleCareFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
`;
const InfoWrap = styled.div<DeviceProps>`
  max-width: 125px;
  white-space: ${(props) => (props.isDesktop ? 'wrap' : 'nowrap')};
`;
const AppleCareInput = styled.div<DeviceProps>`
  display: flex;
  align-items: ${(props) => (props.isDesktop ? 'center' : 'start')};
  justify-content: space-between;
  gap: 13px;
  flex-direction: ${(props) => (props.isDesktop ? 'row' : 'column')};
`;
const StyledInput = styled(InputStyle)<DeviceProps>`
  max-width: ${(props) => (props.isDesktop ? '340px' : '100%')};
`;

export default AppleCareForm;
