import { styled } from 'styled-components';
import { useState } from 'react';
import { CheckBoxBtn } from '../../common/CheckBoxBtn';
import Text from '../../common/Text';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InquiryFormInputs } from '../CompanyInquiryForm';
import { useNavigate } from 'react-router-dom';

interface InquiryTermsProps {
  register: UseFormRegister<InquiryFormInputs>;
  errors: FieldErrors<InquiryFormInputs>;
  isSubmitted?: boolean;
  setValue: any;
}
const InquiryTermsForm: React.FC<InquiryTermsProps> = ({ setValue, register, errors, isSubmitted }) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/terms/content');
  };

  return (
    <PersonalInfoConsentContainer>
      <CheckBoxBtn
        checked={checked}
        {...register('consent', {
          required: true,
          validate: (value: boolean) => value === true,
        })}
        onChange={() => {
          const newChecked = !checked;
          setChecked(newChecked);
          setValue('consent', newChecked);
        }}
      />
      <PersonalInfoConsentWrap>
        <PersonalInfoConsent>
          <Text $fontType="Body05" color="white">
            개인정보 이용약관에 동의합니다.
          </Text>
          <MoreInfoBtn onClick={handleMoreClick}>
            <DetailText $fontType="Body05" color="grey40">
              상세보기
            </DetailText>
          </MoreInfoBtn>
        </PersonalInfoConsent>
        {isSubmitted && errors.consent && (
          <Text $fontType="Caption02" color="red30">
            약관에 동의해주세요.
          </Text>
        )}
      </PersonalInfoConsentWrap>
    </PersonalInfoConsentContainer>
  );
};

const PersonalInfoConsentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const MoreInfoBtn = styled.button`
  background-color: ${(props) => props.theme.color.grey90};
  padding: 0;
`;

const PersonalInfoConsentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const PersonalInfoConsent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DetailText = styled(Text)`
  text-decoration-line: underline;
  padding-bottom: 3px;
`;

export default InquiryTermsForm;
