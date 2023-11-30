import { styled } from 'styled-components';
import React from 'react';
import Text from '../../common/Text';
import { InputStyle } from '../../common/Input';
import CommonButton, { ButtonType } from '../../common/Button';
import { FormProps } from '../Type';
import { FormMode } from '../../../constants/userForm';
import { PHONE_PATTERN } from '../../../utils/regexPatterns';

interface PhoneProps extends FormProps {
  mode?: FormMode;
}

const PhoneCertifyForm: React.FC<PhoneProps> = ({ mode, register, errors, isSubmitted, dirtyFields }) => {
  const [showPhoneInput, setShowPhoneInput] = React.useState(false);
  const [certificateClicked, setCertificateClicked] = React.useState(false);

  const handleShowPhoneInput = () => {
    setShowPhoneInput(true);
    setCertificateClicked(true);
  };
  return (
    <>
      <InputWrap>
        <Text $fontType="Body04" color="white">
          휴대폰 번호*
        </Text>
        {showPhoneInput && (
          <InputStyle
            placeholder={'01012345678'}
            {...register('phone', {
              required: true,
              pattern: { value: PHONE_PATTERN, message: '올바른 형식의 핸드폰 번호를 입력해주세요' },
            })}
            isFailure={errors.phone !== undefined}
          />
        )}
        <CertifyWrap>
          <CertificatePhone type={ButtonType.Ghost} onClick={handleShowPhoneInput}>
            <Text $fontType="Body04" color="blue">
              {mode === FormMode.Join ? '휴대폰 인증' : '휴대폰 재인증'}
            </Text>
          </CertificatePhone>
          {dirtyFields.phone && errors.phone && errors.phone.type === 'pattern' && (
            <Text $fontType="Caption02" color="red30">
              올바른 형식의 핸드폰 번호를 입력해주세요
            </Text>
          )}
          {(isSubmitted && errors.phone && !dirtyFields.phone) ||
            (isSubmitted && !certificateClicked && (
              <Text $fontType="Caption02" color="red30">
                휴대폰 번호를 입력해주세요
              </Text>
            ))}
        </CertifyWrap>
      </InputWrap>
    </>
  );
};

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const CertificatePhone = styled(CommonButton)``;

const CertifyWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default PhoneCertifyForm;
