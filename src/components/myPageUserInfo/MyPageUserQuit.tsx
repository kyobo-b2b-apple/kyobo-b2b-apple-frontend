import TextBox from '../common/TextBox';
import CommonButton, { ButtonType } from '../common/Button';
import SelectDropDown from '../common/SelectDropDown';
import { StyledTextArea } from '../common/TextArea';
import { Spacer, Text } from '../common';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import NameForm from '../join/personalForm/NameForm';
import { PersonalFormData } from '../join/personalForm/JoinPersonalForm';
import PersonalInputCompnent from '../join/personalForm/PersonalInputComponent';
import { info, quitReason } from '../../constants/quitInfo';
import { useNavigate } from 'react-router-dom';

const QuitForm = () => {
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  const [quit, setQuit] = useState<string>('');
  const isValidId = (value: any) => /^[A-Za-z0-9\s]+$/.test(value);
  const [isCheck, setIsCheck] = useState(false);

  const navigate = useNavigate();

  const handleQuitTitle = (title: string) => {
    setQuit(title);
  };

  const onSubmit = (data: PersonalFormData) => {
    const formData = new FormData();

    if (!isCheck) {
      alert('동의가 필요합니다.');
    } else {
      console.log(data);

      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append('quitTitle', quit);
      if (reasonRef.current) {
        // reasonRef.current 사용
        formData.append('detailReason', reasonRef.current.value);
      } else {
        formData.append('detailReason', '상세 사유 없음');
      }
      formData.append('withdraw_agree_term1', 'true');
      console.log(Object.fromEntries(formData));

      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/login');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, dirtyFields },
  } = useForm<PersonalFormData>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      loginId: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Spacer height={40} />
      <TextBox width="100%" height="fit" bgColor="grey80">
        <Text $fontType="Body04" color="grey20">
          [KIKO MALL 회원탈퇴 안내사항]
        </Text>
        <Spacer height={'12px'} />
        {info.map((e) => (
          <Text $fontType="Body05" color="grey20" key={e} lineHeight="21.3px">
            {e}
          </Text>
        ))}
      </TextBox>
      <Spacer height={'10px'} />
      <CheckBoxContainter>
        <CheckBoxBtn
          checked={isCheck}
          onClick={() => {
            setIsCheck(!isCheck);
          }}
        />
        <Text $fontType="Body05" color="white">
          안내 사항을 모두 확인했으며, 이에 동의합니다.
        </Text>
      </CheckBoxContainter>
      <Spacer height={'25px'} />
      <QuitInputContainer>
        <FormContainer>
          <NameForm register={register} isSubmitted={isSubmitted} dirtyFields={dirtyFields} errors={errors} />
        </FormContainer>
        <FormContainer>
          <PersonalInputCompnent
            label="아이디"
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
          />
        </FormContainer>
        <FormContainer>
          <Text $fontType="H3" color="white">
            탈퇴 사유(필수)
          </Text>
          <SelectDropDown menuItems={quitReason} setTitle={handleQuitTitle} selectTitle="탈퇴 사유 선택" />
        </FormContainer>
        <FormContainer>
          <Text $fontType="H3" color="white">
            탈퇴 사유(선택)
          </Text>
          <StyledTextArea
            width="100%"
            height="162px"
            padding="13px"
            placeholder="상세 사유를 입력해주세요(300자)"
            maxLength={300}
            background-color="grey90"
            ref={reasonRef}
          />
        </FormContainer>
        <CommonButton type={ButtonType.Primary} htmlType="submit">
          확인
        </CommonButton>
      </QuitInputContainer>
    </form>
  );
};

export default QuitForm;

const CheckBoxContainter = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const QuitInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-bottom: 98px;
  width: 297px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
