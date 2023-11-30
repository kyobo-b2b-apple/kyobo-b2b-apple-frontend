import { FC } from 'react';
import React from 'react';

import LoginMain from '../../components/login/LoginMain';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div>
      <LoginMain titleContent={'아이디'} loginBtnTitle={'로그인'} />
    </div>
  );
};

export default Login;
