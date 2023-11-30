import PersonalInputCompnent from './PersonalInputComponent';
import { FormProps } from '../Type';
import { EMAIL_PATTERN } from '../../../utils/regexPatterns';

const EmailForm: React.FC<FormProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <PersonalInputCompnent
      label="이메일"
      subLabel="을"
      placeholder="이메일 입력"
      fieldName="email"
      register={register}
      rules={{ required: false, pattern: EMAIL_PATTERN }}
      errors={errors}
      isSubmitted={isSubmitted}
      dirtyFields={dirtyFields}
    />
  );
};

export default EmailForm;
