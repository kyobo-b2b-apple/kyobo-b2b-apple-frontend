import { styled } from 'styled-components';
import { Spacer, Text } from '../common';
import { useEffect, useState } from 'react';
import MyPageUserInfoChangeForm from './MyPageUserInfoChangeForm';
import PasswordConfirm from './PasswordConfirm';
import MyContainer from '../my/MyContainer';


const MyPageUserInfo = () => {
  const [showForm, setShowForm] = useState(false);
  const [showChangeInfo, setShowChangeInfo] = useState(true);

  const moveUserChangeForm = () => {
    setShowForm(true);
    setShowChangeInfo(false);
  };
  return (
      <MyContainer label="내 정보 변경">
        {showChangeInfo && (
            <>
              <ChangeInfo>
                <Text $fontType="Body05" color="white">
                  -안내문구가 들어갑니다.
                  <br />
                  -안내문구가 들어갑니다.
                </Text>
              </ChangeInfo>
              <Spacer height={17} />
              <PasswordConfirm moveUserChangeForm={moveUserChangeForm} />
            </>
        )}
        {showForm && <MyPageUserInfoChangeForm />}
      </MyContainer>
  );
};

const ChangeInfo = styled.div`
  width: 100%;
  background-color: #2e2e2e;
  border-radius: 5px;
  padding: 21px 20px;
`;

const PwInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export default MyPageUserInfo;
