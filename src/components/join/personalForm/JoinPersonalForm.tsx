import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import CommonButton, { ButtonType } from '../../common/Button';
import Text from '../../common/Text';
import React, { useEffect, useState } from 'react';
import IdDuplicateForm from './IdDuplicateForm';
import PasswordForm from './PasswordForm';
import AddressForm from './AddressForm';
import TermsForm from '../TermsForm';
import PhoneCertifyForm from './PhoneCertifyForm';
import EmailForm from './EmailForm';
import NameForm from './NameForm';
import { joinApi } from '../../../api/JoinApi';
import { FormMode } from '../../../constants/userForm';
import axiosInstance from '../../../api/axiosInstance';
import Spacer from '../../common/Spacer';
import { updateUserInfoApi } from '../../../api/userInfoChange';

export interface PersonalFormData {
  loginId?: string;
  password?: string;
  passwordCheck?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  addressDetail?: string;
  mandatory1?: boolean;
  mandatory2?: boolean;
  optional1?: boolean;
  optional2?: boolean;
  isBusiness?: boolean;
}
interface JoinPersonalFormProps extends PersonalFormData {
  isBusiness: boolean;
  onNextButtonClick?: (data: PersonalFormData) => void;
  mode?: FormMode;
  userInfo?: any;
}

const JoinPersonalForm: React.FC<JoinPersonalFormProps> = ({
  userInfo,
  mode = FormMode.Join,
  onNextButtonClick,
  isBusiness,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted, dirtyFields },
  } = useForm<PersonalFormData>({
    mode: 'onChange',
    defaultValues: userInfo,
  });
  const [updatedUserInfo, setUpdatedUserInfo] = useState(null);
  useEffect(() => {
    if (userInfo) {
      setValue('loginId', userInfo.member.id);
      setValue('name', userInfo.member.name);
      setValue('email', userInfo.member.email);
      setValue('phone', userInfo.member.phone);
      setValue('address', `${userInfo.member.address} ${userInfo.member.addressDetail}`);
      console.log(userInfo);
    }
  }, [setValue, userInfo]);
  const onSubmit = async (data: PersonalFormData) => {
    if (isBusiness) {
      onNextButtonClick && onNextButtonClick(data);
    } else if (mode === FormMode.Update) {
      try {
        const result = await updateUserInfoApi(data);
        alert('회원 정보 변경 성공');
        setUpdatedUserInfo(result);
      } catch (error) {
        console.error(error);
        alert('회원 정보 변경 실패');
      }
    } else {
      try {
        const response = await joinApi(
          data.loginId,
          data.password,
          data.name,
          data.email,
          data.phone,
          data.address,
          data.addressDetail,
          data.mandatory1,
          data.mandatory2,
          data.optional1,
          data.optional2,
        );
        //Todo 추후에 회원가입 성공 실패 로직 변경
        if (response.data) {
          console.log('회원가입 성공');
        } else {
          console.log('회원가입 실패');
        }
      } catch (error) {
        console.error('회원가입 오류', error);
      }
    }
  };

  return (
    <JoinFormContainer>
      {mode === FormMode.Join && (
        <FormHead>
          <Text $fontType="H0" color="white">
            회원가입
          </Text>
          <Text $fontType="Body05" color="grey30">
            *표시는 필수 입력입니다.
          </Text>
        </FormHead>
      )}

      <FormBody>
        {mode === FormMode.Update && (
          <UpdateFormInfo>
            <Text $fontType="H3" color="white">
              개인정보 변경
            </Text>
            <Text $fontType="Body05" color="grey30">
              *표시는 필수 입력입니다.
            </Text>
          </UpdateFormInfo>
        )}
        <IdDuplicateForm
          watch={watch}
          register={register}
          isSubmitted={isSubmitted}
          dirtyFields={dirtyFields}
          errors={errors}
          mode={mode}
        />
        <PasswordForm
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          dirtyFields={dirtyFields}
          watch={watch}
          mode={mode}
        />
        <NameForm register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <EmailForm register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <PhoneCertifyForm
          mode={mode}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          dirtyFields={dirtyFields}
        />

        <AddressForm setValue={setValue} register={register} />

        {!isBusiness && (
          <TermsForm
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            isSubmitted={isSubmitted}
            dirtyFields={dirtyFields}
            isBusiness={isBusiness}
          />
        )}
      </FormBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonButton type={ButtonType.Primary} width={'100%'}>
          <Text $fontType="Body04" color="white">
            확인
          </Text>
        </CommonButton>
      </form>
      {mode === FormMode.Update && (
        <>
          <Spacer height={'64px'} />
          <UserWithdrawBtn>
            <Text $fontType="Body05" color="grey40" textDecoration="underline">
              회원탈퇴
            </Text>
          </UserWithdrawBtn>
        </>
      )}
    </JoinFormContainer>
  );
};

const JoinFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-bottom: 98px;
`;
const FormHead = styled.div`
  display: flex;
  gap: 34px;
  align-items: center;
  margin-top: 41px;
`;
const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const UpdateFormInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserWithdrawBtn = styled.button`
  background-color: #1e1e1e;
  width: fit-content;
`;
export default JoinPersonalForm;
