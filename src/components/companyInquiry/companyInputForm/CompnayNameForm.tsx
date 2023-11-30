import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { FormComponentProps } from './FormComponentProps';

const CompanyName: React.FC<FormComponentProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <InputWrapper>
      <FormTitleText $fontType="Body04" color="white">
        기업명 (필수) *
      </FormTitleText>
      <CustomInputStyle
        placeholder={'기업명'}
        isFailure={errors.companyName !== undefined}
        {...register('companyName', { required: true })}
        ErrorMessage={isSubmitted && errors.companyName && !dirtyFields.companyName && '기업명을 입력해주세요.'}
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

export default CompanyName;
