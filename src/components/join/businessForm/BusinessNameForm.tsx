import BusinessInputCompnent from './BusinessInputComponent';
import { BusinessFormProps } from '../Type';



const BusinessNameForm: React.FC<BusinessFormProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <BusinessInputCompnent
      label="법인명"
      subLabel="을"
      placeholder="법인명 입력"
      fieldName="businessName"
      register={register}
      rules={{ required: true }}
      errors={errors}
      isSubmitted={isSubmitted}
      dirtyFields={dirtyFields}
    />
  );
};

export default BusinessNameForm;
