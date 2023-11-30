import React from 'react';
import { InputStyle } from '../common/Input';
import styled from 'styled-components';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

interface LoginInputFieldsProps {
  isFailure: boolean;
  formFields: FormField[];
  errorMessage: string;
  loginIdRef: React.RefObject<HTMLInputElement>;
  loginpasswordRef: React.RefObject<HTMLInputElement>;
}

const LoginInputFields: React.FC<LoginInputFieldsProps> = ({
  isFailure,
  formFields,
  errorMessage,
  loginIdRef,
  loginpasswordRef,
}) => {
  return (
    <LoginInputWrap>
      {formFields.map((field, i) => (
        <InputStyle
          key={i}
          type={field.type}
          isFailure={isFailure}
          placeholder={field.placeholder}
          ref={i === 0 ? loginIdRef : loginpasswordRef}
          ErrorMessage={errorMessage}
        />
      ))}
    </LoginInputWrap>
  );
};

const LoginInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export default LoginInputFields;
