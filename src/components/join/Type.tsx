import { UseFormRegister, DeepPartial, DeepMap, FieldError, UseFormWatch } from 'react-hook-form';
import { PersonalFormData } from './personalForm/JoinPersonalForm';
import { FormData } from './businessForm/JoinBusinessForm';

export interface FormProps {
  register: UseFormRegister<PersonalFormData>;
  errors: DeepMap<PersonalFormData, FieldError>;
  isSubmitted: boolean;
  dirtyFields: DeepPartial<Record<keyof PersonalFormData, boolean>>;
  watch?: UseFormWatch<PersonalFormData>;
}

export interface BusinessFormProps {
register: UseFormRegister<FormData>;
  errors: DeepMap<FormData, FieldError>;
  isSubmitted: boolean;
  dirtyFields: DeepPartial<Record<keyof FormData, boolean>>;
}

export interface UserData extends PersonalFormData, FormData {}