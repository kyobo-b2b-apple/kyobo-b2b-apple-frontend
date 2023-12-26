import TextBox from '../common/TextBox';
import { StyledTextArea } from '../common/TextArea';
import { Text } from '../common';
import { Spacer } from '../common';
import { useState } from 'react';
import RadioButton from '../common/RadioButton';
import styled from 'styled-components';
import { ItemsContent } from '../common/CheckDropDown';
import CheckDropDown from '../common/CheckDropDown';
import { useFormContext } from 'react-hook-form';

enum ClaimStatus {
  EXCHANGE = '교환',
  REFUND = '환불',
}

interface ExRefundApplyInputProps {
  inputString: string[];
  menuItems: ItemsContent[];
}

const ExRefunApplyInput: React.FC<ExRefundApplyInputProps> = ({ inputString, menuItems }) => {
  const [cancleType, setCancleType] = useState<ClaimStatus>(ClaimStatus.EXCHANGE);

  const { register, setValue } = useFormContext();

  const handleCancleTypeChange = (value) => {
    setValue('refundType', value);
    setCancleType(value);
  };

  return (
    <>
      <Spacer height={38} />
      <div>
        <Text $fontType="H3" color="white">
          교환/반품 상태 선택&#40;필수&#41;
        </Text>
        <Spacer height={10} />
        <RadioContainer>
          <RadioButton
            value={ClaimStatus.EXCHANGE}
            label={ClaimStatus.EXCHANGE}
            onSelect={handleCancleTypeChange}
            checked={cancleType === ClaimStatus.EXCHANGE}
          />
          <RadioButton
            value={ClaimStatus.REFUND}
            label={ClaimStatus.REFUND}
            onSelect={handleCancleTypeChange}
            checked={cancleType === ClaimStatus.REFUND}
          />
        </RadioContainer>
      </div>
      <div>
        <Text $fontType="H3" color="white">
          상품 선택
        </Text>
        <Spacer height={10} />
        <CheckDropDown setItems={() => {}} menuItems={menuItems} title={'상품을 선택해주세요.'} />
      </div>
      <div>
        <Text $fontType="H3" color="white">
          사유 입력(필수)
        </Text>
        <Spacer height={10} />
        <StyledTextArea
          placeholder="상세 사유를 입력해주세요.(최대 300자)"
          width="100%"
          height="162px"
          padding="13px"
          maxLength={300}
          id="deatailReason"
          {...register('detailReason')}
        />
        <Spacer height={10} />
        <TextBox width="100%" bgColor="grey90">
          {inputString.map((e, idx) => (
            <Text $fontType="Body04" color="grey30" key={idx}>
              {'- ' + e}
            </Text>
          ))}
        </TextBox>
      </div>
    </>
  );
};

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default ExRefunApplyInput;
