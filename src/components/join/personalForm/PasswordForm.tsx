import { styled } from 'styled-components';
import { InputStyle } from '../../common/Input';
import Text from '../../common/Text';
import { FormProps } from '../Type';
import { FormMode } from '../../../constants/userForm';

interface PasswordProps extends FormProps {
  mode? : FormMode
}

const PasswordForm: React.FC<PasswordProps> = ({ mode, register, errors, isSubmitted, dirtyFields, watch }) => {
  const passwordMatch = (value: any) => value === watch?.('password');
  const isValidPassword = (value: any) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);

  const passwordValue = watch?.('password');
  const passwordCheckValue = watch?.('passwordCheck');

  return (
    <InputWrap>
    {(mode === FormMode.Join ? <Text $fontType="Body04" color="white">
        비밀번호*
      </Text> : <Text $fontType="Body04" color="white">
        새 비밀번호*
      </Text>)}
      
      <InputStyle
        placeholder={'8자 이상의 영문 및 특수문자를 포함'}
        type="password"
        isFailure={errors.password !== undefined}
        {...register('password', { required: true, validate: { validPassword: isValidPassword } })}
      />
      <InputStyle
        type="password"
        placeholder={'비밀번호 재입력'}
        isFailure={errors.passwordCheck !== undefined}
        {...register('passwordCheck', { required: true, validate: { matches: passwordMatch } })}
      />
      {isSubmitted &&
        errors.password &&
        !dirtyFields.password &&
        errors.passwordCheck &&
        !dirtyFields.passwordCheck && (
          <Text $fontType="Caption02" color="red30">
            비밀번호를 입력해주세요
          </Text>
        )}
      {isSubmitted && passwordValue !== passwordCheckValue && !errors.password && (
        <Text $fontType="Caption02" color="red30">
          비밀번호가 일치하지 않습니다
        </Text>
      )}
      {isSubmitted && dirtyFields.password && errors.password && errors.password.type === 'validPassword' && (
        <Text $fontType="Caption02" color="red30">
          영문/숫자/특수기호를 포함한 8자 이상의 비밀번호를 입력해주세요.
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

export default PasswordForm;
