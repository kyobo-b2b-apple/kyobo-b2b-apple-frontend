import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { FormComponentProps } from './FormComponentProps';
import { EMAIL_PATTERN } from '../../../utils/regexPatterns';

const InquiryEmailForm: React.FC<FormComponentProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <InputWrapper>
      <FormTitleText $fontType="Body04" color="white">
        이메일 (필수) *
      </FormTitleText>
      <CustomInputStyle
        placeholder={'이메일'}
        {...register('email', { required: true, pattern: EMAIL_PATTERN })}
        isFailure={errors.email !== undefined}
        ErrorMessage={isSubmitted && errors.email && !dirtyFields?.email && '이메일을 입력해주세요'}
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

export default InquiryEmailForm;
