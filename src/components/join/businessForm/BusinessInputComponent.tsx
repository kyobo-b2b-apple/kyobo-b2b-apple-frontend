import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { UseFormRegister, Path, RegisterOptions, DeepMap, FieldError, DeepPartial } from 'react-hook-form';
import {FormData} from './JoinBusinessForm';

interface CustomInputProps {
  label?: string;
  subLabel?: string;
  placeholder?: string;
  fieldName: Path<FormData>;
  rules?: RegisterOptions;
  register: UseFormRegister<FormData>;
  errors?: DeepMap<FormData, FieldError>;
  isSubmitted: boolean;
  dirtyFields: DeepPartial<Record<keyof FormData, boolean>>;
  errorType?: string;
  
}

const BusinessInputCompnent: React.FC<CustomInputProps> = ({
  label,
  subLabel,
  placeholder,
  fieldName,
  register,
  rules,
  errors,
  isSubmitted,
  dirtyFields,
  errorType,
}) => {
  return (
    <InputWrap>
      <Text $fontType="Body04" color="white">
        {label} *
      </Text>
      <InputStyle
        placeholder={placeholder}
        type={fieldName}
        isFailure={errors?.[fieldName] !== undefined}
        {...register(fieldName, rules)}
      />
      {isSubmitted && errors?.[fieldName] && errors?.[fieldName]?.type === 'required' && !dirtyFields?.[fieldName] && (
        <Text $fontType="Caption02" color="red30">
          {label}
          {subLabel} 입력해주세요
        </Text>
      )}
      {isSubmitted && dirtyFields[fieldName] && errors?.[fieldName] && errors[fieldName]?.type === errorType && (
        <Text $fontType="Caption02" color="red30">
          올바른 형식의 {label}
          {subLabel} 입력해주세요
        </Text>
      )}
    </InputWrap>
  );
};

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default BusinessInputCompnent;
