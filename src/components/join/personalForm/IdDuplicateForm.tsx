import { styled } from 'styled-components';
import PersonalInputCompnent from './PersonalInputComponent';
import { Text } from '../../common';
import { useEffect, useState } from 'react';
import { PersonalFormData } from './JoinPersonalForm';
import { FormProps } from '../Type';
import { checkUserIdDuplicate } from '../../../api/JoinApi';
import { FormMode } from '../../../constants/userForm';

interface DuplicateProps extends FormProps {
  mode?: FormMode;
}

const IdDuplicateForm: React.FC<DuplicateProps> = ({ mode, watch, register, errors, isSubmitted, dirtyFields }) => {
  const [message, setMessage] = useState({ text: '', type: 'error' });
  const isValidId = (value: any) => /^[A-Za-z0-9\s]+$/.test(value);
  const textColor = message.type === 'error' ? 'red30' : 'blue';
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId) {
      setLoggedInUserId(userId);
    }
  }, []);

  const handleCheckDuplicate = async (field: keyof PersonalFormData): Promise<void> => {
    if (!watch) {
      return;
    }
    const fieldValue = watch(field);

    if (typeof fieldValue === 'string') {
      try {
        const response = await checkUserIdDuplicate(fieldValue);
        console.log(response);
        setMessage({ text: '사용 가능한 아이디입니다.', type: 'success' });
      } catch (error) {
        console.error(error);
        setMessage({ text: '아이디가 이미 사용중입니다', type: 'error' });
      }
    } else {
      setMessage({ text: '올바른 아이디를 입력하세요', type: 'error' });
    }
  };
  return (
    <InputWrap>
      <PersonalInputCompnent
        label="아이디"
        essential={mode === FormMode.Join ? '*' : ''}
        subLabel="를"
        placeholder="아이디 입력"
        fieldName="loginId"
        register={register}
        errorType="validId"
        rules={{ required: true, validate: { validId: isValidId } }}
        errors={errors}
        isSubmitted={isSubmitted}
        dirtyFields={dirtyFields}
        width="100%"
        shouldShowButton={true}
        onCheckDuplicate={() => handleCheckDuplicate('loginId')}
        value={mode === FormMode.Update ? loggedInUserId : undefined}
        readonly={mode === FormMode.Update ? true : false}
        mode={mode}
        color={mode === FormMode.Update ? '#48484A' : 'white'}
      />

      <Text $fontType="Caption02" color={textColor}>
        {message.text}
      </Text>
    </InputWrap>
  );
};

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default IdDuplicateForm;
