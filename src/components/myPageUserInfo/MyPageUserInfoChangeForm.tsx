import { styled } from 'styled-components';
import JoinPersonalForm from '../join/personalForm/JoinPersonalForm';
import { FormMode } from '../../constants/userForm';
import { useEffect, useState } from 'react';
import { getUserInfoApi } from '../../api/userInfoChange';
import { refreshAccessToken } from '../../api/loginApi';

interface FormProps {}

const MyPageUserInfoChangeForm: React.FC<FormProps> = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoApi();
        console.log('API response:', data);
        setUserInfo(data);
      } catch (error) {
        console.log('유저 정보 조회 실패');
      }
    };

    fetchUserInfo();
  }, []);
  const token = localStorage.getItem('accessToken');
  const test = () => {
    console.log(token);
  };
  return (
    <FormContainer>
      <JoinPersonalForm mode={FormMode.Update} isBusiness={false} userInfo={userInfo} />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 297px;
`;

export default MyPageUserInfoChangeForm;
