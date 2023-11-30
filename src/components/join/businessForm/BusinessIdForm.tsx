import { BusinessFormProps } from '../Type';
import BusinessInputCompnent from './BusinessInputComponent';




const BusinessIdForm: React.FC<BusinessFormProps> = ({ register, errors, isSubmitted, dirtyFields }) => {
  return (
    <BusinessInputCompnent
      label="사업자 등록번호"
      subLabel="를"
      placeholder="사업자 등록번호 입력"
      fieldName="businessId"
      register={register}
      rules={{ required: true }}
      errors={errors}
      isSubmitted={isSubmitted}
      dirtyFields={dirtyFields}
    />
  );
};

export default BusinessIdForm;
