import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InquiryFormInputs } from '../CompanyInquiryForm';

export interface FormComponentProps {
  register: UseFormRegister<InquiryFormInputs>;
  errors: FieldErrors<InquiryFormInputs>;
  isSubmitted?: boolean;
  dirtyFields: Partial<Omit<Record<keyof Omit<InquiryFormInputs, 'files'>, boolean>, 'files'> & { files?: boolean[] }>;
}
