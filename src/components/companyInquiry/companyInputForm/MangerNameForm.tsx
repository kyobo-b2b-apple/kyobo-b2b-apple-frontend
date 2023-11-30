import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { FormComponentProps } from './FormComponentProps';

const MangerName: React.FC<FormComponentProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <InputWrapper>
      <FormTitleText $fontType="Body04" color="white">
        담당자명 (필수) *
      </FormTitleText>
      <CustomInputStyle
        placeholder={'담당자명'}
        {...register('managerName', { required: true })}
        isFailure={errors.managerName !== undefined}
        ErrorMessage={isSubmitted && errors.managerName && !dirtyFields.managerName && '담당자명을 입력해주세요.'}
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

export default MangerName;
