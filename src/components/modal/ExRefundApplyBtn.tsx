import CommonButton, { ButtonType } from '../common/Button';
import { useFormContext } from 'react-hook-form';

interface ExRefundApplyBtnProp {
  onClick: () => void;
}

const ExRefundApplyBtn: React.FC<ExRefundApplyBtnProp> = ({ onClick }) => {
  const { getValues, setValue } = useFormContext();

  const onSubmit = () => {
    //여기에 API 구현 getValues() 이용
    setValue('items', []); //체크 배열 빈배열로 초기화
    onClick();
  };

  return (
    <CommonButton width={'100%'} type={ButtonType.Secondary} onClick={onSubmit}>
      확인
    </CommonButton>
  );
};

export default ExRefundApplyBtn;
