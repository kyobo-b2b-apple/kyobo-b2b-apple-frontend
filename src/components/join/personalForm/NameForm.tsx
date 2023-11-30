import PersonalInputCompnent from './PersonalInputComponent';
import { FormProps } from '../Type';



const NameForm: React.FC<FormProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  const isValidName = (value: any) => /^[A-Za-z가-힣\s]+$/.test(value);
  return (
    <PersonalInputCompnent
      label="이름"
      essential="*"
      subLabel="을"
      placeholder="이름 입력"
      fieldName="name"
      register={register}
      rules={{ required: true, validate: { validName: isValidName } }}
      errors={errors}
      isSubmitted={isSubmitted}
      dirtyFields={dirtyFields}
      errorType="validName"
    />
  );
};

export default NameForm;
