import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { FormComponentProps } from './FormComponentProps';
import { PHONE_PATTERN } from '../../../utils/regexPatterns';

const InquiryPhoneForm: React.FC<FormComponentProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <InputWrapper>
      <FormTitleText $fontType="Body04" color="white">
        휴대폰 번호 (필수) *
      </FormTitleText>
      <CustomInputStyle
        placeholder={'휴대폰 번호'}
        {...register('phone', { required: true, pattern: PHONE_PATTERN })}
        isFailure={errors.phone !== undefined}
        ErrorMessage={isSubmitted && errors.phone && !dirtyFields.phone && '휴대폰 번호를 입력해주세요.'}
      />
    </InputWrapper>
  );
};

const FormTitleText = styled(Text)`
  line-height: normal;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const CustomInputStyle = styled(InputStyle)`
  width: 100%;
`;

export default InquiryPhoneForm;
