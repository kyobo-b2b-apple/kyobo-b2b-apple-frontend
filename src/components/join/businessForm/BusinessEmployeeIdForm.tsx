import BusinessInputCompnent from './BusinessInputComponent';
import { BusinessFormProps } from '../Type';



const EmployeeIdForm: React.FC<BusinessFormProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <BusinessInputCompnent
      label="사원번호"
      subLabel="를"
      placeholder="사원번호 입력"
      fieldName="employeeId"
      register={register}
      rules={{ required: true }}
      errors={errors}
      isSubmitted={isSubmitted}
      dirtyFields={dirtyFields}
    />
  );
};

export default EmployeeIdForm;
