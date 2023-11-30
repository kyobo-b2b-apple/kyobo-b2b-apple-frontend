import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import Text from '../common/Text';
import CommonButton, { ButtonType } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { LoginType } from './LoginMain';
import LoginOption from './LoginOption';
import LoginInputFields from './LoginInput';
import { loginAPi } from '../../api/loginApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/loginSlice';
import { Spacer } from '../common';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

interface LoginInputProps {
  titleContent?: string;
  loginformFields?: FormField[];
  loginType: LoginType;
  formFields?: FormField[];
  pwFormFields?: FormField[];
  loginBtnTitle: string;
  onFindIdClick: () => void;
  onFindPwClick: () => void;
}

const LoginForm: React.FC<LoginInputProps> = ({
  loginType,
  onFindIdClick,
  onFindPwClick,
  loginBtnTitle,
  loginformFields,
  formFields,
  pwFormFields,
}) => {
  const [isFailure, setIsFailure] = useState<boolean>(false);
  const [isIdSaved, setIsIdSaved] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const loginIdRef = useRef<HTMLInputElement>(null);
  const loginpasswordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  const getSelectedFormFields = (): FormField[] => {
    if (loginType === LoginType.Login) {
      return loginformFields || [];
    } else if (loginType === LoginType.FindPw) {
      return pwFormFields || [];
    }
    return formFields || [];
  };

  useEffect(() => {
    const storedId = localStorage.getItem('savedId');
    if (storedId && loginIdRef.current) {
      loginIdRef.current.value = storedId;
      setIsIdSaved(true);
    }
  }, []);

  const handleIdSaveCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      localStorage.setItem('savedId', loginIdRef.current?.value || '');
      setIsIdSaved(true);
    } else {
      localStorage.removeItem('savedId');
      setIsIdSaved(false);
    }
  };

  const handlePasswordError = () => {
    setIsFailure(true);
    setFailedAttempts((prevAttempts) => prevAttempts + 1);
    if (failedAttempts >= 4) {
      setErrorMessage('비밀번호를 5회 이상 잘못 입력했습니다. 비밀번호 찾기를 진행해주세요.');
    } else {
      setErrorMessage('입력한 회원정보를 다시 확인해주세요.');
    }
  };

  const onSubmit = async () => {
    if (!isIdSaved) {
      localStorage.removeItem('savedId');
    }
    const loginId = loginIdRef.current?.value || '';
    const password = loginpasswordRef.current?.value || '';
    if (loginId === '' || password === '') {
      setIsFailure(true);
      setErrorMessage('아이디 혹은 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const response = await loginAPi(loginId, password);
      if (response.status === 200) {
        const { accessToken } = response.data.result;
        localStorage.setItem('accessToken', accessToken);
        setIsFailure(false);
        setFailedAttempts(0);
        dispatch(loginSuccess(response.data.result));
        moveHome();
      }
    } catch (error: any) {
      console.error(error.response);
      if (error.response && error.response.status === 400) {
        handlePasswordError();
      } else {
        setIsFailure(true);
        setErrorMessage('서버에서 오류가 발생하였습니다');
        console.log(error);
      }
    }
  };

  return (
    <LoginFormContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <LoginInputFields
          isFailure={isFailure}
          formFields={getSelectedFormFields()}
          errorMessage={errorMessage}
          loginIdRef={loginIdRef}
          loginpasswordRef={loginpasswordRef}
        />
        {!errorMessage ? <Spacer height="32px" /> : <Spacer height="6px" />}
        <CommonButton width={'100%'} type={ButtonType.Primary} onClick={onSubmit}>
          <Text $fontType="Body04" color="white">
            {loginBtnTitle}
          </Text>
        </CommonButton>
      </form>
      <Spacer height="15px" />

      {loginType === LoginType.Login && (
        <LoginOption
          isIdSaved={isIdSaved}
          handleIdSaveCheck={handleIdSaveCheck}
          onFindPwClick={onFindPwClick}
          onFindIdClick={onFindIdClick}
        />
      )}
      <Spacer height="39px" />
      <Divider />
    </LoginFormContainer>
  );
};

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 297px;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
`;
const Divider = styled.div`
  width: 297px;
  border: 1px solid #727272;
`;

export default LoginForm;
