import styled from 'styled-components';
import { Text } from '../common';
import { InputStyle } from '../common/Input';
import CommonButton, { ButtonType } from '../common/Button';
import { useState } from 'react';
import { checkPassword } from '../../api/userInfoChange';

interface PasswordProps {
  moveUserChangeForm: () => void;
}

const PasswordConfirm: React.FC<PasswordProps> = ({ moveUserChangeForm }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmClick = async () => {
    try {
      const data = await checkPassword(password);

      if (data.isSuccess) {
        moveUserChangeForm();
      } else {
        console.log('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PwInputWrap>
      <Text $fontType="Body05" color="white">
        비밀번호
      </Text>
      <InputStyle type="password" width={'226px'} height={'20px auto'} onChange={handlePasswordChange} />
      <CommonButton type={ButtonType.Primary} width={'86px'} height={'46px auto'} onClick={handleConfirmClick}>
        확인
      </CommonButton>
    </PwInputWrap>
  );
};

const PwInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export default PasswordConfirm;
