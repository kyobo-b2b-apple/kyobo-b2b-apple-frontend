import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import CommonButton, { ButtonType } from '../../common/Button';
import Text from '../../common/Text';
import TermsForm from '../TermsForm';
import BusinessNameForm from './BusinessNameForm';
import BusinessIdForm from './BusinessIdForm';
import BusinessDepartmentForm from './BusinessDepartmentForm';
import BusinessEmployeeIdForm from './BusinessEmployeeIdForm';
import { PersonalFormData } from '../personalForm/JoinPersonalForm';

import { businessApi } from '../../../api/JoinApi';


export interface FormData {
  businessId?: string;
  employeeId?: string;
  businessName?: string;
  department?: string;
  mandatory?: boolean;
  mandatory1?: boolean;
  mandatory2?: boolean;
  optional1?: boolean;
  optional2?: boolean;
}
interface JoinBusinessFormProps {
  personalFormData: PersonalFormData;
}

const JoinBusinessForm: React.FC<JoinBusinessFormProps> = ({ personalFormData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted, dirtyFields },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await businessApi(
        personalFormData.loginId,
        personalFormData.password,
        personalFormData.name,
        personalFormData.email,
        personalFormData.phone,
        personalFormData.address,
        personalFormData.addressDetail,
        data.mandatory1,
        data.mandatory2,
        data.optional1,
        data.optional2,
        data.businessName,
        data.businessId,
        data.department,
        data.employeeId,
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
  };
  return (
    <JoinFormContainer>
      <FormHead>
        <Text $fontType="H0" color="white">
          회원가입
        </Text>
        <Text $fontType="Body05" color="grey30">
          *표시는 필수 입력입니다.
        </Text>
      </FormHead>
      <FormBody>
        <BusinessNameForm register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <BusinessIdForm register={register} errors={errors} isSubmitted={isSubmitted} dirtyFields={dirtyFields} />
        <BusinessDepartmentForm
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          dirtyFields={dirtyFields}
        />
        <BusinessEmployeeIdForm
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          dirtyFields={dirtyFields}
        />
      </FormBody>
      <TermsForm
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
        isSubmitted={isSubmitted}
        dirtyFields={dirtyFields}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonButton type={ButtonType.Primary} width={'100%'}>
          확인
        </CommonButton>
      </form>
    </JoinFormContainer>
  );
};

export default JoinBusinessForm;

const JoinFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-top: 30px;
  height: 1200px;
`;
const FormHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
