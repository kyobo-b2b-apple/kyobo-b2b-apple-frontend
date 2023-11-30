import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import CommonButton, { ButtonType } from '../../common/Button';
import { UseFormRegister, Path, RegisterOptions, DeepMap, FieldError, DeepPartial } from 'react-hook-form';
import { PersonalFormData } from './JoinPersonalForm';
import { FormMode } from '../../../constants/userForm';

interface CustomInputProps {
  label?: string;
  subLabel?: string;
  placeholder?: string;
  fieldName: Path<PersonalFormData>;
  register: UseFormRegister<PersonalFormData>;
  rules?: RegisterOptions;
  errors?: DeepMap<PersonalFormData, FieldError>;
  isSubmitted?: boolean;
  dirtyFields?: DeepPartial<Record<keyof PersonalFormData, boolean>>;
  width?: string;
  shouldShowButton?: boolean;
  errorType?: string;
  essential?: string;
  onCheckDuplicate?: () => Promise<void>;
  mode?: FormMode;
  value?: string;
  readonly?: boolean;
  color?: string;
  disabled?: boolean;
  defaultValue?: any;
}

const PersonalInputCompnent: React.FC<CustomInputProps> = ({
  label,
  subLabel,
  placeholder,
  fieldName,
  register,
  rules,
  errors,
  isSubmitted,
  dirtyFields,
  width,
  shouldShowButton = true,
  errorType,
  essential,
  onCheckDuplicate,
  mode,
  value,
  color,
  disabled,
}) => {
  return (
    <InputWrap>
      <Text $fontType="Body04" color="white">
        {label}
        {essential}
      </Text>
      <IdContainer>
        <InputStyle
          placeholder={placeholder}
          type={fieldName}
          isFailure={errors?.[fieldName] !== undefined}
          {...register(fieldName, rules)}
          width={width}
          value={value}
          color={color}
          disabled={disabled}
        />
        {shouldShowButton && mode === FormMode.Join && (
          <CommonButton type={ButtonType.Primary} width={'83px'} onClick={onCheckDuplicate}>
            <Text $fontType="Body04" color="white">
              중복확인
            </Text>
          </CommonButton>
        )}
      </IdContainer>
      {isSubmitted && errors?.[fieldName] && errors?.[fieldName]?.type === 'required' && !dirtyFields?.[fieldName] && (
        <Text $fontType="Caption02" color="red30">
          {label}
          {subLabel} 입력해주세요
        </Text>
      )}
      {isSubmitted && dirtyFields?.[fieldName] && errors?.[fieldName] && errors?.[fieldName]?.type === errorType && (
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
const IdContainer = styled.div`
  display: flex;
  gap: 8px;
  white-space: nowrap;
`;

export default PersonalInputCompnent;
