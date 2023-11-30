import React from 'react';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import Text from '../common/Text';
import styled from 'styled-components';

interface LoginOptionProps {
  isIdSaved: boolean;
  handleIdSaveCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFindIdClick: () => void;
  onFindPwClick: () => void;
}

const LoginOption: React.FC<LoginOptionProps> = ({ isIdSaved, handleIdSaveCheck, onFindIdClick, onFindPwClick }) => {
  return (
    <LoginOptionContainer>
      <SaveIdWrap>
        <CheckBoxBtn onChange={handleIdSaveCheck} checked={isIdSaved} />

        <SaveIdTitle>
          <Text $fontType="Body05" color="white">
            아이디 저장
          </Text>
        </SaveIdTitle>
      </SaveIdWrap>
      <FindIdPwWrap>
        <FindIdPw onClick={onFindIdClick}>
          <Text $fontType="Body05" color="white">
            아이디 찾기
          </Text>
        </FindIdPw>
        <Text $fontType="Body05" color="white">
          |
        </Text>
        <FindIdPw onClick={onFindPwClick}>
          <Text $fontType="Body05" color="white">
            비밀번호 찾기
          </Text>
        </FindIdPw>
      </FindIdPwWrap>
    </LoginOptionContainer>
  );
};
const LoginOptionContainer = styled.div`
  width: 297px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SaveIdWrap = styled.div`
  display: flex;
  align-items: center;
`;
const SaveIdTitle = styled.label`
  color: ${(props) => props.theme.color.white};
  margin-left: 8px;
  white-space: nowrap;
`;
const FindIdPwWrap = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;
const FindIdPw = styled.button`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.bgColor};
  border: 0;
  cursor: pointer;
`;

export default LoginOption;
