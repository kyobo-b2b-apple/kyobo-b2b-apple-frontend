import { styled } from 'styled-components';
import Text from '../../common/Text';
import { FormComponentProps } from './FormComponentProps';
import ErrorMessage from '../../common/ErrorMessage';

const Consulting: React.FC<FormComponentProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  const isError = errors.description !== undefined;
  return (
    <InputWrapper>
      <FormTitleText $fontType="Body04" color="white">
        상담내용 (필수) *
      </FormTitleText>
      <CustomBigInputStyle
        placeholder={'상담내용'}
        {...register('description', { required: true })}
        style={{ borderColor: isError ? 'red' : 'default' }}
      />
      {isError && !dirtyFields.description && isSubmitted && <ErrorMessage>상담내용을 입력해주세요</ErrorMessage>}
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
const CustomBigInputStyle = styled.textarea`
  background: ${(props) => props.theme.color.grey80};
  box-sizing: border-box;
  border-radius: 8px;
  border: 0;
  width: 100%;
  min-height: 224px;
  padding: 13px 16px;
  color: ${(props) => props.color || props.theme.color.white};
  resize: none;
`;

export default Consulting;
