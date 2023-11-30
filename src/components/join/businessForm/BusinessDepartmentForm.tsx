import BusinessInputCompnent from './BusinessInputComponent';
import { BusinessFormProps } from '../Type';


const DepartmentForm: React.FC<BusinessFormProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <BusinessInputCompnent
      label="부서명"
      subLabel="을"
      placeholder="부서명 입력"
      fieldName="department"
      register={register}
      rules={{ required: true }}
      errors={errors}
      isSubmitted={isSubmitted}
      dirtyFields={dirtyFields}
    />
  );
};

export default DepartmentForm;
