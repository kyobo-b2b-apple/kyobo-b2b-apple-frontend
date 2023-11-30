import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import Text from '../common/Text';
import CommonButton, { ButtonType } from '../common/Button';
import CompanyName from './companyInputForm/CompnayNameForm';
import MangerName from './companyInputForm/MangerNameForm';
import Department from './companyInputForm/DepartmentForm';
import Consulting from './companyInputForm/Consulting';
import InquiryPhoneForm from './companyInputForm/InquiryPhoneForm';
import InquiryEmailForm from './companyInputForm/InquiryEmailForm';
import InquiryFileUploadForm from './companyInputForm/InquiryUploadFileForm';
import InquiryTermsForm from './companyInputForm/InquiryTermsForm';
import React from 'react';
import { sendInquiry } from '../../api/InquiryApi';

export interface InquiryFormInputs {
  companyName: string;
  managerName: string;
  departmentName: string;
  description: string;
  phone: string;
  email: string;
  files: File[];
  consent: boolean;
}
const sizes = {
  Mobile: '479px',
  Tablet: '767px',
  Desktop: '1920px',
};

const media = {
  mobile: `(max-width: ${sizes.Mobile})`,
  tablet: `(min-width: 480px) and (max-width: ${sizes.Tablet})`,
  desktop: `(min-width: ${sizes.Tablet}) and (max-width: ${sizes.Desktop})`,
};

const InquiryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitted, dirtyFields },
  } = useForm<InquiryFormInputs>();

  const onSubmit = async (data: InquiryFormInputs) => {
    try {
      const formData = new FormData();

      formData.append('company', data.companyName);
      formData.append('contact', data.managerName);
      formData.append('department', data.departmentName);
      formData.append('content', data.description);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      data.files.forEach((files) => {
        formData.append('files', files);
      });
      console.log(data.files);
      const result = await sendInquiry(formData);
      if (result.success) {
        console.log('문의 전송 성공');
      } else {
        console.log('문의 전송 실패');
      }
    } catch (error) {
      console.error('기업문의 이메일 발송 오류', error);
    }
  };

  return (
    <InquiryFormContainer>
      <TitleWrap>
        <FormTitleText $fontType={media.mobile ? 'H2' : 'H0'} color="white">
          기업용
          <br />
          구매신청하기
        </FormTitleText>
        <SubTitle>
          <Text $fontType="Caption02" color="grey30">
            구매신청에 관한 내용을 전달주시면, 담당자가 확인 후 메일로 회신드리겠습니다.
          </Text>
        </SubTitle>
      </TitleWrap>
      <FormContainer>
        <CompanyName register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <MangerName register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <Department register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <Consulting register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <InquiryPhoneForm register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <InquiryEmailForm register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <Controller
          name="files"
          control={control}
          defaultValue={[]}
          render={({ field }) => <InquiryFileUploadForm {...field} isSubmitted={isSubmitted} />}
        />
      </FormContainer>
      <SubmitFormWrap>
        <InquiryTermsForm setValue={setValue} register={register} errors={errors} isSubmitted={isSubmitted} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommonButton width={'100%'} type={ButtonType.Primary} htmlType="submit">
            <Text $fontType="Body04" color="white">
              제출
            </Text>
          </CommonButton>
        </form>
      </SubmitFormWrap>
    </InquiryFormContainer>
  );
};

const InquiryFormContainer = styled.div`
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  width: 463px;
  margin: 0 auto;
  gap: 47px;
  @media ${media.mobile} {
    width: 100%;
    max-width: 320px;
  }

  @media ${media.tablet} {
    width: 100%;
    max-width: 480px;
  }

  @media ${media.desktop} {
    width: 463px;
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  @media ${media.mobile} {
    gap: 1px;
  }

  @media ${media.tablet} {
    gap: 1px;
  }

  @media ${media.desktop} {
    gap: 25px;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const FormTitleText = styled(Text)`
  line-height: normal;
`;

const SubTitle = styled.div`
  height: 20px;
  width: 100%;
`;
const SubmitFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export default InquiryForm;
