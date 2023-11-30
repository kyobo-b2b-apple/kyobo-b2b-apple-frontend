import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import Text from '../common/Text';

export enum LoginType {
  Login = 'Login',
  FindId = 'FindId',
  FindPw = 'FindPw',
}

interface LoginMainProps {
  titleContent: string;
  loginBtnTitle: string;
}
type LoginResult = {
  title: string;
  joinAndFindContent: string;
  loginBtnTitle: string;
  joinAndFind?: string;
};

const LoginMain: FC<LoginMainProps> = () => {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.Login);
  const navigate = useNavigate();

  const handleJoinAndFind = () => {
    if (loginType === LoginType.Login) {
      moveJoin();
    } else if (loginType === LoginType.FindId) {
      changeToFindPw();
    } else {
      changeToFindId();
    }
  };

  const moveJoin = () => {
    navigate('/join');
  };
  const { title, joinAndFind, joinAndFindContent, loginBtnTitle }: LoginResult = useMemo(() => {
    switch (loginType) {
      case LoginType.FindId:
        return {
          title: '아이디 찾기',
          joinAndFind: '비밀번호 찾기',
          joinAndFindContent: '비밀번호를 찾으시나요?',
          loginBtnTitle: '확인',
        };

      case LoginType.FindPw:
        return {
          title: '비밀번호 찾기',
          joinAndFind: '아이디 찾기',
          joinAndFindContent: '아이디를 찾으시나요?',
          loginBtnTitle: '휴대폰 인증',
        };
      default:
        return {
          title: '로그인',
          joinAndFind: '회원가입',
          joinAndFindContent: '아직 회원이 아니신가요?',
          loginBtnTitle: '로그인',
        };
    }
  }, [loginType]);

  const changeToFindId = () => {
    setLoginType(LoginType.FindId);
  };

  const changeToFindPw = () => {
    setLoginType(LoginType.FindPw);
  };

  return (
    <LoginMainContainer>
      <Title>
        <Text $fontType="H0" color="white">
          {title}
        </Text>
        {loginType === LoginType.FindId && (
          <Text $fontType="Caption02" color="white">
            가입시 입력했던 이름과 휴대폰 번호를 입력해주세요.
          </Text>
        )}
        {loginType === LoginType.FindPw && (
          <Text $fontType="Caption02" color="white">
            가입한 아이디를 입력해주세요.
            <br />
            휴대폰 본인인증을 통해 비밀번호를 변경합니다.
          </Text>
        )}
      </Title>
      <LoginForm
        titleContent={title}
        loginBtnTitle={loginBtnTitle}
        onFindIdClick={changeToFindId}
        onFindPwClick={changeToFindPw}
        loginformFields={[
          { name: 'loginId', label: '이메일', type: 'email', placeholder: '아이디' },
          { name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호' },
        ]}
        formFields={[
          { name: 'name', label: '이름', type: 'text', placeholder: '이름' },
          { name: 'phone', label: '휴대폰 번호', type: 'text', placeholder: '휴대폰 번호' },
        ]}
        pwFormFields={[{ name: 'loginId', label: '이메일', type: 'email', placeholder: '아이디 입력' }]}
        loginType={loginType}
      />
      <JoinWrap>
        <JoinTitle>
          <Text $fontType="Body05" color="white">
            {joinAndFindContent}
          </Text>
        </JoinTitle>
        <MoveJoinBtn onClick={handleJoinAndFind}>
          <Text $fontType="Body03" color="blue10">
            {joinAndFind}
          </Text>
        </MoveJoinBtn>
      </JoinWrap>
    </LoginMainContainer>
  );
};

const LoginMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 297px;
  margin: 0 auto;
  justify-content: center;
  padding-top: 41px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  color: ${(props) => props.theme.color.white};
`;
const JoinWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const JoinTitle = styled.div`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.bgColor};
  border: 0;
`;
const MoveJoinBtn = styled.button`
  background-color: ${(props) => props.theme.color.bgColor};
  color: ${(props) => props.theme.color.blue10};
  border: 0;
`;
export default LoginMain;
