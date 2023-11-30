import { styled } from 'styled-components';
import { useState } from 'react';
import CommonButton, { ButtonType } from '../common/Button';
import Text from '../common/Text';
import RadioButton from '../common/RadioButton';

interface JoinSelectTypeProps {
  onNextButtonClick: (selectedType: string) => void;
}

const JoinSelectType: React.FC<JoinSelectTypeProps> = ({ onNextButtonClick }) => {
  const [selectedType, setSelectedType] = useState<string>('personal');

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };
  const handleNextBtn = () => {
    if (selectedType) {
      onNextButtonClick(selectedType);
    } else {
      console.log('선택 후 이동');
    }
  };

  return (
    <JoinSelectContainer>
      <Text $fontType="H0" color="white">
        회원가입
      </Text>
      <Text $fontType="Body04" color="white">
        회원가입 유형을 선택해주세요.
      </Text>
      <SelectTypeWrap>
        <RadioButton
          value="personal"
          onSelect={handleSelect}
          label="개인 회원가입"
          checked={selectedType === 'personal'}
        />
        <RadioButton
          value="business"
          onSelect={handleSelect}
          checked={selectedType === 'business'}
          label="사업자 회원가입"
        />
      </SelectTypeWrap>
      <CommonButton width={'100%'} type={ButtonType.Primary} onClick={handleNextBtn}>
        <Text $fontType="Body04" color="white">
          다음
        </Text>
      </CommonButton>
    </JoinSelectContainer>
  );
};

const JoinSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 41px;
  gap: 14px 63px;
  flex-wrap: wrap;
`;

const SelectTypeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  width: 100%;
`;

export default JoinSelectType;
