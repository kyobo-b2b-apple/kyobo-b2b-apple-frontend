import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { FormComponentProps } from './FormComponentProps';

const Department: React.FC<FormComponentProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <InputWrapper>
      <FormTitleText $fontType="Body04" color="white">
        부서명 (필수) *
      </FormTitleText>
      <CustomInputStyle
        placeholder={'부서명'}
        {...register('departmentName', { required: true })}
        isFailure={errors.departmentName !== undefined}
        ErrorMessage={isSubmitted && errors.departmentName && !dirtyFields.departmentName && '부서명을 입력해주세요.'}
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

export default Department;
